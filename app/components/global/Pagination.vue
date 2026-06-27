<script setup lang="ts">
const { page, totalPages } = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'updatePage', newPage: number): void
}>()
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-center space-x-2">
    <div
      v-for="i in totalPages"
      :key="i"
      class="flex h-8 min-w-[32px] cursor-pointer items-center justify-center rounded-full border-[1px] px-2 text-sm font-bold transition-colors"
      :class="
        i === page
          ? 'border-[#F9595F] bg-[#F9595F] text-white'
          : 'border-transparent text-[#B58C8C] hover:bg-[#FFE5E5]/50'
      "
      @click="emit('updatePage', i)"
    >
      {{ i }}
    </div>
  </div>
</template>
