<script setup lang="ts">
import { readingMaterials } from '~/data/materials/reading'
import { LANG_CONFIG_MAP } from '~/types/lang'
import { materialCategoryLabels, type StudyMode } from '~/types/material'
import { toPlainJapanese } from '~/utils/parseRuby'

const route = useRoute()
const material = readingMaterials.find((item) => item.id === route.params.id)

if (!material) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const articleSentences = material.paragraphs.flatMap(
  (paragraph) => paragraph.sentences,
)

// 註解掛在句子層，頁尾「重點單字／本文使用文法」由各句攤平彙整。
// 內文只標符合該程度的重點單字，故頁尾即列出所有單字註解。
const vocabularyNotes = articleSentences.flatMap(
  (sentence) => sentence.vocabularyNotes ?? [],
)
const grammarNotes = articleSentences.flatMap(
  (sentence) => sentence.grammarNotes ?? [],
)

const mode = ref<StudyMode>('full')
const showRuby = ref(true)
const lookupMode = ref(false)
const playbackRate = ref(1)
const articleVisible = ref(true)
const sentenceJapaneseVisible = ref(true)
const sentenceTranslationVisible = ref(true)
const revealedJapaneseSentenceIds = ref(new Set<string>())
const revealedTranslationSentenceIds = ref(new Set<string>())
const activeGrammarId = ref<string | null>(grammarNotes[0]?.id ?? null)
const isArticlePlaying = ref(false)
const { audioState, playAudio, playAudioSequence, stopAudio } = useTtsAudio(
  LANG_CONFIG_MAP.ja,
  { playbackRate },
)

const playArticle = async () => {
  if (isArticlePlaying.value) {
    stopAudio()
    isArticlePlaying.value = false
    return
  }

  isArticlePlaying.value = true
  await playAudioSequence(
    articleSentences.map((sentence) => ({
      audioId: sentence.id,
      text: toPlainJapanese(sentence.text),
    })),
  )
  isArticlePlaying.value = false
}

const toggleGrammar = (grammarId: string) => {
  activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
}

const isSentenceJapaneseVisible = (sentenceId: string) =>
  sentenceJapaneseVisible.value ||
  revealedJapaneseSentenceIds.value.has(sentenceId)
const isSentenceTranslationVisible = (sentenceId: string) =>
  sentenceTranslationVisible.value ||
  revealedTranslationSentenceIds.value.has(sentenceId)
const revealJapaneseSentence = (sentenceId: string) => {
  revealedJapaneseSentenceIds.value.add(sentenceId)
}
const revealTranslationSentence = (sentenceId: string) => {
  revealedTranslationSentenceIds.value.add(sentenceId)
}

const recommendations = readingMaterials
  .filter((item) => item.id !== material.id && item.level === material.level)
  .slice(0, 5)

// 查字模式或版面切換後，內文單字 Popover 是新長出的 DOM，需重新綁定 FlyonUI click trigger。
const reinitFlyonui = useFlyonuiReinit()
watch([lookupMode, mode], () => reinitFlyonui())
watch(mode, () => {
  if (isArticlePlaying.value) {
    stopAudio()
    isArticlePlaying.value = false
  }
  revealedJapaneseSentenceIds.value.clear()
  revealedTranslationSentenceIds.value.clear()
})
watch(sentenceJapaneseVisible, () => {
  revealedJapaneseSentenceIds.value.clear()
})
watch(sentenceTranslationVisible, () => {
  revealedTranslationSentenceIds.value.clear()
})

useSeoMeta({ title: material.title, description: material.excerpt })
</script>

<template>
  <div class="w-full overflow-x-clip bg-white text-neutral-950">
    <main class="mx-auto w-full max-w-[1080px] px-4 py-10 sm:px-6 lg:py-14">
      <NuxtLink
        to="/reading"
        class="text-primary hover:text-error inline-flex items-center gap-1 text-sm font-medium"
      >
        <span class="icon-[tabler--arrow-left] size-4" />
        返回文章列表
      </NuxtLink>

      <header class="mt-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge badge-outline badge-primary rounded-full">
            閱讀
          </span>
          <span class="badge badge-outline badge-error rounded-full">
            {{ material.level.toUpperCase() }}
          </span>
          <span
            v-for="category in material.categories"
            :key="category"
            class="badge badge-soft badge-neutral rounded-full"
          >
            {{ materialCategoryLabels[category] ?? category }}
          </span>
        </div>
        <div class="mt-4 flex items-start justify-between gap-4">
          <h1 class="text-3xl leading-tight font-bold sm:text-5xl">
            {{ material.title }}
          </h1>
          <FavoriteButton :label="`收藏 ${material.title}`" size="md" />
        </div>
      </header>

      <div
        class="mt-8 grid overflow-hidden rounded-xl bg-white"
        :class="{ 'md:grid-cols-[1.1fr_0.9fr]': material.coverImage }"
      >
        <div v-if="material.coverImage" class="aspect-video md:aspect-auto">
          <img
            :src="material.coverImage"
            :alt="material.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="bg-error/5 p-6 text-neutral-900">
          <h2 class="font-bold">文章簡介</h2>
          <p class="mt-2 text-sm leading-6 text-neutral-600">
            {{ material.excerpt }}
          </p>
        </div>
      </div>

      <ContentControls
        class="mt-8"
        :mode="mode"
        :playback-rate="playbackRate"
        content-label="文章"
        @update:mode="mode = $event"
        @update:playback-rate="playbackRate = $event"
      >
        <template #playback-actions>
          <button
            v-if="mode === 'full'"
            type="button"
            class="btn btn-outline btn-error btn-sm min-h-11 bg-white text-error hover:bg-error/10 hover:text-error sm:min-h-8"
            :aria-label="isArticlePlaying ? '停止播放文章' : '播放文章'"
            @click="void playArticle()"
          >
            <span
              :class="
                isArticlePlaying
                  ? 'icon-[tabler--player-stop-filled]'
                  : 'icon-[tabler--player-play-filled]'
              "
              class="size-4"
            />
            {{ isArticlePlaying ? '停止播放文章' : '播放文章' }}
          </button>
        </template>
        <template #mode-actions>
          <ContentVisibilityToggle
            v-if="mode === 'full'"
            :visible="articleVisible"
            label="隱藏整篇"
            @update:visible="articleVisible = $event"
          />
          <ContentVisibilityToggle
            v-if="mode === 'sentence'"
            :visible="sentenceJapaneseVisible"
            label="隱藏日文"
            @update:visible="sentenceJapaneseVisible = $event"
          />
          <ContentVisibilityToggle
            v-if="mode === 'sentence'"
            :visible="sentenceTranslationVisible"
            label="隱藏中文"
            @update:visible="sentenceTranslationVisible = $event"
          />
        </template>
        <template #display-settings>
          <ContentDisplayToggles
            :lookup-mode="lookupMode"
            :show-ruby="showRuby"
            @update:lookup-mode="lookupMode = $event"
            @update:show-ruby="showRuby = $event"
          />
        </template>
      </ContentControls>

      <section class="w-full rounded-xl py-4 sm:px-4 sm:py-5">
        <div
          class="mb-6 rounded-lg bg-neutral-50 p-3 sm:hidden"
        >
          <ContentMobileControls
            content-label="文章"
            :playback-rate="playbackRate"
            :is-playing="isArticlePlaying"
            :lookup-mode="lookupMode"
            :show-ruby="showRuby"
            @toggle-playback="void playArticle()"
            @update:playback-rate="playbackRate = $event"
            @update:lookup-mode="lookupMode = $event"
            @update:show-ruby="showRuby = $event"
          />
        </div>

        <template v-if="mode === 'full'">
          <ContentMaskable
            class="mt-6"
            :visible="articleVisible"
            reveal-label="顯示文章日文"
            @reveal="articleVisible = true"
          >
            <div
              class="space-y-7 px-2 text-lg leading-[2.5] text-neutral-900 sm:px-4 sm:text-xl"
            >
              <p v-for="paragraph in material.paragraphs" :key="paragraph.id">
                <template
                  v-for="sentence in paragraph.sentences"
                  :key="sentence.id"
                >
                  <ContentAnnotatedText
                    :text="sentence.text"
                    :vocabulary-notes="sentence.vocabularyNotes"
                    :grammar-notes="sentence.grammarNotes"
                    :show-ruby="showRuby"
                    :lookup-mode="lookupMode"
                  />
                </template>
              </p>
            </div>
          </ContentMaskable>

          <section
            class="border-error/10 bg-error/5 mt-10 rounded-xl border px-4 py-5"
          >
            <h2 class="text-error text-sm font-medium">文章翻譯</h2>
            <div
              class="mt-4 space-y-4 text-sm leading-7 text-neutral-600 sm:text-base"
            >
              <p v-for="translation in material.translation" :key="translation">
                {{ translation }}
              </p>
            </div>
          </section>
        </template>

        <div v-else class="mt-6 space-y-4">
          <template
            v-for="paragraph in material.paragraphs"
            :key="paragraph.id"
          >
            <article
              v-for="sentence in paragraph.sentences"
              :key="sentence.id"
              class="border-error/10 bg-error/5 grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-xl border p-4 sm:gap-5 sm:p-5"
            >
              <div class="min-w-0 space-y-2">
                <ContentMaskable
                  :visible="isSentenceJapaneseVisible(sentence.id)"
                  :reveal-label="`顯示句子：${toPlainJapanese(sentence.text)}`"
                  @reveal="revealJapaneseSentence(sentence.id)"
                >
                  <p class="text-base leading-10 text-neutral-900 sm:text-lg">
                    <ContentAnnotatedText
                      :text="sentence.text"
                      :vocabulary-notes="sentence.vocabularyNotes"
                      :grammar-notes="sentence.grammarNotes"
                      :show-ruby="showRuby"
                      :lookup-mode="lookupMode"
                    />
                  </p>
                </ContentMaskable>
                <div
                  class="border-error/10 min-w-0 border-t pt-2"
                >
                  <ContentMaskable
                    :visible="isSentenceTranslationVisible(sentence.id)"
                    :reveal-label="`顯示中文翻譯：${sentence.translation}`"
                    @reveal="revealTranslationSentence(sentence.id)"
                  >
                    <p class="text-sm leading-6 text-neutral-500">
                      {{ sentence.translation }}
                    </p>
                  </ContentMaskable>
                </div>
              </div>
              <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
                <AudioButton
                  :label="`播放句子：${toPlainJapanese(sentence.text)}`"
                  :state="audioState(sentence.id)"
                  @play="
                    playAudio({
                      audioId: sentence.id,
                      text: toPlainJapanese(sentence.text),
                    })
                  "
                />
                <FavoriteButton
                  :label="`收藏句子：${toPlainJapanese(sentence.text)}`"
                />
              </div>
            </article>
          </template>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">重點單字</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          <ContentVocabularyPopover
            v-for="note in vocabularyNotes"
            :key="note.id"
            :note="note"
            variant="badge"
          >
            {{ note.surface }}
          </ContentVocabularyPopover>
        </div>
      </section>

      <section class="mt-14 scroll-mt-[84px]">
        <h2 class="text-2xl font-bold">本文使用文法</h2>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          展開查看本文中的用法與另一個例句。
        </p>
        <ContentGrammarNotes
          class="mt-5"
          :notes="grammarNotes"
          :active-id="activeGrammarId"
          @toggle="toggleGrammar"
        />
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">其他推薦文章</h2>
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MaterialCard
            v-for="item in recommendations"
            :key="item.id"
            :material="item"
            :show-type="false"
            :show-level="false"
          />
        </div>
      </section>
    </main>
  </div>
</template>
