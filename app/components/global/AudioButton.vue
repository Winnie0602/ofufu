<script setup lang="ts">
import type { AudioPlaybackState } from '~/types/audio'

type AudioButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    label: string
    state?: AudioPlaybackState
    size?: AudioButtonSize
  }>(),
  {
    state: 'idle',
    size: 'sm',
  },
)

defineEmits<{
  (event: 'play'): void
}>()

const buttonSizeClass = computed(() =>
  props.size === 'md' ? 'btn-md' : 'btn-sm',
)
const iconSizeClass = computed(() =>
  props.size === 'md' ? 'size-5' : 'size-4',
)
</script>

<template>
  <button
    type="button"
    class="btn btn-circle border-error/20 bg-white text-error shadow-none transition-none hover:border-error hover:bg-error hover:text-white"
    :class="buttonSizeClass"
    :aria-label="label"
    @click.stop="$emit('play')"
  >
    <span class="grid size-5 place-items-center">
      <span
        v-if="state === 'loading'"
        class="loading loading-spinner"
        :class="iconSizeClass"
      />
      <span
        v-else
        class="swap [&>*]:transition-none"
        :class="{ 'swap-active': state === 'playing' }"
      >
        <span
          class="icon-[tabler--player-play-filled] swap-off"
          :class="iconSizeClass"
        />
        <span
          class="icon-[tabler--player-stop-filled] swap-on"
          :class="iconSizeClass"
        />
      </span>
    </span>
  </button>
</template>
