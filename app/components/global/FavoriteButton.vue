<script setup lang="ts">
type FavoriteButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    label: string
    active?: boolean
    size?: FavoriteButtonSize
  }>(),
  {
    active: false,
    size: 'sm',
  },
)

defineEmits<{
  (event: 'toggle'): void
}>()

const buttonSizeClass = computed(() =>
  props.size === 'md' ? 'btn-md' : 'btn-sm',
)
const iconSizeClass = computed(() =>
  props.size === 'md' ? 'size-6' : 'size-5',
)
</script>

<template>
  <button
    type="button"
    class="btn btn-circle border-error/20 bg-white text-error shadow-none transition-none hover:border-error hover:bg-error hover:text-white"
    :class="buttonSizeClass"
    :aria-label="label"
    :aria-pressed="active"
    @click.stop="$emit('toggle')"
  >
    <span
      :class="[
        active ? 'icon-[tabler--heart-filled]' : 'icon-[tabler--heart]',
        iconSizeClass,
      ]"
    />
  </button>
</template>
