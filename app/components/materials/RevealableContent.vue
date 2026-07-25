<script setup lang="ts">
defineProps<{
  visible: boolean
  revealLabel: string
  // 遮罩時疊在模糊層上的提示（如逐句練習「看中文說日文」）；未傳則只有隱形的掀開熱區。
  overlayHint?: string
}>()

defineEmits<{
  (event: 'reveal'): void
}>()
</script>

<template>
  <div class="relative">
    <div
      class="transition-[filter,opacity] duration-200"
      :class="{
        'pointer-events-none opacity-70 blur-sm select-none': !visible,
      }"
      :aria-hidden="!visible"
    >
      <slot />
    </div>
    <button
      v-if="!visible"
      type="button"
      class="focus-visible:outline-error absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
      :aria-label="revealLabel"
      @click="$emit('reveal')"
    >
      <span
        v-if="overlayHint"
        class="bg-error/90 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
      >
        {{ overlayHint }}
      </span>
      <span class="sr-only">{{ revealLabel }}</span>
    </button>
  </div>
</template>
