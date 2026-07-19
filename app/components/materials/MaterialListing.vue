<script setup lang="ts">
import type { MaterialSummary } from '~/types/material'

const props = defineProps<{
  title: string
  description: string
  items: MaterialSummary[]
  itemIdPrefix: string
  emptyLabel: string
}>()

const {
  changeLevel,
  changePage,
  pageCount,
  safePage,
  selectedLevel,
  visibleItems,
} = useMaterialListing(props.items, props.itemIdPrefix)
</script>

<template>
  <MaterialsPage>
    <template #hero>
      <MaterialsHero :title="title" :description="description" />
    </template>

    <div class="pt-4 pb-12">
      <section
        class="flex items-center gap-6 border-y border-neutral-200 py-4 sm:px-4"
      >
        <span class="shrink-0 text-sm text-neutral-700">程度篩選</span>
        <MaterialsLevelFilter
          class="min-w-0 overflow-x-auto"
          :model-value="selectedLevel"
          @update:model-value="changeLevel"
        />
      </section>

      <section class="mt-6">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <MaterialsMaterialCard
            v-for="item in visibleItems"
            :id="`${itemIdPrefix}-${item.id}`"
            :key="item.id"
            class="scroll-mt-[84px]"
            :material="item"
            :show-type="false"
            :show-level="selectedLevel === 'all'"
          />
        </div>

        <div
          v-if="visibleItems.length === 0"
          class="py-16 text-center text-neutral-500"
        >
          {{ emptyLabel }}
        </div>

        <Pagination
          class="mt-8"
          :page="safePage"
          :total-pages="pageCount"
          :aria-label="`${title}列表分頁`"
          @update-page="changePage"
        />
      </section>
    </div>
  </MaterialsPage>
</template>
