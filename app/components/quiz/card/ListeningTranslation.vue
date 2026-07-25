<script lang="ts" setup>
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'

const { eachLyric, isNowCard, translationGameLang, allLyrics, isAllAnswered } =
  defineProps<{
    eachLyric: LyricData // 正確答案
    isNowCard: boolean // 是否現在這張卡片在作答中
    translationGameLang: LangCode // 顯示翻譯答案的語言
    allLyrics: LyricData[] // 其他句歌詞陣列
    isAllAnswered: boolean // 是否全部題目都作答完了
  }>()

const emit = defineEmits<{
  (e: 'nextTest'): void
  (e: 'setAnswer', value: { cAnswer: string; uAnswer: string }): void
}>()

const hasAnswered = ref(false) // 是否已作答
const userAnswer = ref<number>(0) // 使用者選的答案index
const answerResult = ref<'correct' | 'wrong' | null>(null) // 答案結果(ui)
const showReviewHint = ref(false) // 全部作答完了的提示
const RESULT_DISPLAY_MS = 500 // 答案結果顯示多久才進入下一題
const REVIEW_HINT_MS = 2000 // 全部作答完了的提示顯示多久

// 答案選項
const answerOptions = computed(() => {
  if (!translationGameLang) {
    return { options: [], correctIndex: -1 }
  }

  const lang = translationGameLang

  const correctText = eachLyric[lang]
  if (!correctText) return { options: [], correctIndex: -1 }

  // 其他選項去重，但保留正確答案本身
  const uniqueSet = new Set<string>()

  allLyrics.forEach((l) => {
    const text = l[lang]
    // 去重條件：沒有翻譯、同一句歌詞（nanoid一樣）、跟正確答案一樣 都不加入候選池
    if (!text || l.nanoid === eachLyric.nanoid || text === correctText) {
      return
    }

    uniqueSet.add(text)
  })

  const candidates = Array.from(uniqueSet)

  // 先選出與答案最相近的 按照差異小到大排序
  const sorted = [...candidates].sort((a, b) => {
    return (
      Math.abs(a.length - correctText.length) -
      Math.abs(b.length - correctText.length)
    )
  })

  // 選出前八個字數最相近的
  const nearestPool = sorted.slice(0, Math.min(sorted.length, 8))
  const randomThree = [...nearestPool]
    .sort(() => Math.random() - 0.5) // 隨機排序
    .slice(0, 3) // 取前三

  // 加上正確答案+打亂
  const options = [correctText, ...randomThree]

  const shuffled = [...options].sort(() => Math.random() - 0.5)

  // 正確答案位置
  const correctIndex = shuffled.findIndex((t) => t === correctText)

  return {
    options: shuffled,
    correctIndex,
  }
})

const clickAnswer = (userAns: string, index: number) => {
  if (hasAnswered.value || isAllAnswered || !isNowCard) {
    return
  }

  const isCorrect = index === answerOptions.value.correctIndex

  // 更新作答狀態
  userAnswer.value = index
  answerResult.value = isCorrect ? 'correct' : 'wrong'
  hasAnswered.value = true

  // 傳給父組件
  emit('setAnswer', {
    cAnswer:
      answerOptions.value.options[answerOptions.value.correctIndex] ?? '',
    uAnswer: userAns,
  })

  // 先顯示答對/答錯結果，停留一段時間後再處理下一步
  setTimeout(() => {
    // 如果全部題目都作答完了，就先顯示 review 提示
    if (isAllAnswered) {
      answerResult.value = null
      showReviewHint.value = true

      setTimeout(() => {
        showReviewHint.value = false
        emit('nextTest')
      }, REVIEW_HINT_MS)

      return
    }

    answerResult.value = null
    emit('nextTest')
  }, RESULT_DISPLAY_MS)
}
</script>

<template>
  <div
    class="relative z-20 flex w-full items-center justify-center rounded-xl bg-white px-3 py-6 transition-all duration-500 md:rounded-3xl md:px-8 md:py-10"
  >
    <!-- 作答後的提示 overlay -->
    <Transition
      appear
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-10"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="answerResult || showReviewHint"
        class="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden rounded-xl md:rounded-3xl"
      >
        <div
          v-if="answerResult"
          class="flex flex-col items-center justify-center rounded-3xl p-6 shadow-2xl backdrop-blur-md md:p-10"
          :class="
            answerResult === 'correct'
              ? 'border-2 border-green-500/30 bg-white/90'
              : 'border-2 border-red-500/30 bg-white/90'
          "
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20"
            :class="answerResult === 'correct' ? 'bg-green-100' : 'bg-red-100'"
          >
            <i
              class="fa-solid text-4xl md:text-5xl"
              :class="[
                answerResult === 'correct'
                  ? 'fa-check text-green-600'
                  : 'fa-xmark text-red-600',
                'animate-bounce-short',
              ]"
            ></i>
          </div>
          <span
            class="mt-3 text-lg font-bold tracking-widest md:text-xl"
            :class="
              answerResult === 'correct' ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ answerResult === 'correct' ? 'CORRECT' : 'WRONG' }}
          </span>
        </div>

        <div v-else-if="showReviewHint">
          <div
            class="absolute inset-0 bg-[#F9595F]/5 backdrop-blur-[2px]"
          ></div>

          <div
            class="relative flex items-center gap-3 rounded-full border border-[#F9595F]/30 bg-white px-6 py-3 shadow-2xl md:px-8 md:py-4"
          >
            <div class="animate-slide-left flex text-[#F9595F]">
              <i class="fa-solid fa-chevron-left text-lg md:text-xl"></i>
              <i
                class="fa-solid fa-chevron-left text-lg opacity-50 md:text-xl"
              ></i>
            </div>

            <div class="flex flex-col items-start">
              <span
                class="text-xs font-medium tracking-tighter text-[#F9595F]/60 uppercase md:text-sm"
              >
                Finish!
              </span>
              <span
                class="text-sm font-bold tracking-wide text-[#7A3A3A] md:text-base"
              >
                {{ $t('review_swipe_left_hint') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="flex w-full flex-col space-y-3">
      <button
        v-for="(a, index) in answerOptions.options"
        :key="index"
        class="flex w-full items-center rounded-2xl border-2 border-[#FFE5E5] bg-[#FFF9F9] p-3 transition-all duration-200 active:scale-[0.98]"
        :class="{
          'hover:border-[#F9595F] hover:bg-white hover:shadow-md':
            !hasAnswered && !isAllAnswered,
          'border-gray-300 bg-gray-300': hasAnswered && index === userAnswer,
          'border-green-500':
            hasAnswered &&
            index === answerOptions.correctIndex &&
            userAnswer !== answerOptions.correctIndex,
          'cursor-default': hasAnswered || isAllAnswered,
        }"
        @click="clickAnswer(a, index)"
      >
        <div
          class="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#7A3A3A] bg-[#7A3A3A] text-white"
        >
          {{ index + 1 }}
        </div>

        <div
          class="ml-4 flex text-start text-sm text-[#7A3A3A]"
          :class="{ 'hover:text-[#F9595F]': !hasAnswered }"
        >
          {{ a }}
        </div>

        <div class="ml-auto">
          <i
            v-if="hasAnswered && index === answerOptions.correctIndex"
            class="fa-solid fa-circle-check text-green-500"
          ></i>
          <i
            v-if="
              hasAnswered &&
              index !== answerOptions.correctIndex &&
              index === userAnswer
            "
            class="fa-solid fa-circle-xmark text-red-600"
          ></i>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-left {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
}

.animate-slide-left {
  animation: slide-left 1.2s ease-in-out infinite;
}
</style>
