import type { MaterialLevel, MaterialSummary } from '~/types/material'
import { materialLevels } from '~/types/material'

export const useMaterialListing = <T extends MaterialSummary>(
  materials: T[],
  itemIdPrefix: string,
) => {
  const route = useRoute()
  const router = useRouter()
  const pageSize = 20
  let scrollRequestVersion = 0

  const selectedLevel = computed<MaterialLevel>(() => {
    const level = String(route.query.level ?? 'all').toLowerCase()
    return materialLevels.includes(level as MaterialLevel)
      ? (level as MaterialLevel)
      : 'all'
  })

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
  const safePage = computed(() => Math.min(currentPage.value, pageCount.value))
  const visibleItems = computed(() => {
    const start = (safePage.value - 1) * pageSize
    return filteredItems.value.slice(start, start + pageSize)
  })

  const changeLevel = (level: MaterialLevel) =>
    router.push({ query: { ...route.query, level, page: 1 } })

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
