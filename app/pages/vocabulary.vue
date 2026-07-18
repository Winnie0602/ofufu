<script setup lang="ts">
import { vocabularyItems } from '~/data/materials/vocabulary'
import type { VocabularyLevel } from '~/types/vocabulary'

const route = useRoute()
const router = useRouter()
const levels: VocabularyLevel[] = ['all', 'n5', 'n4', 'n3', 'n2', 'n1']
const pageSize = 20

const selectedLevel = computed<VocabularyLevel>(() => {
  const level = String(route.query.level ?? 'all').toLowerCase()
  return levels.includes(level as VocabularyLevel)
    ? (level as VocabularyLevel)
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
const loadingAudioId = ref<string | null>(null)
const playingAudioId = ref<string | null>(null)
let audioTimer: ReturnType<typeof window.setTimeout> | undefined

const changeLevel = (level: VocabularyLevel) =>
  router.push({ query: { ...route.query, level, page: 1 } })

const changePage = (page: number) =>
  router.push({ query: { ...route.query, level: selectedLevel.value, page } })

const toggleVocabulary = (id: string) => {
  activeVocabularyId.value = activeVocabularyId.value === id ? null : id
}

const audioState = (id: string) => {
  if (loadingAudioId.value === id) return 'loading'
  if (playingAudioId.value === id) return 'playing'
  return 'idle'
}

const playAudioPreview = (id: string) => {
  window.clearTimeout(audioTimer)
  playingAudioId.value = null
  loadingAudioId.value = id
  audioTimer = window.setTimeout(() => {
    loadingAudioId.value = null
    playingAudioId.value = id
    audioTimer = window.setTimeout(() => {
      playingAudioId.value = null
    }, 1200)
  }, 450)
}

watch(
  visibleItems,
  (items) => {
    activeVocabularyId.value = items[0]?.id ?? null
  },
  { immediate: true },
)

onBeforeUnmount(() => window.clearTimeout(audioTimer))

useSeoMeta({
  title: '單字學習｜Ofufu',
  description: '依照 JLPT 程度瀏覽日文單字、讀音、活用與例句。',
})
</script>

<template>
  <div class="w-full bg-white text-neutral-950">
    <section class="vocabulary-hero-bg relative w-full overflow-hidden">
      <div
        class="relative z-10 mx-auto grid min-h-[280px] w-full max-w-[1280px] items-end px-4 pt-8 pb-4 sm:px-6 sm:pb-[10px] md:gap-10 md:pt-12 lg:min-h-[340px] lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
      >
        <div class="max-w-full pt-4 text-center lg:text-left">
          <h1
            class="text-[2rem] leading-tight font-bold sm:text-5xl lg:text-[3.4rem]"
          >
            單字學習
          </h1>
          <p
            class="mx-auto mt-7 max-w-lg text-base leading-8 font-semibold text-neutral-600 lg:mx-0 lg:text-lg"
          >
            依照適合自己的 JLPT 程度瀏覽單字，
            <br />
            搭配發音、活用與例句，
            <br class="md:hidden" />
            一步一步累積日文詞彙力。
          </p>
        </div>

        <div class="hidden lg:block" aria-hidden="true" />
      </div>
    </section>

    <main class="mx-auto w-full max-w-[1280px] px-4 pt-4">
      <section
        class="flex items-stretch gap-3 border-y border-neutral-200 py-4 sm:items-center sm:gap-6 sm:px-4"
      >
        <div class="min-w-0 flex-1 sm:contents">
          <div class="shrink-0 text-sm text-neutral-700">程度篩選</div>

          <div
            class="join mt-3 min-w-0 sm:mt-0 sm:flex-1"
            aria-label="JLPT 程度篩選"
          >
            <button
              v-for="level in levels"
              :key="level"
              type="button"
              class="btn btn-soft btn-sm join-item !rounded-none transition-none"
              :class="
                selectedLevel === level
                  ? 'btn-error bg-error hover:bg-error text-white hover:text-white'
                  : 'btn-error text-error hover:bg-error bg-white hover:text-white'
              "
              :aria-pressed="selectedLevel === level"
              @click="changeLevel(level)"
            >
              {{ level === 'all' ? 'All' : level.toUpperCase() }}
            </button>
          </div>
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
            @play="playAudioPreview"
          />
        </div>

        <div
          v-if="visibleItems.length === 0"
          class="py-16 text-center text-neutral-500"
        >
          目前沒有這個程度的單字。
        </div>

        <nav class="mt-6 flex justify-center" aria-label="單字列表分頁">
          <div class="flex items-center gap-x-1">
            <button
              type="button"
              class="btn btn-circle btn-sm text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent shadow-none transition-none hover:border-transparent"
              :disabled="safePage === 1"
              aria-label="上一頁"
              @click="changePage(safePage - 1)"
            >
              <span class="icon-[tabler--chevron-left] size-5" />
            </button>
            <div class="flex items-center gap-x-1">
              <button
                v-for="page in pageCount"
                :key="page"
                type="button"
                class="btn btn-circle btn-sm shadow-none transition-none"
                :class="
                  safePage === page
                    ? 'border-error bg-error hover:bg-error text-white hover:text-white'
                    : 'text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent hover:border-transparent'
                "
                :aria-current="safePage === page ? 'page' : undefined"
                :aria-label="`第 ${page} 頁`"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            <button
              type="button"
              class="btn btn-circle btn-sm text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent shadow-none transition-none hover:border-transparent"
              :disabled="safePage === pageCount"
              aria-label="下一頁"
              @click="changePage(safePage + 1)"
            >
              <span class="icon-[tabler--chevron-right] size-5" />
            </button>
          </div>
        </nav>
      </section>
    </main>
  </div>
</template>
