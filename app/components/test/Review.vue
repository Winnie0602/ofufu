<script setup lang="ts">
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'
import { I18N_TO_DB } from '~/types/lang'
const { locale } = useI18n()

const store = usePlayerStore()

const { userAnswers, testLyrics, lang, selectedQuizType, translationGameLang } =
  defineProps<{
    userAnswers: { cAnswer: string; uAnswer: string }[]
    testLyrics: LyricData[]
    lang: LangCode
    selectedQuizType: 'partial' | 'allBlank' | 'translation'
    translationGameLang: LangCode
  }>()

const emit = defineEmits<{
  (e: 'playSegment', value: { start: number; end: number }): void
}>()
</script>

<template>
  <div class="flex flex-col items-center p-4 md:p-10">
    <div class="w-full max-w-5xl space-y-12">
      <div
        v-for="(lyric, index) in testLyrics"
        :key="index"
        class="group border-b border-[#B58C8C]/20 pb-12 last:border-0"
      >
        <div class="flex items-center space-x-5">
          <button
            class="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#FFE5E5] text-[#F9595F] transition-all hover:bg-[#F9595F] hover:text-white active:scale-90 md:h-12 md:w-12"
            :disabled="store.isPlaying"
            @click="emit('playSegment', { start: lyric.start, end: lyric.end })"
          >
            <i class="fa-solid fa-play ml-0.5 text-xs"></i>
          </button>
          <div class="">
            <span class="text-2xl font-black tracking-wide md:text-4xl">
              {{ lyric[lang] }}
            </span>

            <p
              class="mt-3 text-sm font-medium tracking-wide text-[#A66B6B] md:text-lg"
            >
              {{
                lyric[
                  selectedQuizType === 'translation'
                    ? translationGameLang
                    : I18N_TO_DB[locale]
                ]
              }}
            </p>
          </div>
        </div>
        <div v-if="userAnswers[index] && selectedQuizType !== 'translation'">
          <div
            class="mt-6 flex items-center gap-4 rounded-2xl bg-[#FFE5E5]/30 p-3 md:p-8"
          >
            <div class="flex flex-none flex-col space-y-2">
              <span
                class="h-6 text-[10px] leading-6 font-black text-[#B58C8C] md:h-8 md:leading-8"
              >
                正解
              </span>
              <span
                class="h-6 text-[10px] leading-6 font-black text-[#F9595F] md:h-8 md:leading-8"
              >
                回答
              </span>
            </div>

            <div class="flex flex-wrap justify-start gap-x-4 gap-y-4">
              <div
                v-for="(word, wordIndex) in userAnswers[index].cAnswer.split(
                  ' ',
                )"
                :key="wordIndex"
                class="flex justify-start gap-x-0.5"
              >
                <div
                  v-for="(char, charIndex) in word"
                  :key="charIndex"
                  class="flex w-[1rem] flex-col items-center space-y-2 md:w-[1.2rem]"
                >
                  <span
                    class="h-6 font-mono text-base leading-6 font-bold text-[#7A3A3A] md:h-8 md:text-xl md:leading-8"
                  >
                    {{ char }}
                  </span>

                  <span
                    class="h-6 w-full border-b-[2px] text-center font-mono text-base leading-6 font-black whitespace-pre transition-all md:h-8 md:text-xl md:leading-8"
                    :class="
                      (() => {
                        const startIndex = userAnswers[index].cAnswer
                          .split(' ')
                          .slice(0, wordIndex)
                          .reduce((acc, w) => acc + w.length + 1, 0)
                        const globalIndex = startIndex + charIndex
                        return userAnswers[index].uAnswer[globalIndex] === ' '
                          ? 'border-none'
                          : userAnswers[index].uAnswer[globalIndex] !== char
                            ? 'border-[#F9595F] text-[#F9595F]'
                            : 'border-[#B58C8C]/20 text-[#7A3A3A]/30'
                      })()
                    "
                  >
                    {{
                      (() => {
                        const startIndex = userAnswers[index].cAnswer
                          .split(' ')
                          .slice(0, wordIndex)
                          .reduce((acc, w) => acc + w.length + 1, 0)
                        const globalIndex = startIndex + charIndex
                        return userAnswers[index].uAnswer[globalIndex] || ' '
                      })()
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="userAnswers[index] && selectedQuizType === 'translation'"
          class="mt-6 flex items-center gap-4 rounded-2xl bg-[#FFE5E5]/30 p-3 md:p-8"
        >
          <div
            class="flex-none text-[10px] leading-6 font-black md:h-8 md:leading-8"
          >
            回答
          </div>

          <div class="flex flex-wrap justify-start gap-x-2 gap-y-4">
            <div class="flex items-center justify-center space-x-2">
              <span
                class="font-mono text-base leading-6 font-bold text-[#7A3A3A] md:h-8 md:text-xl md:leading-8"
                :class="{
                  'text-red-600':
                    userAnswers[index].uAnswer !== userAnswers[index].cAnswer,
                }"
              >
                {{ userAnswers[index].uAnswer }}
              </span>
              <i
                v-if="userAnswers[index].uAnswer !== userAnswers[index].cAnswer"
                class="fa-solid fa-circle-xmark text-red-600"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 隱藏捲軸但保留捲動功能 */
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 針對行動裝置優化 */
@media (max-width: 768px) {
  .tracking-tighter {
    letter-spacing: -0.02em;
  }
}
</style>
