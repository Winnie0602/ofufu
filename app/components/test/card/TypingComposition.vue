<script lang="ts" setup>
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'

const { eachLyric, isNowCard, selectedQuizType, language, isAllAnswered } =
  defineProps<{
    eachLyric: LyricData
    isNowCard: boolean
    selectedQuizType: 'partial' | 'allBlank' | 'translation'
    language: LangCode
    isAllAnswered: boolean
  }>()

const emit = defineEmits<{
  (e: 'nextTest'): void
  (e: 'setAnswer', value: { cAnswer: string; uAnswer: string }): void
}>()

const {
  displayChars,
  resultStates,
  handleInput,
  isAutoFillIndex,
  isHintIndex,
  isOriBlank,
  userInput,
  editableLength,
  currentInputIndex,
  mergedInput,
  isTypedIndex,
  answer,
} = useTypingMode({
  lyricData: eachLyric,
  mode: selectedQuizType,
  blankCountPercent: 50,
  language,
})

const inputRef = ref<HTMLInputElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

defineExpose({
  focusInput: () => inputRef.value?.focus(),
})

// 使用虛擬鍵盤？
const isFakeKeyboard = ref(false)

// IME 組字狀態
const isComposing = ref(false)

// 組字中的字
const composingText = ref('')

const onCompositionUpdate = (e: CompositionEvent) => {
  if (isAllAnswered) {
    return
  }
  composingText.value = e.data
}

// IME 處理(開始)
const onCompositionStart = () => {
  if (isFakeKeyboard.value || isAllAnswered) {
    return
  }
  isComposing.value = true
  composingText.value = ''
}

// IME 處理(結束)
const onCompositionEnd = (e: CompositionEvent) => {
  if (isFakeKeyboard.value || isAllAnswered) {
    return
  }
  isComposing.value = false
  composingText.value = ''

  const target = e.target as HTMLInputElement

  handleInput(target)
}

// 非IME拼打時觸發
const onInput = (e: Event) => {
  if (isFakeKeyboard.value || isAllAnswered) {
    return
  }
  if (isComposing.value) return
  const target = e.target as HTMLInputElement

  handleInput(target)
}

const clickBlock = () => {
  if (isNowCard && !isAllAnswered) {
    inputRef.value?.focus()
    scrollToTestWindowBarOnMobile()
  }
}

const scrollToTestWindowBarOnMobile = () => {
  if (window.innerWidth >= 768) {
    return
  }

  cardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// 完成答案拼打
watch(userInput, () => {
  if (isAllAnswered) {
    return
  }

  if (userInput.value.length !== editableLength.value) {
    return
  }

  // 答案傳到父層
  emit('setAnswer', { cAnswer: answer, uAnswer: mergedInput.value })

  emit('nextTest')
})

watch(
  () => isNowCard,
  async (val) => {
    if (!val || isAllAnswered) return

    await nextTick()

    setTimeout(() => {
      inputRef.value?.focus()
      scrollToTestWindowBarOnMobile()
    }, 30)
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="cardRef"
    class="z-20 flex w-full items-center justify-center rounded-xl bg-white px-3 py-2 transition-all duration-500 md:px-8 md:py-3"
    :class="[isAllAnswered ? 'md:rounded-3xl' : 'md:rounded-3xl']"
    @click="clickBlock"
  >
    <div class="relative pt-8 md:pt-10">
      <!-- 真正打字的地方 -->
      <input
        v-if="!isFakeKeyboard && isNowCard && !isAllAnswered"
        ref="inputRef"
        :value="userInput"
        class="absolute inset-0 z-30 w-full cursor-default opacity-0"
        type="text"
        spellcheck="false"
        autocapitalize="off"
        @focus="scrollToTestWindowBarOnMobile"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @compositionupdate="onCompositionUpdate"
      />

      <!-- 顯示格子／字的地方 -->
      <div
        class="z-10 flex flex-wrap items-center justify-center gap-2 transition md:gap-4"
      >
        <div
          v-for="(char, i) in displayChars"
          :key="i"
          class="relative flex flex-col items-center"
        >
          <div
            v-if="
              i === currentInputIndex &&
              isNowCard &&
              isComposing &&
              composingText
            "
            class="pointer-events-none absolute bottom-full left-0 z-20 mb-2 rounded-full bg-[#7A3A3A] px-3 py-1 text-xs font-bold tracking-wide whitespace-nowrap text-white shadow-md shadow-[#7A3A3A]/20 md:mb-3 md:px-4 md:text-sm"
          >
            {{ composingText }}
          </div>

          <div
            class="flex h-9 w-7 items-center justify-center rounded-md text-xl font-black transition-all duration-200 md:h-16 md:w-12 md:text-4xl"
            :class="{
              'text-red-500': resultStates?.[i] === 'wrong',
              'ring ring-[#F9595F]/80': i === currentInputIndex && isNowCard,
            }"
          >
            <div v-if="isOriBlank(i)" class="w-4 md:w-8"></div>
            <span v-else-if="isAutoFillIndex(i)" class="text-[#D1B8B8]">
              {{ char }}
            </span>

            <span
              v-else-if="!char"
              :class="
                i === currentInputIndex && isComposing
                  ? 'text-[#F9595F]/80'
                  : 'text-[#D1B8B8]/40'
              "
            >
              {{ i === currentInputIndex && isComposing ? composingText : '' }}
            </span>

            <span
              v-else-if="isHintIndex(i) && !isTypedIndex(i)"
              class="text-[#D1B8B8]"
            >
              {{ char }}
            </span>

            <span v-else class="text-red-800">
              {{ char }}
            </span>
          </div>

          <!-- 底線 -->
          <div v-if="isOriBlank(i)" class="w-4 md:w-8"></div>
          <div
            v-else
            class="mt-1 h-1 w-full rounded-full transition-all duration-500 md:h-2.5"
            :class="[
              i === currentInputIndex && isNowCard
                ? 'bg-[#F9595F]/80'
                : resultStates
                  ? resultStates[i] === 'correct'
                    ? 'bg-[#7A3A3A]'
                    : 'bg-red-500'
                  : 'bg-[#FFE5E5]',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
