<script setup lang="ts">
defineProps<{
  label: string
  state: 'idle' | 'loading' | 'playing'
}>()

defineEmits<{
  (event: 'play'): void
}>()
</script>

<template>
  <button
    type="button"
    class="btn btn-circle btn-sm border-error/20 bg-white text-error shadow-none transition-none hover:border-error hover:bg-error hover:text-white"
    :aria-label="label"
    @click.stop="$emit('play')"
  >
    <span class="grid size-5 place-items-center">
      <span v-if="state === 'loading'" class="loading loading-spinner size-4" />
      <span
        v-else
        class="swap [&>*]:transition-none"
        :class="{ 'swap-active': state === 'playing' }"
      >
        <span class="icon-[tabler--player-play-filled] swap-off size-4" />
        <span class="icon-[tabler--player-stop-filled] swap-on size-4" />
      </span>
    </span>
  </button>
</template>
