<script setup lang="ts">
import type { VocabularyItem } from '~/types/vocabulary'

const showRuby = ref(true)
const activeVocabularyId = ref<string | null>(null)

// 每個播放按鈕會自行提供要播放的文字；單字和例句共用同一筆單字資料。
const { audioState, togglePlay } = useTtsAudio({ materialType: 'vocabulary' })

// 捲動編號
let scrollRequestVersion = 0

// 找到指定的單字，等畫面與展開動畫穩定後，平滑捲動到那個單字的位置。若使用者途中又點了別的單字，就取消前一次捲動。
const scrollToVocabulary = async (
  vocabularyId: string,
  waitForAccordion = false,
) => {
  const currentScrollRequest = ++scrollRequestVersion
  await nextTick()

  // 如果單字正在展開，就等待 320 毫秒，讓展開與收合動畫完成，避免捲動位置不準。
  if (waitForAccordion) {
    await new Promise((resolve) => window.setTimeout(resolve, 320))
  }

  if (currentScrollRequest !== scrollRequestVersion) return

  document.getElementById(`vocabulary-${vocabularyId}-toggle`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const {
  changeLevel,
  changePage,
  hasError,
  isLoading,
  pageCount,
  pageSize,
  retry,
  safePage,
  selectedLevel,
  visibleItems,
} = await useMaterialListing<VocabularyItem>(
  '/api/materials/vocabulary',
  scrollToVocabulary,
)

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
  <MaterialListPageLayout>
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
            @play="togglePlay"
          />
        </div>

        <!-- 載入失敗要跟「這個程度沒有單字」分開，不然看起來像資料真的不存在。 -->
        <div v-if="hasError" class="py-16 text-center">
          <p class="text-neutral-700">單字載入失敗，請稍後再試。</p>
          <button
            type="button"
            class="btn btn-soft btn-sm mt-4"
            @click="retry()"
          >
            重新載入
          </button>
        </div>

        <div
          v-else-if="visibleItems.length === 0"
          class="py-16 text-center text-neutral-500"
        >
          {{ isLoading ? '載入中⋯' : '目前沒有這個程度的單字。' }}
        </div>

        <Pagination
          v-if="!hasError"
          class="mt-6"
          :page="safePage"
          :total-pages="pageCount"
          aria-label="單字列表分頁"
          @update-page="changePage"
        />
      </section>
    </div>
  </MaterialListPageLayout>
</template>
