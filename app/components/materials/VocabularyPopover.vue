<script setup lang="ts">
import type { MaterialVocabularyNote } from '~/types/material'

withDefaults(
  defineProps<{
    note: MaterialVocabularyNote
    variant?: 'highlight' | 'badge'
  }>(),
  { variant: 'highlight' },
)
</script>

<template>
  <span
    class="tooltip [--interaction:true] [--placement:top] [--strategy:fixed] [--trigger:click]"
  >
    <span class="tooltip-toggle inline-flex align-baseline">
      <button
        type="button"
        class="align-baseline font-medium text-error transition-none"
        :class="
          variant === 'badge'
            ? 'badge badge-outline badge-error h-auto rounded-full bg-white px-3 py-1.5 hover:bg-error/10 tooltip-shown:bg-error/10'
            : 'rounded-sm bg-error/10 px-1 py-0.5 hover:bg-error/20 tooltip-shown:bg-error/20'
        "
        :data-vocabulary-note-id="note.id"
        :aria-label="`查看單字 ${note.surface}`"
      >
        <slot />
      </button>
    </span>
    <span
      class="tooltip-content invisible z-30 opacity-0 tooltip-shown:visible tooltip-shown:opacity-100"
      role="popover"
    >
      <span
        class="tooltip-body border-error/10 block w-[min(20rem,calc(100vw-2rem))] rounded-xl border bg-white p-4 text-start text-neutral-900 shadow-lg"
      >
        <span class="flex items-start justify-between gap-3">
          <span>
            <span class="block text-xl font-bold">{{ note.surface }}</span>
            <span class="mt-0.5 block text-xs text-neutral-500">{{ note.reading }}</span>
          </span>
          <span class="flex gap-2">
            <AudioButton :label="`播放 ${note.surface}`" />
            <FavoriteButton :label="`收藏 ${note.surface}`" />
          </span>
        </span>
        <span class="mt-3 block border-t border-neutral-100 pt-3 text-sm">
          {{ note.contextualMeaning }}
        </span>
        <span class="mt-3 block space-y-2">
          <span v-for="example in note.examples" :key="example.id" class="block">
            <span class="block text-sm font-medium">{{ example.japanese }}</span>
            <span class="mt-0.5 block text-xs text-neutral-500">{{ example.translation }}</span>
          </span>
        </span>
      </span>
    </span>
  </span>
</template>
