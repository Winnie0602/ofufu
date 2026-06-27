<script setup lang="ts">
import type { SongData, LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'

const { showFullPlayer } = defineProps<{ showFullPlayer: boolean }>()

const emit = defineEmits(['closeFullScreen'])

const store = usePlayerStore()

const { data: currentSong, pending } = await useFetch<SongData | null>(
  `/api/song/${store.videoId}`,
)

// 每句歌詞dom陣列
const lyricsRefs = ref<HTMLElement[]>([])

const containerRef = ref<HTMLElement | null>(null)

const lyrics = computed(() => currentSong.value?.lyrics || [])

//這首歌的語言
const songLang = computed<LangCode | null>(() => {
  const first = lyrics.value[0]
  if (!first) return null

  if (first.ja) return 'ja'
  if (first.kr) return 'kr'
  if (first.en) return 'en'
  if (first.hk) return 'hk'
  if (first.tw) return 'tw'

  return null
})

// 現在在第幾句歌詞
const currentLineIndex = computed(() => {
  return lyrics.value.findIndex(
    (l) => store.currentTime >= l.start && store.currentTime < l.end,
  )
})

const getWords = (lyric: LyricData) => {
  if (!songLang.value) return []
  return lyric[songLang.value] ?? []
}

</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="showFullPlayer"
        class="fixed inset-0 z-[100] flex h-dvh touch-none items-center justify-center bg-black/80"
      >
        <button
          class="absolute top-5 right-5 z-[110] text-3xl text-white"
          @click="emit('closeFullScreen')"
        >
          ✕
        </button>

        <div ref="containerRef" class="h-full max-w-[900px] text-white">
          <div
            v-if="currentSong"
            class="no-scrollbar max-h-[80vh] w-full flex-col items-center overflow-y-auto border-[1px] border-red-800"
          >
            <div
              v-for="(lyric, index) in lyrics"
              :key="lyric.start"
              :ref="(el) => (lyricsRefs[index] = el as HTMLElement)"
              class="relative flex items-center justify-between px-3 text-sm md:text-base"
              :class="{ 'current-lyric': index === currentLineIndex }"
            >
              <div class="flex flex-col">
                <span>
                  <span
                    v-for="(word, wIndex) in getWords(lyric)"
                    :key="wIndex"
                    class="mr-1 inline-block"
                  >
                    <!-- 有 meaning 的詞 -->
                    <span
                      v-if="word.meaning"
                      class="group relative inline-block cursor-pointer"
                    >
                      <!-- 單字本體 -->
                      <span
                        class="rounded transition-colors group-hover:bg-red-100 group-hover:ring-1 group-hover:ring-red-400"
                      >
                        <ruby v-if="word.reading">
                          {{ word.surface }}
                          <rt
                            class="text-[11px] text-gray-600 transition-opacity group-hover:opacity-20"
                          >
                            {{ word.reading }}
                          </rt>
                        </ruby>

                        <span v-else>
                          {{ word.surface }}
                        </span>
                      </span>

                      <!-- tooltip -->
                      <span
                        class="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      >
                        {{ word.meaning }}
                      </span>
                    </span>

                    <!-- 沒 meaning 的普通字 -->
                    <span v-else>
                      {{ word.surface }}
                    </span>
                  </span>
                </span>
              </div>

              <div
                class="cursor-pointer text-[#E8D6D6] hover:text-[#A66B6B]"
                :class="{ hidden: index === currentLineIndex }"
                @click="store.seekToRequest(lyric.start)"
              >
                <i class="fa-solid fa-play text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
