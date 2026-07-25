<script setup lang="ts">
import type { StudyMode } from '~/types/material'

const props = defineProps<{
  mode: StudyMode
  playbackRate: number
  contentLabel: '文章' | '對話'
}>()

defineEmits<{
  (event: 'update:mode', mode: StudyMode): void
  (event: 'update:playbackRate', playbackRate: number): void
}>()

type StudyModeOption = {
  value: StudyMode
  label: string
  icon?: string
  iconText?: string
}

const modeOptions = computed<StudyModeOption[]>(() => [
  {
    value: 'full',
    label: props.contentLabel === '文章' ? '整篇閱讀' : '閱讀模式',
    icon:
      props.contentLabel === '文章'
        ? 'icon-[tabler--article]'
        : 'icon-[tabler--language]',
  },
  {
    value: props.contentLabel === '文章' ? 'sentence' : 'roleplay',
    label: props.contentLabel === '文章' ? '單句學習' : '角色扮演',
    icon:
      props.contentLabel === '文章'
        ? 'icon-[tabler--list-details]'
        : 'icon-[tabler--masks-theater]',
  },
])
</script>

<template>
  <section
    class="border-y border-neutral-200 pt-4 pb-1 sm:py-4"
    aria-label="學習顯示控制"
  >
    <div
      class="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
    >
      <nav
        class="join --prevent-on-load-init flex w-full sm:col-start-1 sm:row-start-1 sm:w-auto"
        role="tablist"
        aria-label="學習模式"
      >
        <button
          v-for="option in modeOptions"
          :id="`${contentLabel}-${option.value}-tab`"
          :key="option.value"
          type="button"
          class="btn btn-soft btn-sm join-item min-h-11 min-w-0 flex-1 gap-1 !rounded-none px-2 !text-base whitespace-nowrap transition-none sm:min-h-8 sm:flex-none sm:gap-2 sm:px-3"
          :class="
            mode === option.value
              ? 'btn-error bg-error hover:bg-error text-white hover:text-white'
              : 'btn-error text-error hover:bg-error/10 bg-white hover:text-error'
          "
          role="tab"
          :aria-selected="mode === option.value"
          @click="$emit('update:mode', option.value)"
        >
          <span :class="option.icon" class="size-4 shrink-0" />
          {{ option.label }}
        </button>
      </nav>
      <div
        class="order-3 hidden items-center gap-3 sm:order-none sm:col-start-3 sm:row-start-1 sm:flex sm:justify-self-end"
      >
        <label
          class="flex min-h-11 items-center gap-2 text-sm whitespace-nowrap text-neutral-700 sm:min-h-9"
        >
          <span>播放速度</span>
          <select
            class="select select-sm h-11 w-24 focus:[--input-color:var(--color-error)]! sm:h-8"
            :value="playbackRate"
            @change="$emit('update:playbackRate', Number(($event.target as HTMLSelectElement).value))"
          >
<!-- SSR 下 <select> 的 :value 不會產生 selected 屬性，需在 option 上綁 :selected 才能正確反映預設值（如 1x） -->
            <option :value="0.75" :selected="playbackRate === 0.75">0.75x</option>
            <option :value="1" :selected="playbackRate === 1">1x</option>
            <option :value="1.25" :selected="playbackRate === 1.25">
              1.25x
            </option>
            <option :value="1.5" :selected="playbackRate === 1.5">1.5x</option>
          </select>
        </label>
        <slot name="playback-actions" />
      </div>

      <div
        class="order-2 min-h-11 sm:order-none sm:col-start-2 sm:row-start-1 sm:flex sm:min-h-10 sm:min-w-0 sm:items-center sm:justify-self-start"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-[opacity,transform] duration-200 ease-out"
          enter-from-class="-translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition-[opacity,transform] duration-100 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-1 opacity-0"
        >
          <div
            :key="mode"
            class="flex w-full flex-wrap items-center gap-2 rounded-lg bg-neutral-100 px-2 py-1 [&>*]:min-w-0 [&>*]:flex-1 [&>*]:justify-center [&>*]:text-center sm:w-auto sm:[&>*]:flex-none sm:[&>*]:justify-start sm:[&>*]:text-left"
            :class="
              contentLabel === '對話' && mode === 'roleplay'
                ? 'sm:rounded-none sm:bg-transparent sm:p-0'
                : 'sm:rounded-lg sm:bg-neutral-100 sm:px-2 sm:py-1'
            "
          >
            <slot name="mode-actions" />
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="mt-1 hidden pt-1 sm:mt-4 sm:block sm:border-t sm:border-neutral-100 sm:pt-3"
    >
      <slot name="display-settings" />
    </div>
  </section>
</template>
