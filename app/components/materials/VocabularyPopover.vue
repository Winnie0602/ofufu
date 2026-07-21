<script setup lang="ts">
import type { MaterialVocabularyNote } from '~/types/material'
import { vocabularyPartOfSpeechLabels } from '~/types/vocabulary'

const props = withDefaults(
  defineProps<{
    note: MaterialVocabularyNote
    variant?: 'highlight' | 'badge'
  }>(),
  { variant: 'highlight' },
)

// 表層形是否為活用形（與辭書形不同）；活用時另外標示辭書形，方便查字典，
// 收藏時也會依辭書形自然鍵去重（在收藏動作處理，Popover 不攤開單字表資料）。
const isInflected = computed(
  () => props.note.surface !== props.note.dictionaryForm,
)
</script>

<template>
  <span
    class="tooltip [--interaction:true] [--placement:top] [--strategy:fixed] [--trigger:click]"
  >
    <span class="tooltip-toggle inline-flex align-baseline">
      <button
        type="button"
        class="text-error align-baseline font-medium transition-none"
        :class="
          variant === 'badge'
            ? 'badge badge-outline badge-error hover:bg-error/10 tooltip-shown:bg-error/10 h-auto rounded-full bg-white px-3 py-1.5'
            : 'bg-error/10 hover:bg-error/20 tooltip-shown:bg-error/20 rounded-sm px-1 py-0.5'
        "
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
            <AudioButton :label="`播放 ${note.surface}`" />
            <FavoriteButton :label="`收藏 ${note.dictionaryForm}`" />
          </span>
        </span>
        <span class="mt-3 mb-5 block border-t border-neutral-100 pt-3">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            解釋
          </span>
          <span class="text-primary mt-1.5 block pl-2 text-sm font-medium">
            {{ note.contextualMeaning }}
          </span>
        </span>
        <span v-if="isInflected" class="mb-5 block">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            辭書形
          </span>
          <span class="mt-1.5 block pl-2 text-sm text-neutral-700">
            {{ note.dictionaryForm }}
          </span>
        </span>
        <span v-if="note.examples?.length" class="mb-2 block">
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
