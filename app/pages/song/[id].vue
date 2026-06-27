<script setup lang="ts">
import type { SongData, SongsList, LyricData } from '~/types/song'
import { languageMapCodeLabel } from '~/types/lang'
import type { LangCode } from '~/types/lang'

const route = useRoute()
const { t } = useI18n()

const store = usePlayerStore()

const videoId = computed(() => route.params.id as string)

// 該歌api資料
const { data: currentSong, pending } = await useFetch<SongData | null>(
  () => `/api/song/${videoId.value}`,
)

if (!currentSong.value && !pending.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    message: '找不到這首歌曲，請檢查網址是否正確。',
  })
}

const seoTitle = computed(() => {
  if (!currentSong.value) return t('seo.song_fallback_title')
  return `${currentSong.value.title} - ${currentSong.value.artist}`
})

const seoDescription = computed(() => {
  if (!currentSong.value) return t('seo.default_description')

  return t('seo.song_description', {
    title: currentSong.value.title,
    artist: currentSong.value.artist,
  })
})

useSeoMeta({
  title: () => seoTitle.value,
  ogTitle: () => seoTitle.value,
  description: () => seoDescription.value,
  ogDescription: () => seoDescription.value,
})

// 該歌曲有沒有時間戳記
const hasTimeStamp = computed(
  () => currentSong.value?.lyrics[0]?.start !== undefined,
)

// 要顯示的翻譯語言
const showTranslations = ref<LangCode[]>([])

// 處理要顯示的翻譯語言
const handleTranslations = (lang: LangCode) => {
  if (showTranslations.value.includes(lang)) {
    showTranslations.value = showTranslations.value.filter((l) => l !== lang)
  } else {
    showTranslations.value.push(lang)
  }
}
// ＊＊＊＊＊＊＊＊計算目前的歌詞
const findLyricIndexByTime = (time: number, lyrics: LyricData[]) => {
  if (!hasTimeStamp.value) return -1

  let low = 0
  let high = lyrics.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2) // 取中間值
    const lyric = lyrics[mid]

    if (lyric?.start === undefined || lyric?.end === undefined) return -1

    if (time >= lyric.start && time < lyric.end) {
      return mid
    } else if (time < lyric.start) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}

const currentLineIndex = computed(() => {
  if (!currentSong.value?.lyrics || !hasTimeStamp.value) return -1
  return findLyricIndexByTime(store.currentTime, currentSong.value.lyrics)
})

// 現在播放的歌詞的nanoid
const currentNanoid = computed(() => {
  if (
    currentLineIndex.value === -1 ||
    !currentSong.value?.lyrics ||
    !hasTimeStamp.value
  )
    return ''
  return currentSong.value.lyrics[currentLineIndex.value]?.nanoid
})

// ＊＊＊＊＊＊＊

const { data: otherSongs } = await useFetch<{ songs: SongsList[] }>(
  '/api/list/songs',
  {
    query: {
      language: 'all',
      limit: 10,
    },
  },
)

watch(
  videoId,
  (id) => {
    store.loadVideo(id)
  },
  { immediate: true },
)

watch(
  currentSong,
  (song) => {
    if (!song) return

    store.setSongInfo(song.title, song.artist)
    showTranslations.value = song.translation_langs
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="mx-auto my-4 w-full px-4 md:my-6 md:max-w-[1280px] lg:px-5 xl:px-0"
  >
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-10">
      <!-- 左邊區塊 -->
      <div class="min-h-[600px] w-full lg:w-2/3">
        <div v-if="pending">Loading…</div>

        <div v-else-if="!currentSong || currentSong.lyrics.length === 0">
          目前沒有歌詞
        </div>

        <div v-else class="space-y-4">
          <div
            class="flex flex-wrap items-center justify-between gap-2 border-b border-[#FFE5E5] pb-3"
          >
            <div class="flex items-center gap-1.5 text-[#A66B6B]">
              <i class="fa-solid fa-language text-lg text-[#F9595F]"></i>
              <span>{{ $t('lyrics_language') }}</span>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <div
                class="flex items-center gap-2 rounded-full bg-[#FFE5E5]/50 px-4 py-1.5 text-xs text-[#F9595F] md:text-sm"
              >
                <i class="fa-solid fa-circle-check text-sm opacity-70"></i>
                {{ languageMapCodeLabel[currentSong.language] }} ({{
                  $t('original')
                }})
              </div>

              <button
                v-for="lang in currentSong.translation_langs"
                :key="lang"
                class="rounded-full border-[1px] px-4 py-1.5 text-xs md:text-sm"
                :class="[
                  showTranslations?.includes(lang)
                    ? 'bg-[#F9595F] text-white shadow-md shadow-[#F9595F]/20'
                    : 'border-[#FFE5E5] bg-white text-[#A66B6B] hover:border-[#F9595F]/30 hover:bg-[#FFF9F9]',
                ]"
                @click="handleTranslations(lang)"
              >
                {{ languageMapCodeLabel[lang] }}
              </button>
            </div>
          </div>

          <div class="mt-4 space-y-3">
            <SongLyrics
              :lyrics="currentSong.lyrics"
              :song-data="{
                title: currentSong.title,
                artist: currentSong.artist,
              }"
              :current-line-index="currentLineIndex"
              :song-lang="currentSong.language || ['']"
              :show-translations="showTranslations"
              :has-time-stamp="hasTimeStamp"
            />

            <!-- 單字 -->
            <SongWords
              :song="currentSong"
              :current-nanoid="currentNanoid ?? ''"
            />
          </div>
        </div>
      </div>
      <!-- 右邊區塊 -->
      <div class="min-h-[400px] w-full lg:w-1/3 lg:min-w-[402px]">
        <div
          class="mb-4 border-b-4 border-[#A66B6B] text-xl font-medium text-[#A66B6B] md:text-2xl"
        >
          {{ $t('recommended_songs') }}
        </div>

        <div v-if="otherSongs?.songs" class="space-y-2">
          <VideoCard
            v-for="song in otherSongs.songs"
            :key="song.id"
            :song="song"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!pending && currentSong"
      class="mt-6 mb-4 flex w-full justify-center md:mt-12 md:mb-8"
    >
      <NuxtLink
        :to="`/song/test/${videoId}`"
        class="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F9595F] py-3 font-bold text-white shadow-lg shadow-red-100 transition-all hover:brightness-110 active:scale-[0.98] md:w-[240px] md:py-4"
      >
        <i class="fa-solid fa-pen-to-square mr-2"></i>
        <span class="text-sm tracking-widest md:text-base">
          {{ $t('take_exam') }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
