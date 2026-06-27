<script setup lang="ts">
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'

const {
  lyrics,
  songData,
  currentLineIndex,
  songLang,
  showTranslations,
  hasTimeStamp,
} = defineProps<{
  lyrics: LyricData[]
  songData: { title: string; artist: string }
  currentLineIndex: number
  songLang: LangCode
  showTranslations: LangCode[] | undefined
  hasTimeStamp: boolean
}>()

const store = usePlayerStore()

// 每句歌詞dom陣列
const lyricsRefs = ref<HTMLElement[]>([])

const containerRef = ref<HTMLElement | null>(null)

const getLyric = (lyric: LyricData) => {
  if (!songLang) return ''
  // 日文直接給平假名html
  if (songLang === 'ja' && lyric.ruby)
    return lyric.ruby.replace(
      /<rt>/g,
      '<rt class="text-[12px] text-[#A66B6B]">',
    )
  return lyric[songLang] ?? ''
}

// 若有，優先使用（暫時顯示用的假值）
const tempIndex = ref<number | null>(null)

// 使用真資料還是假資料
const activeIndex = computed(() => {
  // 如果有手動點擊的假值，優先用temp
  return tempIndex.value !== null ? tempIndex.value : currentLineIndex
})

const clickLyric = (start: number, index: number) => {
  // 點擊歌詞後currentLineIndex先使用假值
  tempIndex.value = index

  store.seekToRequest(start)
}

// 上一次已經處理過的歌詞index
let lastLineIndex = -1

watch(
  activeIndex,
  (newVal) => {
    if (newVal === -1 || newVal === lastLineIndex) return
    lastLineIndex = newVal

    const el = lyricsRefs.value[newVal]
    const container = containerRef.value
    if (!el || !container) return

    const targetScrollTop =
      el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2

    container.scrollTo({
      top: targetScrollTop,
      behavior: 'auto',
    })
  },
  { flush: 'post' },
) // 確保 DOM 更新後再執行

watch(
  () => store.currentTime,
  (time) => {
    if (tempIndex.value === null) return

    const lyric = lyrics[tempIndex.value]

    // 時間追上後，把tempIndex假值復原
    if (lyric && time >= lyric.start) {
      tempIndex.value = null
    }
  },
)
</script>

<template>
  <div
    ref="containerRef"
    class="hide-scroll relative h-[450px] overflow-y-scroll rounded-2xl border border-[#FFE5E5] bg-white shadow-inner md:h-[600px]"
  >
    <div
      class="sticky top-0 z-20 flex h-9 w-full items-center justify-between bg-[#FFF9F9]/90 px-4 backdrop-blur-md md:h-11"
    >
      <div class="flex items-center space-x-2">
        <div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-sm"></div>
        <div class="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-sm"></div>
        <div class="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-sm"></div>
        <span
          class="ml-2 line-clamp-1 text-[10px] font-bold tracking-tight text-[#A66B6B]/60 uppercase md:text-xs"
        >
          {{ songData.artist }} - {{ songData.title }}
        </span>
      </div>
      <i class="fa-solid fa-ellipsis text-xs text-[#A66B6B]/40"></i>
    </div>

    <div
      v-if="!hasTimeStamp"
      class="mt-2 ml-3 flex w-full text-sm text-red-600 md:justify-center md:text-base"
    >
      {{ $t('no_timestamp') }}
    </div>

    <div class="py-6 md:py-8">
      <div
        v-for="(lyric, index) in lyrics"
        :key="lyric.start"
        :ref="(el) => (lyricsRefs[index] = el as HTMLElement)"
        class="group mb-8 flex items-center justify-between px-4 py-3 md:mb-10 md:px-6"
        :class="[index === currentLineIndex ? 'bg-[#F9595F]/5' : 'opacity-100']"
      >
        <div class="flex flex-1 flex-col space-y-2">
          <div
            class="text-lg leading-tight font-black tracking-tight text-[#7A3A3A] transition-colors md:text-2xl"
          >
            <span v-if="songLang === 'ja'" v-html="getLyric(lyric)"></span>
            <span v-else>{{ getLyric(lyric) }}</span>
          </div>

          <div
            v-if="showTranslations && showTranslations.length > 0"
            class="flex flex-col space-y-1.5"
          >
            <p
              v-for="lang in showTranslations"
              :key="lang"
              class="text-xs leading-relaxed font-medium md:text-sm"
              :class="
                index === currentLineIndex
                  ? 'text-[#F9595F]/80'
                  : 'text-[#A66B6B]/60'
              "
            >
              {{ lyric[lang] ?? '' }}
            </p>
          </div>
        </div>

        <button
          v-if="hasTimeStamp"
          class="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFE5E5] text-[#F9595F] opacity-0 transition-all group-hover:opacity-100 hover:scale-110 md:h-10 md:w-10"
          :class="{ hidden: index === currentLineIndex }"
          @click="clickLyric(lyric.start, index)"
        >
          <i class="fa-solid fa-play text-xs md:text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}

.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
