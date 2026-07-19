<script setup lang="ts">
import type { StudyMode } from '~/types/material'

const props = defineProps<{
  mode: StudyMode
  showRuby: boolean
  playbackRate: number
  contentLabel: '文章' | '對話'
}>()

defineEmits<{
  (event: 'update:mode', mode: StudyMode): void
  (event: 'update:showRuby', showRuby: boolean): void
  (event: 'update:playbackRate', playbackRate: number): void
}>()

type StudyModeOption = {
  value: StudyMode
  label: string
  icon?: string
  iconText?: string
}

const modeOptions = computed<StudyModeOption[]>(() => [
  { value: 'full', label: '中日對照', icon: 'icon-[tabler--language]' },
  {
    value: 'japanese',
    label: '僅顯示日文',
    iconText: 'あ',
  },
  {
    value: props.contentLabel === '文章' ? 'sentence' : 'listening',
    label: props.contentLabel === '文章' ? '單句學習' : '對話隱藏',
    icon:
      props.contentLabel === '文章'
        ? 'icon-[tabler--list-details]'
        : 'icon-[tabler--eye-off]',
  },
])
</script>

<template>
  <section
    class="flex flex-col gap-4 border-y border-neutral-200 py-4 sm:flex-row sm:items-center sm:justify-between"
    aria-label="學習顯示控制"
  >
    <div class="join w-full sm:w-auto">
      <button
        v-for="option in modeOptions"
        :key="option.value"
        type="button"
        class="btn btn-soft btn-sm join-item min-w-0 flex-1 gap-1 !rounded-none px-2 text-xs whitespace-nowrap transition-none sm:flex-none sm:gap-2 sm:px-3 sm:text-sm"
        :class="
          mode === option.value
            ? 'btn-error bg-error hover:bg-error text-white hover:text-white'
            : 'btn-error text-error hover:bg-error/10 bg-white hover:text-error'
        "
        :aria-pressed="mode === option.value"
        @click="$emit('update:mode', option.value)"
      >
        <span
          v-if="option.icon"
          :class="option.icon"
          class="size-3.5 shrink-0 sm:size-4"
        />
        <span
          v-else
          class="inline-flex size-3.5 shrink-0 items-center justify-center text-sm leading-none font-bold sm:size-4 sm:text-base"
          aria-hidden="true"
        >
          {{ option.iconText }}
        </span>
        {{ option.label }}
      </button>
    </div>

    <div class="flex items-end justify-between gap-5 sm:items-center sm:justify-end">
      <label class="flex flex-col gap-2 text-sm text-neutral-700 sm:flex-row sm:items-center">
        <span>顯示假名</span>
        <input
          type="checkbox"
          class="switch switch-error switch-sm"
          :checked="showRuby"
          :disabled="mode === 'listening'"
          @change="$emit('update:showRuby', ($event.target as HTMLInputElement).checked)"
        />
      </label>

      <label class="flex flex-col gap-2 text-sm text-neutral-700 sm:flex-row sm:items-center">
        <span>播放速度</span>
        <select
          class="select select-sm w-24"
          :value="playbackRate"
          @change="$emit('update:playbackRate', Number(($event.target as HTMLSelectElement).value))"
        >
          <option :value="0.75" :selected="playbackRate === 0.75">0.75x</option>
          <option :value="1" :selected="playbackRate === 1">1x</option>
          <option :value="1.25" :selected="playbackRate === 1.25">1.25x</option>
          <option :value="1.5" :selected="playbackRate === 1.5">1.5x</option>
        </select>
      </label>
    </div>
  </section>
</template>
