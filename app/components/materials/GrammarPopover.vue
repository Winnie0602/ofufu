<script setup lang="ts">
import type { MaterialGrammarNote } from '~/types/material'

defineProps<{
  note: MaterialGrammarNote
}>()
</script>

<template>
  <!-- 版型比照 MaterialsVocabularyPopover，accent 改用 primary（單字用 error）。 -->
  <span
    class="tooltip [--interaction:true] [--placement:top] [--strategy:fixed] [--trigger:click]"
  >
    <span class="tooltip-toggle inline-flex align-baseline">
      <button
        type="button"
        class="align-baseline text-neutral-900 transition-none"
        :data-grammar-note-id="note.id"
        :aria-label="`查看文法 ${note.pattern}`"
      >
        <slot />
      </button>
    </span>
    <span
      class="tooltip-content tooltip-shown:visible tooltip-shown:opacity-100 invisible z-30 opacity-0"
      role="popover"
    >
      <span
        class="tooltip-body border-primary/10 block w-[min(20rem,calc(100vw-2rem))] rounded-xl border bg-white p-4 text-start text-neutral-900 shadow-lg"
      >
        <span class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span class="text-xl font-bold">{{ note.pattern }}</span>
          <span class="whitespace-nowrap text-sm font-medium text-neutral-500">
            {{ note.shortMeaning }}
          </span>
        </span>
        <span class="mt-3 block border-t border-neutral-100 pt-3">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            用法
          </span>
          <span class="mt-1.5 block pl-2 text-sm leading-6 text-neutral-700">
            {{ note.explanation }}
          </span>
        </span>
        <span class="mt-5 block">
          <span
            class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
          >
            例句
          </span>
          <span class="mt-1.5 block space-y-2 pl-2">
            <span class="block">
              <span class="block text-sm font-medium">
                {{ note.sourceExample.japanese }}
              </span>
              <span class="mt-0.5 block text-xs text-neutral-500">
                {{ note.sourceExample.translation }}
              </span>
            </span>
            <span class="block">
              <span class="block text-sm font-medium">
                {{ note.extraExample.japanese }}
              </span>
              <span class="mt-0.5 block text-xs text-neutral-500">
                {{ note.extraExample.translation }}
              </span>
            </span>
          </span>
        </span>
        <span class="mt-5 block">
          <button type="button" class="btn btn-outline btn-primary btn-sm" disabled>
            完整文法頁規劃中
          </button>
        </span>
      </span>
    </span>
  </span>
</template>
