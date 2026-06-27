<script setup lang="ts">
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'

const { show } = useToast()
const emit = defineEmits(['goBack'])

const { videoId, lyrics, language } = defineProps<{
  videoId: string
  lyrics: LyricData[]
  language: LangCode
}>()

const { createPlayer, destroy, currentTime } = useYoutubePlayerLocal(videoId)

// 編輯的歌詞時間陣列
const lyricsTimeArr = ref<{ nanoid: string; start?: number; end?: number }[]>(
  [],
)

const currentStep = ref<'start' | 'end'>('start')

const getLyricIndex = (nanoid?: string) => {
  if (!nanoid) return -1
  return lyrics.findIndex((lyric) => lyric.nanoid === nanoid)
}

const findEditedLyric = (nanoid: string) => {
  return lyricsTimeArr.value.find((line) => line.nanoid === nanoid)
}

const setTime = (nanoid: string, type: 'start' | 'end') => {
  const time = parseFloat(currentTime.value.toFixed(2))

  const line = findEditedLyric(nanoid)

  // 已有歌詞，更新該歌詞的開始or結束
  if (line) {
    line[type] = time
  } else {
    // 沒該歌詞，新增該歌詞的開始or結束
    lyricsTimeArr.value.push({
      nanoid,
      [type]: time,
    })
  }
}

const getLyricTime = (nanoid: string, type: 'start' | 'end') => {
  const line = findEditedLyric(nanoid)
  return line?.[type] ?? null
}

const saveLyricsTime = async () => {
  if (lyricsTimeArr.value.length === 0) {
    show('沒有要更新的資料', 2000)

    return
  }

  await $fetch('/api/song/update-time', {
    method: 'POST',
    body: {
      videoId: videoId,
      lyrics: lyricsTimeArr.value,
    },
  })

  show('更新完成', 2000)

  emit('goBack')
}

// 現正在編輯的歌詞nanoid
const currentLyricId = ref(lyrics[0]?.nanoid)

// 現正在編輯的歌詞index
const currentLyricIndex = computed(() => {
  return getLyricIndex(currentLyricId.value)
})

// 音樂播放到的index
const playingLyricIndex = computed(() => {
  const time = currentTime.value

  return lyrics.findIndex((lyric) => {
    const start = getLyricTime(lyric.nanoid, 'start') ?? lyric.start
    const end = getLyricTime(lyric.nanoid, 'end') ?? lyric.end

    if (start === undefined || end === undefined) return false

    return time >= start && time <= end
  })
})

const handleEdit = (nanoid: string) => {
  // 點擊編輯後，將此歌詞設為最後編輯的歌詞
  currentLyricId.value = nanoid
  currentStep.value = 'start'

  const currentIndex = getLyricIndex(nanoid)

  // 砍掉這句之後的所有時間
  lyricsTimeArr.value = lyricsTimeArr.value.filter((line) => {
    return getLyricIndex(line.nanoid) < currentIndex
  })
}

const markCurrentTime = () => {
  // 找出當前歌詞
  const lyric = lyrics[currentLyricIndex.value]

  if (!lyric) return

  if (currentStep.value === 'start') {
    // 放到編輯陣列中
    setTime(lyric.nanoid, 'start')
    currentStep.value = 'end'
    return
  }

  setTime(lyric.nanoid, 'end')
  currentStep.value = 'start'

  //  設定完 end > 換下一句
  currentLyricId.value = lyrics[currentLyricIndex.value + 1]?.nanoid
}

onMounted(() => {
  createPlayer('admin-player')
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4 md:space-y-6">
    <div class="sticky top-5 z-10 w-full max-w-[640px]">
      <ClientOnly>
        <div
          id="admin-player"
          class="aspect-video h-[160px] w-full rounded-2xl border-4 border-[#FFE5E5] shadow-sm md:h-[280px]"
        ></div>
      </ClientOnly>

      <div
        class="my-2 flex items-center justify-center rounded-xl bg-red-300 px-4 py-2 text-sm font-black shadow-md md:text-base"
      >
        <i class="fa-solid fa-stopwatch mr-2"></i>
        {{ currentTime.toFixed(2) }}s
      </div>
    </div>

    <div class="w-full max-w-3xl pb-10 md:pb-20">
      <div class="flex flex-col items-center">
        <div
          v-for="(lyric, index) in lyrics"
          :key="lyric.nanoid"
          class="group flex w-full items-center justify-center gap-3 rounded-xl px-2 py-3 transition-all duration-300 md:gap-6 md:px-0"
          :class="[
            // 編輯中
            index === currentLyricIndex
              ? 'bg-[#7A3A3A]/10 ring-2 ring-[#7A3A3A] ring-inset'
              : '',
          ]"
        >
          <button
            v-if="index !== currentLyricIndex"
            class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFE5E5] text-[11px] text-[#F9595F] transition-all hover:bg-[#F9595F] hover:text-white active:scale-90 md:h-12 md:w-12 md:text-sm"
            @click="handleEdit(lyric.nanoid)"
          >
            編輯
          </button>

          <i v-else class="fa-solid fa-pencil text-lg text-[#F9595F]"></i>

          <div class="max-w-[450px] flex-1 text-center transition-colors">
            <div
              class="mb-1 text-[10px] font-bold tracking-widest uppercase md:text-xs"
              :class="
                index === playingLyricIndex
                  ? 'text-red-500'
                  : 'text-[#A66B6B] opacity-70'
              "
            >
              {{ getLyricTime(lyric.nanoid, 'start') || lyric.start || '' }}
              -
              {{ getLyricTime(lyric.nanoid, 'end') || lyric.end || '' }}
            </div>
            <div
              class="border-b-2 pb-3 text-sm font-black transition-all md:text-xl"
              :class="[
                index === playingLyricIndex
                  ? 'scale-105 text-red-500'
                  : 'text-[#7A3A3A]',
                index === currentLyricIndex
                  ? 'border-[#7A3A3A]'
                  : 'border-[#FFE5E5]',
              ]"
            >
              {{ lyric[language] }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          class="mt-8 flex w-full max-w-[240px] items-center justify-center gap-2 rounded-2xl bg-[#F9595F]/90 py-4 text-white shadow-lg shadow-red-100 transition-all hover:brightness-110 active:scale-[0.98]"
          @click="saveLyricsTime()"
        >
          <i class="fa-solid fa-cloud-arrow-up"></i>
          儲存
        </button>
      </div>
    </div>

    <!-- 固定設定時間按鈕 -->
    <div class="flex flex-col items-center space-y-4 md:space-y-6">
      <button
        class="fixed right-6 bottom-10 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white transition-all hover:scale-110 active:scale-90 md:right-10 md:bottom-12 md:h-20 md:w-20"
        @click="markCurrentTime()"
      >
        <i class="fa-solid fa-stopwatch text-xl text-[#F9595F] md:text-2xl"></i>
        <span class="mt-0.5 text-[10px] font-black text-[#F9595F] md:text-xs">
          戳記
        </span>
      </button>
    </div>
  </div>
</template>
