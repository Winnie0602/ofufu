<script setup lang="ts">
type ChoiceOption = {
  id: string
  label: string
  isCorrect: boolean
}

type ChoicePreview = {
  kind: 'choice'
  prompt: string
  hasAudio?: boolean
  options: ChoiceOption[]
}

type ReorderPreview = {
  kind: 'reorder'
  prompt: string
  answer: string[]
  words: string[]
}

type TestType = {
  id: string
  title: string
  text: string
  preview: ChoicePreview | ReorderPreview
}

const testTypes = [
  {
    id: 'listening',
    title: '聽力選擇題',
    text: '播放一段話，從選項中找出正確答案，練習聽懂自然語速的日文。',
    preview: {
      kind: 'choice',
      prompt: '音声を聞いて、話している場所を選んでください。',
      hasAudio: true,
      options: [
        { id: 'a', label: '駅で友だちを待っています', isCorrect: false },
        { id: 'b', label: 'カフェで注文しています', isCorrect: true },
        { id: 'c', label: '図書館で本を探しています', isCorrect: false },
        { id: 'd', label: '家で料理をしています', isCorrect: false },
      ],
    },
  },
  {
    id: 'reading',
    title: '閱讀選擇題',
    text: '根據句子上下文選擇正確的詞句，熟悉單字、助詞與句型使用。',
    preview: {
      kind: 'choice',
      prompt: '昨日は雨が降っていたので、家で ____ しました。',
      options: [
        { id: 'a', label: 'ゆっくり', isCorrect: true },
        { id: 'b', label: 'たぶん', isCorrect: false },
        { id: 'c', label: 'とても', isCorrect: false },
        { id: 'd', label: 'すぐに', isCorrect: false },
      ],
    },
  },
  {
    id: 'pronounciation',
    title: '讀音選擇題',
    text: '選擇漢字正確的讀音，熟悉日文漢字的發音與訓讀、音讀的差異。',
    preview: {
      kind: 'choice',
      prompt: '約束',
      options: [
        { id: 'a', label: 'やくそく', isCorrect: true },
        { id: 'b', label: 'やぐそく', isCorrect: false },
        { id: 'c', label: 'よくそく', isCorrect: false },
        { id: 'd', label: 'やくぞく', isCorrect: false },
      ],
    },
  },
  {
    id: 'vocabulary',
    title: '單字選擇題',
    text: '選擇正確的單字意思，以卡片方式快速記憶單字。',
    preview: {
      kind: 'choice',
      prompt: '支える',
      options: [
        { id: 'a', label: '支撐、支持', isCorrect: true },
        { id: 'b', label: '忘記', isCorrect: false },
        { id: 'c', label: '出發', isCorrect: false },
        { id: 'd', label: '比較', isCorrect: false },
      ],
    },
  },
  {
    id: 'reorganization',
    title: '句子重組',
    text: '將打亂的句子重新排列，練習日文語序與文法結構。',
    preview: {
      kind: 'reorder',
      prompt: '',
      answer: ['明日', '友だちと', '映画を', '見に', '行きます'],
      words: ['映画を', '行きます', '明日', '見に', '友だちと'],
    },
  },
] satisfies TestType[]

const activeTestId = ref(testTypes[0]?.id ?? '')
const selectedReorderWords = ref<string[]>([])

const toggleTest = (id: string) => {
  activeTestId.value = activeTestId.value === id ? '' : id
}

const getAvailableReorderWords = (preview: ReorderPreview) =>
  preview.words.filter((word) => !selectedReorderWords.value.includes(word))

const selectReorderWord = (preview: ReorderPreview, word: string) => {
  if (selectedReorderWords.value.length >= preview.answer.length) return
  selectedReorderWords.value = [...selectedReorderWords.value, word]
}

const removeReorderWord = (word?: string) => {
  if (!word) return

  selectedReorderWords.value = selectedReorderWords.value.filter(
    (item) => item !== word,
  )
}
</script>

<template>
  <section
    class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
  >
    <div class="flex items-center justify-between">
      <div class="section-title !mb-0">
        <span
          class="icon-[tabler--arrow-badge-right] section-title-icon"
        ></span>
        <h2>多種測驗題型</h2>
      </div>
      <button
        type="button"
        class="text-primary hover:text-error flex shrink-0 items-center gap-1 text-sm font-medium tracking-wide transition"
      >
        去測驗
        <span class="icon-[tabler--arrow-right] size-3.5"></span>
      </button>
    </div>
    <div
      class="accordion accordion-shadow *:accordion-item-active:shadow-md mt-5"
    >
      <div
        v-for="testType in testTypes"
        :id="`${testType.id}-test`"
        :key="testType.id"
        class="accordion-item"
        :class="{ active: activeTestId === testType.id }"
      >
        <button
          class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start"
          :aria-controls="`${testType.id}-test-collapse`"
          :aria-expanded="activeTestId === testType.id"
          type="button"
          @click="toggleTest(testType.id)"
        >
          <span
            class="icon-[tabler--plus] accordion-item-active:hidden text-base-content block size-4.5 shrink-0"
          ></span>
          <span
            class="icon-[tabler--minus] accordion-item-active:block text-base-content hidden size-4.5 shrink-0"
          ></span>
          <span class="font-black text-neutral-900">
            {{ testType.title }}
          </span>
        </button>
        <div
          :id="`${testType.id}-test-collapse`"
          class="accordion-content grid w-full overflow-hidden transition-[grid-template-rows,opacity] duration-300"
          :class="
            activeTestId === testType.id
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          "
          :aria-labelledby="`${testType.id}-test`"
          role="region"
        >
          <div class="min-h-0 overflow-hidden px-5 pb-5">
            <p class="text-base-content/80 text-sm leading-7 font-medium">
              {{ testType.text }}
            </p>

            <div class="mt-4 rounded-lg">
              <template v-if="testType.preview.kind === 'choice'">
                <div class="flex items-start gap-3">
                  <div class="min-w-0 flex-1 space-y-3">
                    <div
                      class="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3"
                    >
                      <div
                        v-if="testType.preview.hasAudio"
                        class="flex shrink-0 items-center gap-2"
                      >
                        <span
                          class="badge badge-outline badge-error rounded-full"
                        >
                          問題
                        </span>
                        <label
                          class="text-error swap swap-rotate"
                          aria-label="播放聽力題目"
                        >
                          <input type="checkbox" />
                          <span
                            class="icon-[tabler--player-play-filled] swap-off"
                          ></span>
                          <span
                            class="icon-[tabler--player-pause-filled] swap-on"
                          ></span>
                        </label>
                      </div>
                      <p
                        class="text-error flex min-w-0 items-center leading-7 font-medium break-words md:flex-1"
                        :class="{
                          'text-center text-2xl tracking-wide':
                            testType.id === 'pronounciation' ||
                            testType.id === 'vocabulary',
                        }"
                      >
                        {{ testType.preview.prompt }}
                      </p>
                    </div>

                    <div class="mt-4 grid gap-2 sm:grid-cols-2">
                      <div
                        v-for="(option, optionIndex) in testType.preview
                          .options"
                        :key="option.id"
                        class="flex min-h-12 items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-600"
                      >
                        <span
                          class="flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-xs font-black text-neutral-500"
                        >
                          {{ String.fromCharCode(65 + optionIndex) }}
                        </span>
                        <div
                          class="flex w-full min-w-0 items-center justify-between"
                        >
                          <span class="min-w-0 break-words">
                            {{ option.label }}
                          </span>
                          <span
                            v-if="option.isCorrect"
                            class="icon-[tabler--circle-dashed-check] swap-off size-7 text-green-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-else>
                <p class="text-base leading-7 font-black text-neutral-950">
                  {{ testType.preview.prompt }}
                </p>

                <div class="mt-4 grid gap-3">
                  <TransitionGroup
                    name="word-pop"
                    tag="div"
                    class="flex flex-wrap gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-4"
                  >
                    <template
                      v-for="(_, slotIndex) in testType.preview.answer"
                      :key="slotIndex"
                    >
                      <button
                        v-if="selectedReorderWords[slotIndex]"
                        :key="`selected-${selectedReorderWords[slotIndex]}`"
                        class="border-primary/50 text-primary hover:bg-primary/20 flex h-10 min-w-20 items-center justify-center border-b-[3px] bg-none px-3 text-sm font-black transition"
                        type="button"
                        @click="
                          removeReorderWord(selectedReorderWords[slotIndex])
                        "
                      >
                        {{ selectedReorderWords[slotIndex] }}
                      </button>
                      <span
                        v-else
                        :key="`slot-${slotIndex}`"
                        class="flex h-10 min-w-20 items-center justify-center border-b-[3px] border-neutral-300 bg-neutral-50 px-3 text-sm font-black text-neutral-300"
                      >
                        _
                      </span>
                    </template>
                  </TransitionGroup>
                </div>

                <TransitionGroup
                  name="word-pop"
                  tag="div"
                  class="mt-4 flex flex-wrap gap-2"
                >
                  <button
                    v-for="word in getAvailableReorderWords(testType.preview)"
                    :key="word"
                    class="flex min-h-9 items-center rounded-lg border border-dashed border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
                    type="button"
                    @click="selectReorderWord(testType.preview, word)"
                  >
                    {{ word }}
                  </button>
                </TransitionGroup>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.word-pop-enter-active,
.word-pop-leave-active,
.word-pop-move {
  transition:
    transform 180ms ease,
    opacity 180ms ease;
}

.word-pop-enter-from,
.word-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

.word-pop-leave-active {
  position: absolute;
}
</style>
