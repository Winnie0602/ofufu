<script setup lang="ts">
import type { LangCode } from '~/types/lang'
import type { SongData, LyricData } from '~/types/song'
import emblaCarouselVue from 'embla-carousel-vue'

const store = usePlayerStore()

const { currentSong, testLyrics, translationGameLang, selectedQuizType } =
  defineProps<{
    currentSong: SongData
    testLyrics: LyricData[]
    translationGameLang: LangCode | null
    selectedQuizType: 'partial' | 'allBlank' | 'translation'
  }>()

const emit = defineEmits<{
  // 卡片點選完答案後，等全部題目都填完才往頁面送出答案
  (e: 'setAnswers', value: { cAnswer: string; uAnswer: string }[]): void
}>()

// 是否可以滑動題目
const canSwiperDrag = ref(false)

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: false,
  watchDrag: () => canSwiperDrag.value,
})

// 每題使用者的答案 型態
type UserAnswer = {
  cAnswer: string
  uAnswer: string
}

// 現在在寫第幾個題目
const nowIndex = ref(0)

// 使用者的答案陣列
const userAnswers = ref<UserAnswer[]>([])

// 是否全部題目都作答完了
const isAllAnswered = computed(
  () => testLyrics.length > 0 && userAnswers.value.length === testLyrics.length,
)

// 聆聽生命蘋果 共三次機會
const life = ref<0 | 1 | 2 | 3>(3)

// 題目下方的播放鍵邏輯
const handlePlay = (lyric?: LyricData) => {
  if (!lyric || store.isPlaying) return

  // 播放當前歌詞的段落
  store.playSegmentRequest(lyric.start, lyric.end)

  // 如果還沒全部作答完，就扣聆聽生命蘋果
  if (!isAllAnswered.value) {
    life.value -= 1
  }
}

// 使用者選完卡片的答案後，先存在 userAnswers 陣列裡，等全部題目都填完了再送出給頁面
const setAnswers = (ans: UserAnswer) => {
  if (isAllAnswered.value) {
    return
  }

  userAnswers.value.push(ans)

  // 全部題目都填滿了後再往頁面送
  if (isAllAnswered.value) {
    emit('setAnswers', userAnswers.value)
    // 允許滑動看答案
    canSwiperDrag.value = true
  }
}

const handleNextTest = (index: number) => {
  // 只允許當前題目觸發切題，避免事件競態造成一次跳兩題
  if (index !== nowIndex.value) {
    return
  }

  // 切到下一題(但不能超過最後一題index)
  nowIndex.value = Math.min(index + 1, testLyrics.length - 1)
}

// 一進來頁面就播放第一句
onMounted(() => {
  store.playSegmentRequest(testLyrics[0]?.start ?? 0, testLyrics[0]?.end ?? 0)
})

// 監聽題目切換，切到下一題就播放下一段歌詞，並恢復聆聽生命蘋果
watch(nowIndex, (index) => {
  life.value = 3

  if (isAllAnswered.value) {
    return
  }

  emblaApi.value?.scrollTo(index)

  store.playSegmentRequest(
    testLyrics[index]?.start ?? 0,
    testLyrics[index]?.end ?? 0,
  )
})

// 重新同步目前的 swiper index
const swiperDataRefresh = () => {
  if (!emblaApi.value || !isAllAnswered.value) {
    return
  }

  nowIndex.value = emblaApi.value.selectedScrollSnap()
}

watchEffect((onCleanup) => {
  if (!emblaApi.value) {
    return
  }

  // 註冊事件監聽器 發生select事件，就自動執行swiperDataRefresh
  emblaApi.value.on('select', swiperDataRefresh)

  swiperDataRefresh()

  // 組件卸載時，把事件監聽器移除
  onCleanup(() => {
    emblaApi.value?.off('select', swiperDataRefresh)
  })
})
</script>

<template>
  <div class="py-6 md:px-20 md:py-10">
    <!-- 上方點點 -->
    <div v-if="testLyrics.length > 0" class="flex justify-center gap-2">
      <div
        v-for="(_, i) in testLyrics"
        :key="i"
        class="h-2 w-2 rounded-full transition-all duration-300"
        :class="[i === nowIndex ? 'w-4 bg-[#F9595F]' : 'bg-gray-300']"
      />
    </div>
    <div ref="emblaRef" class="embla md:pt-6">
      <div class="embla__container">
        <div
          v-for="(eachLyric, i) in testLyrics"
          :key="eachLyric.nanoid"
          class="embla__slide"
        >
          <!-- 聽力翻譯題型 -->
          <TestCardListeningTranslation
            v-if="translationGameLang && selectedQuizType === 'translation'"
            :each-lyric="eachLyric"
            :is-now-card="i === nowIndex"
            :translation-game-lang="translationGameLang"
            :all-lyrics="currentSong.lyrics"
            :is-all-answered="isAllAnswered"
            @next-test="handleNextTest(i)"
            @set-answer="setAnswers"
          />
        </div>
      </div>
    </div>

    <!-- 下方選單 -->
    <div class="flex justify-center px-4 md:mt-8">
      <div
        class="flex w-full max-w-xl items-center justify-between rounded-3xl bg-[#FFF5F5] p-3 md:p-5"
      >
        <div
          class="flex flex-1 flex-col items-start"
          :class="{ 'opacity-60': isAllAnswered }"
        >
          <span
            class="text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs"
          >
            {{ $t('listening_life') }}
          </span>
          <div class="mt-1 flex gap-1">
            <i
              v-for="n in 3"
              :key="n"
              class="fa-solid fa-apple-whole text-sm"
              :class="n <= life ? 'text-[#F9595F]' : 'text-gray-200'"
            />
          </div>
        </div>

        <!-- 播放按鈕 -->
        <div class="px-4">
          <button
            class="group flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-90 md:h-16 md:w-16"
            :class="
              store.isPlaying || (!isAllAnswered && life < 1)
                ? 'cursor-not-allowed bg-gray-100'
                : 'bg-[#FFE5E5] shadow-md shadow-red-100 hover:bg-[#ffd9d9]'
            "
            :disabled="store.isPlaying || (!isAllAnswered && life < 1)"
            @click="handlePlay(testLyrics[nowIndex])"
          >
            <i
              class="fa-solid fa-play text-xl transition-transform group-hover:scale-110 md:text-2xl"
              :class="store.isPlaying ? 'text-gray-300' : 'text-[#F9595F]'"
            />
          </button>
        </div>

        <div class="flex flex-1 flex-col items-end">
          <span
            class="text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs"
          >
            {{ $t('test_progress') }}
          </span>
          <div class="mt-1 flex items-baseline gap-1">
            <!-- 目前題數 -->
            <span class="text-lg font-bold text-gray-700 md:text-xl">
              {{ nowIndex + 1 }}
            </span>
            <!-- 總題數 -->
            <span class="text-xs font-medium text-gray-400">
              / {{ testLyrics.length }}
            </span>
          </div>
        </div>
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
.embla__slide {
  @apply min-w-0 flex-[0_0_98%];
  margin-left: 4px;
}
</style>
