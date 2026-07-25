<script setup lang="ts">
import type { SongsList } from '~/types/song'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const { songs, pending } = defineProps<{
  songs: SongsList[]
  pending: boolean
}>()

// 只有在非 Pending 狀態且有資料時才啟動 Embla
const [emblaRef] = emblaCarouselVue({ loop: true }, [
  Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
])
</script>

<template>
  <div class="w-full">
    <div
      v-if="pending && !songs.length"
      class="flex w-full overflow-hidden px-1"
    >
      <div v-for="n in 5" :key="n" class="skeleton-slide flex-shrink-0">
        <div class="aspect-video w-full animate-pulse rounded-md bg-gray-200">
          <div
            class="absolute bottom-0 left-0 h-12 w-full bg-gray-300/50"
          ></div>
        </div>
      </div>
    </div>

    <div
      v-else
      ref="emblaRef"
      class="embla w-full"
      :class="{
        'pointer-events-none opacity-50 transition-opacity': pending,
      }"
    >
      <div class="embla__container space-x-1">
        <NuxtLink
          v-for="song in songs"
          :key="song.id"
          class="embla__slide relative"
          :to="`/song/${song.id}`"
        >
          <img
            :src="`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`"
            alt="影片封面"
            class="aspect-video w-full bg-gray-100 object-cover"
          />
          <div class="absolute bottom-0 left-0 w-full bg-black/60 px-4 py-3">
            <p class="truncate text-base font-semibold text-white">
              {{ song.artist }} - {{ song.title }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}

/* 統一投影片與骨架屏的寬度定義，確保切換時不跳動 */
.embla__slide,
.skeleton-slide {
  @apply min-w-0 flex-[0_0_100%] md:flex-[0_0_360px] xl:flex-[0_0_520px];
  margin-left: 4px;
}

.transition-opacity {
  transition: opacity 0.3s ease;
}
</style>
