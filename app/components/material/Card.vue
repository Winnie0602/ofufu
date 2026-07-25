<script setup lang="ts">
import {
  materialCategoryLabels,
  materialTypeLabels,
  type MaterialSummary,
} from '~/types/material'

const props = withDefaults(
  defineProps<{
    material: MaterialSummary
    showType?: boolean
    showLevel?: boolean
    showCategories?: boolean
  }>(),
  {
    showType: true,
    showLevel: true,
    showCategories: true,
  },
)

const materialRoute = computed(() =>
  props.material.type === 'reading' || props.material.type === 'conversation'
    ? `/${props.material.type}/${props.material.id}`
    : '#',
)
</script>

<template>
  <article
    class="group border-error/5 shadow-error/5 relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
  >
    <FavoriteButton
      class="absolute top-3 right-3 z-20"
      :label="`收藏 ${material.title}`"
    />

    <NuxtLink
      :to="materialRoute"
      class="grid h-full grid-cols-[7.5rem_minmax(0,1fr)] sm:flex sm:flex-col"
      :aria-label="`閱讀 ${material.title}`"
    >
      <div
        class="relative h-full min-h-32 overflow-hidden bg-neutral-100 sm:aspect-video sm:min-h-0 sm:w-full"
      >
        <img
          v-if="material.coverImage"
          :src="material.coverImage"
          :alt="material.title"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-neutral-950 px-3 text-center"
        >
          <span class="text-base leading-snug font-bold text-white sm:text-xl">
            {{ material.title }}
          </span>
        </div>
      </div>

      <div class="flex min-w-0 flex-1 flex-col p-3">
        <h3
          class="group-hover:text-primary line-clamp-2 text-sm leading-6 font-bold text-neutral-900 transition sm:line-clamp-1 sm:text-base"
        >
          {{ material.title }}
        </h3>
        <p
          class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500 sm:mt-2 sm:min-h-[2.6rem]"
        >
          {{ material.excerpt }}
        </p>

        <div
          class="mt-auto flex items-end justify-between gap-2 border-t border-neutral-100 pt-2.5 sm:pt-3"
        >
          <div class="flex flex-wrap items-center gap-1.5">
            <span
              v-if="showType"
              class="badge badge-outline badge-primary badge-sm rounded-full px-2"
            >
              {{ materialTypeLabels[material.type] }}
            </span>
            <span
              v-if="showLevel"
              class="badge badge-outline badge-error badge-sm rounded-full px-2"
            >
              {{ material.level.toUpperCase() }}
            </span>
            <template v-if="showCategories">
              <span
                v-for="category in material.categories"
                :key="category"
                class="badge badge-soft badge-neutral badge-sm rounded-full px-2"
              >
                {{ materialCategoryLabels[category] ?? category }}
              </span>
            </template>
          </div>
          <span
            class="text-primary group-hover:text-error hidden shrink-0 items-center gap-1 text-[11px] font-bold tracking-wide sm:flex"
          >
            READ
            <span class="icon-[tabler--arrow-right] size-3.5" />
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
