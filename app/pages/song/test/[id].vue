<script setup lang="ts">
import SelectLyrics from '~/components/test/SelectLyrics.vue'
import SelectTestType from '~/components/test/SelectTestType.vue'
import type { LangCode } from '~/types/lang'
import type { SongData, LyricData } from '~/types/song'

const store = usePlayerStore()

const route = useRoute()

const router = useRouter()

const { t } = useI18n()

const { show } = useToast()

const videoId = computed(() => route.params.id as string)

store.setTestVideoId(videoId.value)

// 該歌詞
const { data: currentSong, pending } = await useFetch<SongData | null>(
  `/api/song/${videoId.value}`,
)

if (!currentSong.value && !pending.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    message: '找不到這首歌曲，請檢查網址是否正確。',
  })
}

// 該歌曲有沒有時間戳記
const hasTimeStamp = computed(
  () => currentSong.value?.lyrics[0]?.start !== undefined,
)

if (currentSong.value && !hasTimeStamp.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    message: '這首歌曲尚未提供測驗功能。',
  })
}

// SEO
const seoTitle = computed(() => {
  if (!currentSong.value) return t('seo.song_test_fallback_title')
  return t('seo.song_test_title', {
    title: currentSong.value.title,
    artist: currentSong.value.artist,
  })
})

const seoDescription = computed(() => {
  if (!currentSong.value) return t('seo.default_description')

  return t('seo.song_test_description', {
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

// 目前在第幾步驟
const step = ref<1 | 2 | 3 | 4>(1)

// 選擇的題型
const selectedQuizType = ref<'partial' | 'allBlank' | 'translation'>(
  'translation',
)

// 聽力翻譯的語言
const translationGameLang = ref<LangCode | null>(null)

// 使用者的答案{正確答案、使用者答案}陣列
const userAnswers = ref<{ cAnswer: string; uAnswer: string }[]>([])

// 選擇的歌詞 ID 陣列
const selectedLyricsId = ref<string[]>([])

// 根據選擇的歌詞 ID，找出對應的歌詞資料陣列
const selectedLyrics = computed<LyricData[]>(() => {
  const lyrics = currentSong.value?.lyrics ?? []
  return lyrics.filter((lyric) => selectedLyricsId.value.includes(lyric.nanoid))
})

// ===== 頁面控制邏輯 =====
const { open } = useCheckConfirm()

// 下一步按鈕的文字
const nextLabel = computed(() => {
  if (step.value === 2) return $t('testStart')
  if (step.value === 4) return $t('goHome')
  return $t('next')
})

// 上一步按鈕的文字
const prevLabel = computed(() => {
  if (step.value === 4) return $t('restartTest')
  return $t('prev')
})

// 回上一頁
const prevStep = async () => {
  if (step.value === 4) {
    step.value = 1
    return
  }

  if (step.value <= 1) return

  if (step.value === 3) {
    const check = await open(
      $t('confirm_back_title'),
      $t('confirm_back_message'),
      'ask',
    )

    if (!check) return
  }

  step.value--
}

// 前往下一步
const nextStep = () => {
  if (step.value === 4) {
    router.push('/')

    return
  }

  if (selectedQuizType.value !== 'translation' && step.value === 1) {
    show('開發中，請選其他題型', 1000)
    return
  }
  step.value++
}

// 是否可以進入下一步
const canNext = computed(() => {
  switch (step.value) {
    case 2:
      return selectedLyricsId.value.length >= 3
    case 3:
      return userAnswers.value.length === selectedLyrics.value.length
    default:
      return true
  }
})

watch(step, async (newStep) => {
  // 等畫面更新完再滾動，確保位置正確
  await nextTick()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  switch (newStep) {
    case 1:
      selectedQuizType.value = 'translation'
      selectedLyricsId.value = []
      userAnswers.value = []
      break
    case 4:
      store.setPlaybackRate(1)
      break
    case 2:
      store.isPlaying = false
      break
  }
})

// 頁面載入完時，預設播放第一句歌詞
onMounted(() => {
  store.seekToRequest(currentSong.value?.lyrics[0]?.start ?? 0)
})
</script>

<template>
  <div
    class="flex h-full min-h-[80vh] w-full flex-col p-4 md:max-w-[1280px] md:p-6"
  >
    <div class="flex-none pb-4">
      <TestStepProgress :step="step" />
    </div>

    <div v-if="pending" class="flex w-full justify-center text-2xl">
      pending...
    </div>

    <div
      v-else
      class="flex flex-1 flex-col overflow-auto rounded-xl border border-[#B58C8C]/40 bg-white shadow-sm"
    >
      <div class="flex h-10 flex-none items-center bg-[#B58C8C]/40 px-4">
        <div class="flex items-center space-x-1.5">
          <div class="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
          <div class="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
          <div class="h-3 w-3 rounded-full bg-[#28C840]"></div>
          <div
            class="ml-2 text-[12px] font-medium tracking-wide text-stone-500"
          >
            {{
              `${currentSong?.artist} - ${currentSong?.title}` ||
              $t('select_song_prompt')
            }}
          </div>
        </div>
      </div>

      <!-- 第一步驟 選取速度／形式 -->
      <SelectTestType
        v-if="currentSong && step === 1"
        :current-song="currentSong"
        @set-quize-type="(str) => (selectedQuizType = str)"
        @set-trans-game-lang="(lang) => (translationGameLang = lang)"
      />

      <!-- 第二步驟 選取歌詞 -->
      <SelectLyrics
        v-if="currentSong && step === 2"
        :current-song="currentSong"
        :selected-quiz-type="selectedQuizType"
        :translation-game-lang="translationGameLang"
        @update="
          (testIds: string[]) => {
            selectedLyricsId = testIds
          }
        "
      />

      <!-- 第三步驟 開始考試 -->
      <TestTesting
        v-if="currentSong && step === 3"
        :current-song="currentSong"
        :test-lyrics="selectedLyrics"
        :is-playing="store.isPlaying"
        :selected-quiz-type="selectedQuizType"
        :translation-game-lang="translationGameLang"
        @set-answers="(ans) => (userAnswers = ans)"
      />

      <!-- 第四步驟 複習 -->
      <TestReview
        v-if="currentSong && step === 4"
        :user-answers="userAnswers"
        :test-lyrics="selectedLyrics"
        :lang="currentSong.language"
        :selected-quiz-type="selectedQuizType"
        :translation-game-lang="
          translationGameLang || currentSong.translation_langs.at(0) || 'en'
        "
        @play-segment="
          (e: { start: number; end: number }) =>
            store.playSegmentRequest(e.start, e.end)
        "
      />
    </div>

    <!-- 上／下一步 -->
    <TestControlProgressButton
      :can-prev="step > 1"
      :can-next="canNext"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      @prev="prevStep"
      @next="nextStep"
    />
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
