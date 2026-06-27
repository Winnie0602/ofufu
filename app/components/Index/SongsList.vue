<script setup lang="ts">
import type { SongsList } from '~/types/song'
import type { Tab, LangCode } from '~/types/lang'
import { languageMapCode } from '~/types/lang'

defineProps<{
  songs: SongsList[]
  page: number
  totalPages: number
  total: number
  pending: boolean
}>()

const emit = defineEmits<{
  (e: 'refresh', value: { page?: number; lang?: LangCode }): void
}>()

const showType = ref<'list' | 'grid'>('list')
const tabs = Object.keys(languageMapCode) as Tab[]
const nowTab = ref<Tab>('English')

watch(nowTab, () => {
  emit('refresh', { lang: languageMapCode[nowTab.value], page: 1 })
})
</script>

<template>
  <div class="mb-8 space-y-5 md:mb-20 md:space-y-8">
    <!-- 區塊：標題與語言分頁 -->
    <div class="w-full">
      <!-- 標題 + 語言 Tabs -->
      <div class="flex flex-col justify-between border-b-2 border-[#F9595F]/40 md:flex-row md:items-end">
        <div class="mb-2 text-3xl font-semibold tracking-wide text-[#A66B6B] md:mb-0 md:text-[36px]">
          {{ $t('song_list') }}
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

      <!-- 區塊：顯示模式切換（list / grid） -->
      <div class="mt-2 flex w-full justify-end md:px-3">
        <div class="grid grid-cols-2 rounded-xl border-[4px] border-[#FFE5E5]">
          <div class="cursor-pointer px-1 md:px-2" :class="{ 'bg-[#FFE5E5]': showType === 'list' }" @click="showType = 'list'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#F9595F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div class="cursor-pointer px-1 md:px-2" :class="{ 'bg-[#FFE5E5]': showType === 'grid' }" @click="showType = 'grid'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#F9595F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10-10h6v6h-6V4zm0 10h6v6h-6v-6z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 區塊：列表內容 -->
      <div class="mt-3 min-h-[400px]">
        <div
          v-if="pending"
          class="flex min-h-[400px] flex-col items-center justify-center gap-3"
        >
          <div
            class="h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-[#F9595F]"
          ></div>
          <span class="text-sm font-medium tracking-widest text-gray-400">
            {{ $t('loading') }} ...
          </span>
        </div>

        <template v-else-if="songs && songs.length > 0">
          <div v-if="showType === 'list'" class="space-y-3">
            <div v-for="song in songs" :key="song.id" class="group flex items-center justify-between rounded-xl border border-[#F9595F]/20 bg-white px-2 py-3 shadow-sm transition hover:bg-[#FFF3F3] md:px-4">
              <div class="flex items-center space-x-2 md:space-x-4">
                <NuxtLink :to="`/song/${song.id}`" class="relative h-[56px] w-[56px] flex-none overflow-hidden rounded-lg bg-gray-100">
                  <img :src="`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`" class="h-full w-full object-cover" />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#F9595F]"> ▶ </div>
                  </div>
                </NuxtLink>
                <NuxtLink :to="`/song/${song.id}`" class="flex flex-col">
                  <span class="line-clamp-1 text-sm font-medium text-[#5A3E3E] md:text-lg">{{ song.title }}</span>
                  <span class="mt-1 line-clamp-1 text-xs text-[#A66B6B] md:text-sm">{{ song.artist }}</span>
                </NuxtLink>
              </div>
              <div class="flex items-center space-x-1.5">
                <NuxtLink v-if="song.has_timestamp" :to="`/song/test/${song.id}`" class="flex h-[28px] items-center justify-center rounded-full border border-[#F9595F]/10 bg-[#FFE5E5] px-1.5 text-[10px] font-bold text-[#F9595F] shadow-sm transition hover:bg-[#F9595F] hover:text-white md:px-2.5"> TEST! </NuxtLink>
                <a :href="`https://www.youtube.com/watch?v=${song.id}`" target="_blank" class="flex h-[28px] items-center justify-center rounded-full bg-[#FFE5E5] px-2 shadow-sm transition hover:bg-[#F9595F]/10 md:px-3">
                  <i class="fa-brands fa-youtube text-lg text-[#F9595F]"></i>
                </a>
              </div>
            </div>
          </div>

          <div v-else class="grid grid-cols-2 gap-4 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <div v-for="song in songs" :key="song.id" class="group flex flex-col overflow-hidden rounded-2xl border border-[#F9595F]/10 bg-white shadow-sm transition hover:shadow-md">
              <NuxtLink :to="`/song/${song.id}`" class="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img :src="`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`" class="h-full w-full object-cover transition duration-300 group-hover:scale-110" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F9595F] shadow-lg"> ▶ </div>
                </div>
              </NuxtLink>
              <div class="flex flex-1 flex-col p-3">
                <NuxtLink :to="`/song/${song.id}`" class="line-clamp-1 text-sm font-medium text-[#5A3E3E] group-hover:text-[#F9595F] md:text-lg">{{ song.title }} </NuxtLink>
                <span class="mt-1 line-clamp-1 text-xs text-[#A66B6B] md:text-sm">{{ song.artist }}</span>
                <div class="mt-3 flex items-center border-t border-gray-50 pt-3">
                  <NuxtLink v-if="song.has_timestamp" :to="`/song/test/${song.id}`" class="flex h-6 items-center justify-center rounded-full border border-[#F9595F]/10 bg-[#FFE5E5] px-1.5 text-[10px] font-bold text-[#F9595F] shadow-sm transition hover:bg-[#F9595F] hover:text-white md:px-2.5"> TEST! </NuxtLink>
                  <a :href="`https://www.youtube.com/watch?v=${song.id}`" target="_blank" class="ml-auto text-[#F9595F] transition hover:scale-110">
                    <i class="fa-brands fa-youtube text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 狀態：無資料 -->
        <div v-else class="py-24 text-center">
          <p class="font-light tracking-widest text-gray-400">{{ $t('no_songs') }}</p>
        </div>

        <!-- 區塊：分頁 -->
        <div v-if="!pending && totalPages > 1" class="flex justify-center pt-4">
          <Pagination :total="total || 0" :page="page" :total-pages="totalPages || 0" @update-page="(newPage) => emit('refresh', { page: newPage })" />
        </div>
      </div>
    </div>
  </div>
</template>
