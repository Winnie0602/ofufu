<script setup lang="ts">
import type { MaterialGrammarNote } from '~/types/material'

const props = defineProps<{
  notes: MaterialGrammarNote[]
  activeId: string | null
}>()

defineEmits<{
  (event: 'toggle', grammarNoteId: string): void
}>()

const isActive = (id: string) => props.activeId === id
</script>

<template>
  <div class="space-y-3">
    <article
      v-for="note in notes"
      :id="`grammar-note-${note.id}`"
      :key="note.id"
      class="collapse --prevent-on-load-init scroll-mt-[84px] rounded-lg border border-neutral-200 bg-white"
      :class="{ 'collapse-open': isActive(note.id) }"
    >
      <button
        type="button"
        class="collapse-toggle flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-neutral-900"
        :aria-expanded="isActive(note.id)"
        @click="$emit('toggle', note.id)"
      >
        <span class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span class="font-bold">{{ note.pattern }}</span>
          <span class="text-sm font-medium text-neutral-500">
            {{ note.shortMeaning }}
          </span>
        </span>
        <span
          class="size-5 shrink-0"
          :class="isActive(note.id) ? 'icon-[tabler--minus]' : 'icon-[tabler--plus]'"
        />
      </button>
      <div
        class="grid overflow-hidden transition-[grid-template-rows] duration-300"
        :class="isActive(note.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="min-h-0 overflow-hidden">
          <div class="border-t border-neutral-100 px-5 py-5">
            <p class="text-sm leading-7 text-neutral-700">
              {{ note.explanation }}
            </p>
            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <div class="rounded-lg bg-primary/5 p-4">
                <h4 class="text-xs font-bold text-neutral-500">本文例句</h4>
                <p class="mt-2 text-sm font-medium text-neutral-900">
                  {{ note.sourceExample.japanese }}
                </p>
                <p class="mt-1 text-xs text-neutral-500">
                  {{ note.sourceExample.translation }}
                </p>
              </div>
              <div class="rounded-lg bg-primary/5 p-4">
                <h4 class="text-xs font-bold text-neutral-500">其他例句</h4>
                <p class="mt-2 text-sm font-medium text-neutral-900">
                  {{ note.extraExample.japanese }}
                </p>
                <p class="mt-1 text-xs text-neutral-500">
                  {{ note.extraExample.translation }}
                </p>
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-primary btn-sm mt-5" disabled>
              完整文法頁規劃中
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
