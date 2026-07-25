<script setup lang="ts">
import { vocabularyItems } from '~/data/materials/vocabulary'
import { LANG_CONFIG_MAP } from '~/types/lang'
import { materialLevels, type MaterialLevel } from '~/types/material'

const route = useRoute()
const router = useRouter()
const pageSize = 20

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
    ? vocabularyItems
    : vocabularyItems.filter((item) => item.level === selectedLevel.value),
)

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / pageSize)),
)
const safePage = computed(() => Math.min(currentPage.value, pageCount.value))
const visibleItems = computed(() => {
  const start = (safePage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
})

const showRuby = ref(true)
const activeVocabularyId = ref<string | null>(null)
const { audioState, playAudio } = useTtsAudio(LANG_CONFIG_MAP.ja)
let scrollRequestVersion = 0

const changeLevel = (level: MaterialLevel) =>
  router.push({ query: { ...route.query, level, page: 1 } })

const scrollToVocabulary = async (
  vocabularyId: string,
  waitForAccordion = false,
) => {
  const currentScrollRequest = ++scrollRequestVersion
  await nextTick()

  // 展開與上一個項目的收合動畫完成後，單字標題的位置才會固定。
  if (waitForAccordion) {
    await new Promise((resolve) => window.setTimeout(resolve, 320))
  }

  if (currentScrollRequest !== scrollRequestVersion) return

  document
    .getElementById(`vocabulary-${vocabularyId}-toggle`)
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
}

const changePage = async (page: number) => {
  await router.push({
    query: { ...route.query, level: selectedLevel.value, page },
  })

  const firstVocabulary = visibleItems.value[0]
  if (safePage.value === page && firstVocabulary) {
    await scrollToVocabulary(firstVocabulary.id)
  }
}

const toggleVocabulary = (id: string) => {
  if (activeVocabularyId.value === id) {
    activeVocabularyId.value = null
    return
  }

  activeVocabularyId.value = id
  void scrollToVocabulary(id, true)
}

watch(
  visibleItems,
  (items) => {
    activeVocabularyId.value = items[0]?.id ?? null
  },
  { immediate: true },
)

useSeoMeta({
  title: '單字學習',
  description: '依照 JLPT 程度瀏覽日文單字、讀音、活用與例句。',
})
</script>

<template>
  <MaterialPageShell>
    <template #hero>
      <MaterialHero
        title="單字學習"
        :description="`依照適合自己的 JLPT 程度瀏覽單字，\n搭配發音、活用與例句，一步一步累積日文詞彙力。`"
      />
    </template>

    <div class="pt-4">
      <section
        class="flex items-stretch gap-3 border-y border-neutral-200 py-4 sm:items-center sm:gap-6 sm:px-4"
      >
        <div class="min-w-0 flex-1 sm:contents">
          <div class="shrink-0 text-sm text-neutral-700">程度篩選</div>

          <MaterialLevelFilter
            class="mt-3 min-w-0 sm:mt-0 sm:flex-1"
            :model-value="selectedLevel"
            @update:model-value="changeLevel"
          />
        </div>

        <label
          class="flex shrink-0 flex-col items-center justify-start gap-3 text-sm text-neutral-700 sm:flex-row"
        >
          <span>顯示假名</span>
          <span class="flex h-8 items-center">
            <input
              v-model="showRuby"
              type="checkbox"
              class="switch switch-error switch-sm"
            />
          </span>
        </label>
      </section>

      <section>
        <div class="accordion mt-6">
          <VocabularyListItem
            v-for="(item, index) in visibleItems"
            :key="item.id"
            :item="item"
            :number="(safePage - 1) * pageSize + index + 1"
            :is-active="activeVocabularyId === item.id"
            :show-ruby="showRuby"
            :show-level="selectedLevel === 'all'"
            :audio-state="audioState"
            @toggle="toggleVocabulary"
            @play="playAudio"
          />
        </div>

        <div
          v-if="visibleItems.length === 0"
          class="py-16 text-center text-neutral-500"
        >
          目前沒有這個程度的單字。
        </div>

        <Pagination
          class="mt-6"
          :page="safePage"
          :total-pages="pageCount"
          aria-label="單字列表分頁"
          @update-page="changePage"
        />
      </section>
    </div>
  </MaterialPageShell>
</template>
