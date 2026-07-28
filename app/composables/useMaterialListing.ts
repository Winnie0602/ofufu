import type { JlptLevel, MaterialLevel, MaterialListingResponse } from '~/types/material'
import { materialLevels } from '~/types/material'

/**
 * 教材列表頁的程度篩選與分頁。
 *
 * 單字、閱讀、對話（之後還有歌曲、文法⋯）的列表頁行為完全一樣：選程度、翻頁、
 * 翻完捲到最上面。這支把那套邏輯抽出來，各列表頁只要傳自己的 API 路徑。
 *
 *   const { visibleItems, selectedLevel, changeLevel, changePage } =
 *     await useMaterialListing('/api/materials/reading', scrollToCard)
 *
 * ## 狀態存在網址，不存在元件裡
 *
 * 程度和頁碼都讀寫 route query，所以網址長這樣：
 *
 *   /reading?level=n3&page=2
 *
 * 這樣使用者可以把某一頁分享給別人、按上一頁會回到剛才的篩選、重新整理也不會跑掉。
 * 代價是切換條件要走 `router.push()`，不能直接改變數。
 *
 * 這兩個值同時是 `useFetch` 的 query，所以改網址就會自動重新請求，
 * **篩選與切片都在伺服器做**，前端不再持有完整教材陣列。
 *
 * @param endpoint           列表 API 路徑，例：`/api/materials/reading`
 * @param scrollToFirstItem  翻頁後要捲到哪裡。各頁的捲動目標不同（卡片、單字標題），
 *                           所以交給呼叫端決定，這裡只負責決定「什麼時候該捲」。
 */
export const useMaterialListing = async <T extends { id: string; level: JlptLevel }>(
  endpoint: string,
  scrollToFirstItem: (itemId: string) => void | Promise<void>,
) => {
  const route = useRoute()
  const router = useRouter()
  // 翻頁捲動的流水號：使用者連按好幾次時，只有最後一次該捲動。
  let scrollRequestVersion = 0

  // 網址上的 level 是使用者可以亂打的，不在清單裡就當 'all'，不要壞掉。
  const selectedLevel = computed<MaterialLevel>(() => {
    const level = String(route.query.level ?? 'all').toLowerCase()
    return materialLevels.includes(level as MaterialLevel)
      ? (level as MaterialLevel)
      : 'all'
  })

  // 同上，page 可能是 0、-1、'abc'，一律退回第 1 頁。
  const currentPage = computed(() => {
    const page = Number(route.query.page ?? 1)
    return Number.isInteger(page) && page > 0 ? page : 1
  })

  const { data, error, status, refresh } = await useFetch<
    MaterialListingResponse<T>
  >(endpoint, {
    // 三個列表頁共用這支 composable，不給 key 的話會被當成同一份資料。
    key: endpoint,
    query: { level: selectedLevel, page: currentPage },
  })

  const visibleItems = computed(() => data.value?.items ?? [])
  const pageCount = computed(() => data.value?.totalPages ?? 1)
  const pageSize = computed(() => data.value?.pageSize ?? 0)
  /**
   * 實際顯示的是第幾頁。網址寫 page=99 但只有 5 頁時，伺服器會回第 5 頁的內容，
   * 這裡直接用它回報的頁碼。**網址不動**，避免多一次沒必要的跳轉。
   */
  const safePage = computed(() => data.value?.page ?? currentPage.value)

  /** 換程度時把頁碼歸 1，不然從第 5 頁切到只有 2 頁的程度會看到空白。 */
  const changeLevel = (level: MaterialLevel) =>
    router.push({ query: { ...route.query, level, page: 1 } })

  /** 等這一次請求結束。翻頁後要拿到新資料才知道要捲到哪張卡片。 */
  const waitForRequest = () =>
    new Promise<void>((resolve) => {
      if (status.value !== 'pending') {
        resolve()
        return
      }

      const stop = watch(status, (value) => {
        if (value === 'pending') return
        stop()
        resolve()
      })
    })

  /**
   * 翻頁，並在新的一頁載入完成之後捲到第一筆。
   *
   * 捲動前有兩道檢查，都是為了避免捲錯地方：
   * - 流水號對不上 → 使用者又按了下一次，這次作廢
   * - `safePage !== page` → 要求的頁碼被收斂過（例如按到超出範圍），不捲
   */
  const changePage = async (page: number) => {
    const currentRequest = ++scrollRequestVersion
    await router.push({
      query: { ...route.query, level: selectedLevel.value, page },
    })
    await nextTick()
    await waitForRequest()

    if (currentRequest !== scrollRequestVersion || safePage.value !== page) return
    const firstItem = visibleItems.value[0]
    if (!firstItem) return

    await scrollToFirstItem(firstItem.id)
  }

  return {
    changeLevel,
    changePage,
    /** 請求失敗（API 500、資料庫斷線⋯）。要跟「這個程度沒有教材」分開顯示。 */
    hasError: computed(() => Boolean(error.value)),
    isLoading: computed(() => status.value === 'pending'),
    pageCount,
    pageSize,
    /** 讓錯誤狀態可以重試，不必整頁重新整理。 */
    retry: refresh,
    safePage,
    selectedLevel,
    visibleItems,
  }
}
