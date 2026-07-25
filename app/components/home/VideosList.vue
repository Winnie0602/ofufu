<script setup lang="ts">
import type { VideosList } from '~/types/video'
import type { Tab, LangCode } from '~/types/lang'
import { languageMapCode } from '~/types/lang'

defineProps<{
  videos: VideosList[]
  page: number
  totalPages: number
  total: number
  pending: boolean
}>()

const emit = defineEmits<{
  (e: 'refresh', value: { page?: number; lang?: LangCode }): void
}>()

const tabs = Object.keys(languageMapCode) as Tab[]
const nowTab = ref<Tab>('English')

watch(nowTab, () => {
  emit('refresh', { lang: languageMapCode[nowTab.value], page: 1 })
})
</script>

<template>
  <div class="mb-8 md:mb-20">
    <div class="flex flex-col justify-between border-b-2 border-[#F9595F]/40 md:flex-row md:items-end">
      <div class="mb-2 text-3xl font-semibold tracking-wide text-[#A66B6B] md:mb-0 md:text-[36px]">
        {{ $t('youtube_videos') }}
      </div>

      <div class="flex items-end space-x-1 text-[13px]">
        <div v-for="tab in tabs" :key="tab">
          <div v-if="nowTab === tab" class="relative -mb-[2px] rounded-t-lg border-2 border-b-0 border-[#F9595F] bg-white px-2 py-2 font-medium text-[#F9595F] shadow-sm md:px-4">
            {{ tab }}
          </div>
          <div v-else class="cursor-pointer rounded-t-lg px-2 py-2 text-[#A66B6B] transition-all duration-150 hover:bg-[#FFE5E5]/60 hover:text-[#F9595F] md:px-4" @click="nowTab = tab">
            {{ tab }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 min-h-[300px]">
      <div
        v-if="pending"
        class="flex min-h-[300px] flex-col items-center justify-center gap-3"
      >
        <div
          class="h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-[#F9595F]"
        ></div>
        <span class="text-sm font-medium tracking-widest text-gray-400">
          {{ $t('loading') }} ...
        </span>
      </div>

      <template v-else-if="videos && videos.length > 0">
        <div class="grid grid-cols-2 gap-4 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div
            v-for="video in videos"
            :key="video.nanoid"
            class="group flex flex-col overflow-hidden rounded-2xl border border-[#F9595F]/10 bg-white shadow-sm transition hover:shadow-md"
          >
            <NuxtLink
              :to="`/video/${video.episode.at(0)?.videoId}`"
              class="relative aspect-video w-full overflow-hidden bg-gray-100"
            >
              <img
                :src="`https://img.youtube.com/vi/${video.episode.at(0)?.videoId}/mqdefault.jpg`"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F9595F] shadow-lg"> ▶ </div>
              </div>
            </NuxtLink>
            <div class="flex flex-1 flex-col p-3">
              <NuxtLink
                :to="`/video/${video.episode.at(0)?.videoId}`"
                class="line-clamp-1 text-sm font-medium text-[#5A3E3E] group-hover:text-[#F9595F] md:text-lg"
              >
                {{ video.name }}
              </NuxtLink>
              <span class="mt-1 line-clamp-1 text-[11px] text-[#A66B6B] md:text-xs">
                {{ $t('video_count', { count: video.episode?.length || 0 }) }}
              </span>
              <div class="mt-3 flex items-center border-t border-gray-50 pt-3">
                <div class="flex h-6 items-center justify-center rounded-full border border-[#F9595F]/10 bg-[#FFE5E5] px-1.5 text-[10px] font-bold text-[#F9595F] shadow-sm transition hover:bg-[#F9595F] hover:text-white md:px-2.5">
                  {{ $t(video.type) }}
                </div>
                <a
                  :href="`https://www.youtube.com/watch?v=${video.episode.at(0)?.videoId}`"
                  target="_blank"
                  class="ml-auto text-[#F9595F] transition hover:scale-110"
                >
                  <i class="fa-brands fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="py-24 text-center">
        <p class="font-light tracking-widest text-gray-400">
          {{ $t('no_videos') }}
        </p>
      </div>

      <div v-if="!pending && totalPages > 1" class="flex justify-center pt-4">
        <Pagination
          :total="total || 0"
          :page="page"
          :total-pages="totalPages || 0"
          @update-page="(newPage) => emit('refresh', { page: newPage })"
        />
      </div>
    </div>
  </div>
</template>
