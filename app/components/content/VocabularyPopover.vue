<script setup lang="ts">
import type { MaterialVocabularyNote } from '~/types/material'
import { currentMaterialKey } from '~/types/material'
import { vocabularyPartOfSpeechLabels } from '~/types/vocabulary'

const props = withDefaults(
  defineProps<{
    note: MaterialVocabularyNote
    variant?: 'highlight' | 'badge'
  }>(),
  { variant: 'highlight' },
)

// 這個 Popover 自己不知道屬於哪一篇教材，由詳情頁 provide；拿不到就是漏了 provide。
const currentMaterial = inject(currentMaterialKey)
if (!currentMaterial) {
  throw new Error(
    'ContentVocabularyPopover 需要 currentMaterial，請在教材詳情頁 provide(currentMaterialKey, …)',
  )
}

// Popover 內單字語音：播放的是單字表層形，unitId 用 note.id（伺服器依此查回文字與聲音）。
const { audioState, togglePlay } = useTtsAudio(currentMaterial)

// 表層形是否為活用形（與辭書形不同）；活用時另外標示辭書形，方便查字典，
// 收藏時也會依辭書形自然鍵去重（在收藏動作處理，Popover 不攤開單字表資料）。
const isInflected = computed(
  () => props.note.surface !== props.note.dictionaryForm,
)

// 觸發樣式：badge 為側欄「重點單字」水平標籤；highlight 為內文可點字（查字模式開啟時才出現）。
// 內文的底色標記改由 RubyText 只套在「底排文字」上（見 AnnotatedText highlightClass），
// 此處的內文按鈕本身不再上底色，僅維持文字色與可點性，避免背景蓋到 furigana。
const triggerClass = computed(() => {
  if (props.variant === 'badge') {
    return 'badge badge-outline badge-error hover:bg-error/10 tooltip-shown:bg-error/10 h-auto rounded-full bg-white px-3 py-1.5 text-error font-medium'
  }
  return 'text-neutral-900'
})
</script>

<template>
  <span
    class="tooltip [--interaction:true] [--placement:top] [--strategy:fixed] [--trigger:click]"
  >
    <span class="tooltip-toggle inline-flex align-baseline">
      <button
        type="button"
        class="align-baseline transition-none"
        :class="triggerClass"
        :data-vocabulary-note-id="note.id"
        :aria-label="`查看單字 ${note.surface}`"
      >
        <slot />
      </button>
    </span>
    <span
      class="tooltip-content tooltip-shown:visible tooltip-shown:opacity-100 invisible z-30 opacity-0"
      role="popover"
    >
      <span
        class="tooltip-body border-error/10 block w-[min(20rem,calc(100vw-2rem))] rounded-xl border bg-white p-4 text-start text-neutral-900 shadow-lg"
      >
        <span class="flex items-start justify-between gap-3">
          <span>
            <span class="flex items-center gap-2">
              <span class="text-xl font-bold">{{ note.surface }}</span>
              <span
                class="badge badge-outline badge-error badge-sm rounded-sm px-1.5"
              >
                {{ vocabularyPartOfSpeechLabels[note.partOfSpeech] }}
              </span>
            </span>
            <span class="mt-0.5 block text-xs text-neutral-500">
              {{ note.surfaceReading }}
            </span>
          </span>
          <span class="flex gap-2">
            <AudioButton
              :label="`播放 ${note.surface}`"
              :state="audioState(note.id)"
              @play="togglePlay({ audioId: note.id })"
            />
            <FavoriteButton :label="`收藏 ${note.dictionaryForm}`" />
          </span>
        </span>
        <span class="mt-3 block border-t border-neutral-100 pt-3">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            解釋
          </span>
          <span class="text-primary mt-1.5 block pl-2 text-sm font-medium">
            {{ note.contextualMeaning }}
          </span>
        </span>
        <span v-if="isInflected" class="mt-5 block">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            辭書形
          </span>
          <span class="mt-1.5 block pl-2 text-sm text-neutral-700">
            {{ note.dictionaryForm }}
          </span>
        </span>
        <span v-if="note.examples?.length" class="mt-5 block">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            例句
          </span>
          <span class="mt-1.5 block space-y-2 pl-2">
            <span
              v-for="example in note.examples"
              :key="example.id"
              class="block"
            >
              <span class="block text-sm font-medium">
                {{ example.japanese }}
              </span>
              <span class="mt-0.5 block text-xs text-neutral-500">
                {{ example.translation }}
              </span>
            </span>
          </span>
        </span>
      </span>
    </span>
  </span>
</template>
