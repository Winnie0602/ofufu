<script setup lang="ts">
import type { SongsList } from '~/types/song'

const { song } = defineProps<{ song: SongsList }>()
</script>

<template>
  <div class="flex h-[94.5px] w-full space-x-2 md:px-2">
    <!-- 左邊圖片區 -->
    <NuxtLink
      :to="`/song/${song.id}`"
      class="group relative h-full w-[168px] flex-none overflow-hidden rounded-lg"
    >
      <img
        :src="`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`"
        alt="影片封面"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div
        class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#F9595F] shadow-lg"
        >
          <span class="ml-1 text-xl">▶</span>
        </div>
      </div>
    </NuxtLink>

    <!-- 右邊文字區 -->
    <NuxtLink
      :to="`/song/${song.id}`"
      class="flex h-full w-full flex-col justify-center rounded-lg bg-white px-3 py-2"
    >
      <div class="text-sm font-medium text-[#F9595F]">{{ song.title }}</div>
      <div class="mt-1 line-clamp-2 text-xs text-[#A66B6B]">
        {{ song.artist }}
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
