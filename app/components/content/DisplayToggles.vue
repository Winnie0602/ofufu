<script setup lang="ts">
defineProps<{
  lookupMode: boolean
  showRuby: boolean
  compact?: boolean
}>()

defineEmits<{
  (event: 'update:lookupMode', lookupMode: boolean): void
  // 與 update:lookupMode 同為 boolean payload，但語意不同（顯示假名），保留獨立 overload
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (event: 'update:showRuby', showRuby: boolean): void
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <label
      class="flex items-center gap-2 text-xs whitespace-nowrap text-neutral-700 sm:text-sm"
      :class="compact ? 'min-h-9' : 'min-h-11 sm:min-h-8'"
    >
      <span>重點單字/文法</span>
      <input
        type="checkbox"
        class="switch switch-error switch-sm"
        :checked="lookupMode"
        @change="
          $emit('update:lookupMode', ($event.target as HTMLInputElement).checked)
        "
      />
    </label>

    <label
      class="flex items-center gap-2 text-xs whitespace-nowrap text-neutral-700 sm:text-sm"
      :class="compact ? 'min-h-9' : 'min-h-11 sm:min-h-8'"
    >
      <span>假名</span>
      <input
        type="checkbox"
        class="switch switch-error switch-sm"
        :checked="showRuby"
        @change="
          $emit('update:showRuby', ($event.target as HTMLInputElement).checked)
        "
      />
    </label>
  </div>
</template>
