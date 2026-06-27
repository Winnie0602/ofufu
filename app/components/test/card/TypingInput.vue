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

// 非IME拼打時觸發
const onInput = (e: Event) => {
  if (isFakeKeyboard.value || isAllAnswered) {
    return
  }

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
    <div class="relative w-full">
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
      />

      <!-- 顯示格子／字的地方 -->
      <div
        class="z-10 flex w-full flex-wrap items-center justify-center space-x-0.5 transition"
      >
        <div
          v-for="(char, i) in displayChars"
          :key="i"
          class="flex flex-col items-center"
        >
          <div v-if="isOriBlank(i)" class="w-4 md:w-8"></div>
          <div
            v-else-if="isAutoFillIndex(i)"
            class="relative flex h-10 w-3 items-center justify-center border-b-[3px] border-transparent text-2xl font-black text-[#D1B8B8] transition-all duration-200 md:h-16 md:w-6 md:text-4xl"
          >
            {{ char || '' }}
          </div>

          <div
            v-else
            class="relative flex h-10 w-3 items-center justify-center border-b-[3px] text-2xl font-black transition-all duration-200 md:h-16 md:w-6 md:text-4xl"
            :class="[
              // 錯誤時的文字顏色
              resultStates?.[i] === 'wrong'
                ? 'border-red-500 text-red-500'
                : isHintIndex(i) && !isTypedIndex(i)
                  ? 'text-[#D1B8B8]'
                  : 'text-[#7A3A3A]',

              // 正在打字的格子：底線顏色加深 + 閃爍動畫
              i === currentInputIndex && isNowCard
                ? 'animate-blink border-[#F9595F]'
                : 'border-[#FFE5E5]',

              // 已經打過的格子，底線變深色
              i < currentInputIndex ? 'border-[#7A3A3A]' : 'text-[#D1B8B8]',
            ]"
          >
            {{ char || '' }}

            <div
              v-if="i === currentInputIndex && isNowCard"
              class="absolute inset-0 -z-10 bg-[#F9595F]/20"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
