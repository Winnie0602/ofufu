import type { MaterialLevel, MaterialSummary } from '~/types/material'
import { materialLevels } from '~/types/material'

/**
 * 教材列表頁的程度篩選與分頁。
 *
 * 閱讀、對話（之後還有歌曲、文法⋯）的列表頁行為完全一樣：選程度、翻頁、翻完捲到最上面。
 * 這支把那套邏輯抽出來，各列表頁只要傳自己的教材陣列。
 *
 *   const { visibleItems, selectedLevel, changeLevel, changePage } =
 *     useMaterialListing(readingMaterials, 'reading-card')
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
 * @param materials    這個列表的全部教材（已經是完整資料，篩選分頁都在前端做）
 * @param itemIdPrefix 卡片 DOM id 的前綴，例：傳 'reading-card' 就會去找
 *                     `#reading-card-{教材id}` 來捲動。翻頁後捲到新一頁第一張卡片用的。
 */
export const useMaterialListing = <T extends MaterialSummary>(
  materials: T[],
  itemIdPrefix: string,
) => {
  const route = useRoute()
  const router = useRouter()
  const pageSize = 20
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

  const filteredItems = computed(() =>
    selectedLevel.value === 'all'
      ? materials
      : materials.filter((item) => item.level === selectedLevel.value),
  )
  const pageCount = computed(() =>
    Math.max(1, Math.ceil(filteredItems.value.length / pageSize)),
  )
  /**
   * 實際要顯示的頁碼。網址寫 page=99 但只有 3 頁時，顯示第 3 頁而不是空白。
   * 注意這裡不去改網址，只是顯示上收斂，避免多一次沒必要的跳轉。
   */
  const safePage = computed(() => Math.min(currentPage.value, pageCount.value))
  const visibleItems = computed(() => {
    const start = (safePage.value - 1) * pageSize
    return filteredItems.value.slice(start, start + pageSize)
  })

  /** 換程度時把頁碼歸 1，不然從第 5 頁切到只有 2 頁的程度會看到空白。 */
  const changeLevel = (level: MaterialLevel) =>
    router.push({ query: { ...route.query, level, page: 1 } })

  /**
   * 翻頁，並在新內容渲染完之後捲到第一張卡片。
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

    if (currentRequest !== scrollRequestVersion || safePage.value !== page) return
    const firstItem = visibleItems.value[0]
    if (!firstItem) return

    document.getElementById(`${itemIdPrefix}-${firstItem.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return {
    changeLevel,
    changePage,
    pageCount,
    pageSize,
    safePage,
    selectedLevel,
    visibleItems,
  }
}
