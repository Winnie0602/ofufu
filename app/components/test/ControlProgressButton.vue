<script setup lang="ts">
defineProps<{
  canPrev?: boolean
  canNext?: boolean
  prevLabel?: string
  nextLabel?: string
}>()

const emit = defineEmits<{
  (e: 'prev' | 'next'): void
}>()
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-30 flex justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-6"
  >
    <div class="flex w-[80%] max-w-md items-center gap-3 px-4 md:w-full">
      <!-- 上一步 -->
      <button
        :disabled="!canPrev"
        class="h-8 flex-1 rounded-xl border border-[#B58C8C]/30 bg-white text-[13px] font-bold text-[#A66B6B] shadow-sm transition-all active:scale-95 disabled:opacity-30 md:h-10"
        @click="emit('prev')"
      >
        {{ prevLabel || $t('prev') }}
      </button>

      <!-- 下一步 -->
      <button
        :disabled="!canNext"
        class="h-8 flex-1 rounded-xl text-[13px] font-bold shadow-md shadow-[#F9595F]/20 transition-all active:scale-95 md:h-10"
        :class="
          canNext
            ? 'bg-[#F9595F] text-white'
            : 'cursor-not-allowed bg-[#FFE5E5] text-[#E4BABA]'
        "
        @click="emit('next')"
      >
        {{ nextLabel }}
      </button>
    </div>
  </div>
</template>
