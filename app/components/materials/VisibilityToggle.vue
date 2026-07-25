<script setup lang="ts">
// 內容顯示／隱藏的眼睛切換（閱讀整篇、單句日文／中文、對話日文／中文共用）。
// 一律以 visible 語意：visible=true 表示目前顯示、按下即隱藏；隱藏狀態用 error 色提示。
defineProps<{
  visible: boolean
  label: string
}>()

defineEmits<{
  (event: 'update:visible', visible: boolean): void
}>()
</script>

<template>
  <button
    type="button"
    class="hover:text-error focus-visible:outline-error inline-flex min-h-9 items-center gap-1.5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-8"
    :class="visible ? 'text-neutral-700' : 'text-error font-bold'"
    :aria-pressed="!visible"
    @click="$emit('update:visible', !visible)"
  >
    <span
      :class="visible ? 'icon-[tabler--eye-off]' : 'icon-[tabler--eye]'"
      class="size-4"
    />
    {{ label }}
  </button>
</template>
