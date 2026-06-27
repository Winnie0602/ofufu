<script setup lang="ts">
import { formatTime } from '~/utils/time'
import { throttle } from 'lodash-es'

const route = useRoute()
const store = usePlayerStore()

// UI顯示的暫存時間
const seekingTime = ref(0)

// 節流版本的拖曳更新（每75ms更新一次）
const onSeekInput = throttle((e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  seekingTime.value = value
  store.isSeeking = true
}, 75)

const onSeekCommit = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  seekTo(value)
}

// 播放器是否顯示
const showPlayer = computed(() => store.storeMode === 'normal')

const isSongPage = computed(
  () =>
    store.storeMode === 'normal' &&
    route.path.startsWith('/song/') &&
    !route.path.includes('test'),
)

const { play, pause, seekTo } = useYoutubePlayer()

// 計算進度百分比
const progress = computed(() => {
  const time = store.isSeeking ? seekingTime.value : store.currentTime
  return store.duration ? time / store.duration : 0
})

const showVideo = ref(false)

watch(
  isSongPage,
  (visible) => {
    if (visible) {
      showVideo.value = false
      // 延遲 300ms 再顯示影片
      setTimeout(() => {
        showVideo.value = true
      }, 300)
    } else {
      showVideo.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[56px]">
    <!-- 影片 -->
    <ClientOnly>
      <div
        class="w-full overflow-hidden transition-[height,opacity] duration-300"
        :class="
          isSongPage
            ? [
                'h-[150px] md:h-[360px]',
                showVideo ? 'opacity-100' : 'opacity-0',
              ]
            : 'h-0 opacity-0'
        "
      >
        <div id="player" class="h-full w-full bg-black md:aspect-video" />
      </div>
    </ClientOnly>

    <!-- 中間內容 -->
    <main class="relative flex-1 bg-[#FFF9F9] pb-[68px] md:pb-[75px]">
      <slot />
    </main>

    <!-- 底部播放器 -->
    <div
      class="fixed right-0 bottom-0 left-0 z-40 h-[68px] w-full bg-[#ffe5e5] px-2 transition-opacity md:h-[75px]"
      :class="{ 'pointer-events-none opacity-0': !showPlayer }"
    >
      <div class="flex h-full w-full items-center justify-center py-1">
        <div
          class="flex h-full w-full max-w-[1024px] items-center justify-between rounded-xl bg-gradient-to-b from-white to-[#fff0f0] pl-2 shadow-lg md:px-3"
        >
          <!-- 播放鍵 -->
          <button
            class="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-pink-200 bg-white shadow-md transition-transform duration-150 hover:scale-110 active:scale-95 md:h-12 md:w-12"
            :disabled="!store.videoId"
            @click="store.isPlaying ? pause() : play()"
          >
            <i
              class="fa-solid text-[#F9595F] md:text-lg"
              :class="store.isPlaying ? 'fa-pause' : 'fa-play'"
            ></i>
          </button>

          <!-- 當前時間 -->
          <ClientOnly>
            <span class="mx-1 text-xs md:ml-2">
              {{ !store.videoId ? '0:00' : formatTime(store.currentTime) }}
            </span>
            <template #fallback>
              <span class="text-xs md:ml-2">0:00</span>
            </template>
          </ClientOnly>

          <!-- 進度條 -->
          <div class="relative w-[calc(100%-120px)] md:mx-4">
            <ClientOnly>
              <span
                class="absolute bottom-3 line-clamp-1 text-xs text-[#A66B6B]"
              >
                {{
                  store.songTitle
                    ? `${store.songArtist} - ${store.songTitle}`
                    : $t('select_song_prompt')
                }}
              </span>
              <template #fallback>
                <span
                  class="absolute bottom-3 line-clamp-1 text-xs text-[#A66B6B]"
                >
                  {{ $t('select_song_prompt') }}
                </span>
              </template>
            </ClientOnly>

            <ClientOnly>
              <div class="h-2 w-full overflow-hidden rounded-full bg-[#ffe5e5]">
                <div
                  class="h-2 origin-left bg-[#f9595f]"
                  :style="{ transform: `scaleX(${progress})` }"
                />
              </div>
              <input
                type="range"
                min="0"
                :max="store.duration"
                :value="store.isSeeking ? seekingTime : store.currentTime"
                class="absolute top-0 left-0 h-2 w-full cursor-pointer opacity-0"
                @input="onSeekInput"
                @change="onSeekCommit"
              />
            </ClientOnly>
          </div>

          <!-- 總時長 -->
          <span class="mx-1 text-xs">{{ formatTime(store.duration) }}</span>

          <div class="mr-1 flex items-center">
            <!-- 播放速度 -->
            <div class="group relative hidden md:block">
              <i
                class="fa-solid fa-gauge flex h-7 w-7 cursor-pointer items-center justify-center text-xl text-[#F9595F] transition-transform duration-150 hover:scale-125 hover:rotate-[-10deg]"
              ></i>

              <!-- 透明區塊 -->
              <div
                class="absolute bottom-6 left-1/2 h-6 w-10 -translate-x-1/2"
              ></div>

              <!-- 速度選單 -->
              <div
                class="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100"
              >
                <div
                  class="w-[88px] overflow-hidden rounded-xl bg-white text-sm shadow-lg"
                >
                  <div
                    v-for="speed in store.availableRates"
                    :key="speed"
                    class="cursor-pointer px-3 py-2 text-center text-[#A66B6B] transition hover:bg-[#FFE5E5] hover:text-[#F9595F]"
                    :class="{
                      'bg-[#FFE5E5] text-[#F9595F]':
                        speed === store.playbackRate,
                    }"
                    @click="store.setPlaybackRate(speed)"
                  >
                    {{ speed }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 回到目前歌曲id -->
            <NuxtLink
              v-if="route.params.id !== store.videoId && store.videoId"
              :to="`/song/${store.videoId}`"
              class="flex h-7 w-7 items-center justify-center"
            >
              <i
                class="fa-solid fa-expand cursor-pointer text-xl text-[#F9595F] duration-150 hover:scale-125 hover:rotate-[-10deg]"
              ></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
