<script setup lang="ts">
import { readingMaterials } from '~/data/materials/reading'
import { LANG_CONFIG_MAP } from '~/types/lang'
import { materialCategoryLabels, type StudyMode } from '~/types/material'

const route = useRoute()
const material = readingMaterials.find((item) => item.id === route.params.id)

if (!material) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const mode = ref<StudyMode>('full')
const showRuby = ref(true)
const playbackRate = ref(1)
const activeGrammarId = ref<string | null>(material.grammarNotes[0]?.id ?? null)
const isArticlePlaying = ref(false)
const { audioState, playAudio, playAudioSequence, stopAudio } = useTtsAudio(
  LANG_CONFIG_MAP.ja,
)

const articleSentences = material.paragraphs.flatMap(
  (paragraph) => paragraph.sentences,
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
      text: sentence.japanese,
    })),
  )
  isArticlePlaying.value = false
}

const toggleGrammar = (grammarId: string) => {
  activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
}

const selectGrammar = async (grammarId: string) => {
  activeGrammarId.value = grammarId
  await nextTick()
  await new Promise((resolve) => window.setTimeout(resolve, 350))
  document.getElementById(`grammar-note-${grammarId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const recommendations = readingMaterials
  .filter((item) => item.id !== material.id && item.level === material.level)
  .slice(0, 5)

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

      <MaterialsStudyControls
        class="mt-8"
        :mode="mode"
        :show-ruby="showRuby"
        :playback-rate="playbackRate"
        content-label="文章"
        @update:mode="mode = $event"
        @update:show-ruby="showRuby = $event"
        @update:playback-rate="playbackRate = $event"
      />

      <section class="mt-8 w-full rounded-xl px-3 py-4 sm:px-4 sm:py-9">
        <template v-if="mode !== 'sentence'">
          <div>
            <button
              type="button"
              class="btn btn-outline btn-error btn-sm text-error hover:bg-error/10 hover:text-error bg-white"
              :aria-label="isArticlePlaying ? '停止播放文章' : '自動播放文章'"
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
              {{ isArticlePlaying ? '停止播放文章' : '自動播放文章' }}
            </button>
          </div>

          <div
            class="mt-6 space-y-7 px-2 text-lg leading-[2.35] text-neutral-900 sm:px-4 sm:text-xl"
          >
            <p v-for="paragraph in material.paragraphs" :key="paragraph.id">
              <template
                v-for="sentence in paragraph.sentences"
                :key="sentence.id"
              >
                <MaterialsAnnotatedText
                  :segments="sentence.segments"
                  :vocabulary-notes="material.vocabularyNotes"
                  :show-ruby="showRuby"
                  @select-grammar="selectGrammar"
                />
              </template>
            </p>
          </div>

          <section
            class="border-error/10 bg-error/5 mt-10 rounded-xl border px-4 py-5"
            :class="{
              'pointer-events-none invisible select-none': mode !== 'full',
            }"
            :aria-hidden="mode !== 'full'"
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

        <div v-else class="space-y-4">
          <template
            v-for="paragraph in material.paragraphs"
            :key="paragraph.id"
          >
            <article
              v-for="sentence in paragraph.sentences"
              :key="sentence.id"
              class="border-error/10 bg-error/5 grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-xl border p-4 sm:gap-5 sm:p-5"
            >
              <div class="min-w-0">
                <p class="text-base leading-8 text-neutral-900 sm:text-lg">
                  <MaterialsAnnotatedText
                    :segments="sentence.segments"
                    :vocabulary-notes="[]"
                    :show-ruby="showRuby"
                    @select-grammar="selectGrammar"
                  />
                </p>
                <p
                  class="mt-2 border-t border-error/10 pt-2 text-sm leading-6 text-neutral-500"
                >
                  {{ sentence.translation }}
                </p>
              </div>
              <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
                <AudioButton
                  :label="`播放句子：${sentence.japanese}`"
                  :state="audioState(sentence.id)"
                  @play="
                    playAudio({ audioId: sentence.id, text: sentence.japanese })
                  "
                />
                <FavoriteButton :label="`收藏句子：${sentence.japanese}`" />
              </div>
            </article>
          </template>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">重點單字</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          <MaterialsVocabularyPopover
            v-for="note in material.vocabularyNotes"
            :key="note.id"
            :note="note"
            variant="badge"
          >
            {{ note.surface }}
          </MaterialsVocabularyPopover>
        </div>
      </section>

      <section class="mt-14 scroll-mt-[84px]">
        <h2 class="text-2xl font-bold">本文使用文法</h2>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          展開查看本文中的用法與另一個例句。
        </p>
        <MaterialsGrammarNotes
          class="mt-5"
          :notes="material.grammarNotes"
          :active-id="activeGrammarId"
          @toggle="toggleGrammar"
        />
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">其他推薦文章</h2>
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MaterialsMaterialCard
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
