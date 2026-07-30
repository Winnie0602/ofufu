<script setup lang="ts">
import type { MaterialSummary } from '~/types/material'

const props = defineProps<{
  title: string
  description: string
  /** 列表 API 路徑，例：`/api/materials/reading`。 */
  endpoint: string
  itemIdPrefix: string
  emptyLabel: string
}>()

const {
  changeLevel,
  changePage,
  hasError,
  isLoading,
  pageCount,
  retry,
  safePage,
  selectedLevel,
  visibleItems,
} = await useMaterialListing<MaterialSummary>(props.endpoint, (itemId) => {
  document.getElementById(`${props.itemIdPrefix}-${itemId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
})
</script>

<template>
  <MaterialListPageLayout>
    <template #hero>
      <MaterialHero :title="title" :description="description" />
    </template>

    <div class="pt-4 pb-12">
      <section
        class="flex items-center gap-6 border-y border-neutral-200 py-4 sm:px-4"
      >
        <span class="shrink-0 text-sm text-neutral-700">程度篩選</span>
        <MaterialLevelFilter
          class="min-w-0 overflow-x-auto"
          :model-value="selectedLevel"
          @update:model-value="changeLevel"
        />
      </section>

      <section class="mt-6">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <MaterialCard
            v-for="item in visibleItems"
            :id="`${itemIdPrefix}-${item.id}`"
            :key="item.id"
            class="scroll-mt-[84px]"
            :material="item"
            :show-type="false"
            :show-level="selectedLevel === 'all'"
          />
        </div>

        <!-- 載入失敗要跟「這個程度沒有教材」分開講，不然看起來像資料真的不存在。 -->
        <div v-if="hasError" class="py-16 text-center">
          <p class="text-neutral-700">教材載入失敗，請稍後再試。</p>
          <button
            type="button"
            class="btn btn-soft btn-sm mt-4"
            @click="retry()"
          >
            重新載入
          </button>
        </div>

        <div
          v-else-if="visibleItems.length === 0"
          class="py-16 text-center text-neutral-500"
        >
          {{ isLoading ? '載入中⋯' : emptyLabel }}
        </div>

        <Pagination
          v-if="!hasError"
          class="mt-8"
          :page="safePage"
          :total-pages="pageCount"
          :aria-label="`${title}列表分頁`"
          @update-page="changePage"
        />
      </section>
    </div>
  </MaterialListPageLayout>
</template>
