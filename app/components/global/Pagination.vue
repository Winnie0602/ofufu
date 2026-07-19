<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    page: number
    totalPages: number
    total?: number
    ariaLabel?: string
  }>(),
  {
    total: undefined,
    ariaLabel: '分頁',
  },
)

const emit = defineEmits<{
  (event: 'updatePage', page: number): void
}>()

const changePage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.page) return
  emit('updatePage', page)
}
</script>

<template>
  <nav class="flex justify-center" :aria-label="ariaLabel">
    <div class="flex items-center gap-x-1">
      <button
        type="button"
        class="btn btn-circle btn-sm text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent shadow-none transition-none hover:border-transparent"
        :disabled="page <= 1"
        aria-label="上一頁"
        @click="changePage(page - 1)"
      >
        <span class="icon-[tabler--chevron-left] size-5" />
      </button>

      <div class="flex items-center gap-x-1">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          type="button"
          class="btn btn-circle btn-sm shadow-none transition-none"
          :class="
            page === pageNumber
              ? 'border-error bg-error hover:bg-error text-white hover:text-white'
              : 'text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent hover:border-transparent'
          "
          :aria-current="page === pageNumber ? 'page' : undefined"
          :aria-label="`第 ${pageNumber} 頁`"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div>

      <button
        type="button"
        class="btn btn-circle btn-sm text-error hover:bg-error/10 hover:text-error border-transparent bg-transparent shadow-none transition-none hover:border-transparent"
        :disabled="page >= totalPages"
        aria-label="下一頁"
        @click="changePage(page + 1)"
      >
        <span class="icon-[tabler--chevron-right] size-5" />
      </button>
    </div>
  </nav>
</template>
