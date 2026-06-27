<script setup lang="ts">
import type { SongData } from '~/types/song'
import type { LangCode } from '~/types/lang'
import { languageMapCodeLabel } from '~/types/lang'

const store = usePlayerStore()

const { currentSong } = defineProps<{
  currentSong: SongData
}>()

const emit = defineEmits<{
  // 設定題型
  (e: 'setQuizeType', value: 'partial' | 'allBlank' | 'translation'): void
  // 設定翻譯遊戲的語言
  (e: 'setTransGameLang', value: LangCode | null): void
}>()

// 目前的播放速度
const currentSpeed = ref(1)

// 語言翻譯遊戲 選擇的語言
const translationGameLang = ref<LangCode | null>(null)

// 題型選項
const quizTypes = ['translation', 'partial', 'allBlank'] as const

// 選擇的題型
const selectedQuizType = ref<'partial' | 'allBlank' | 'translation'>(
  'translation',
)

// 速度設定
const speedSteps = [0.5, 0.75, 1, 1.25, 1.5]

// 播放速度改變（速度控制拖曳bar)
const handleSliderChange = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)

  currentSpeed.value = value

  // 設定播放器速度(test mode)
  store.setPlaybackRate(currentSpeed.value)

  // 播放第一句到第五句歌詞，讓使用者可以即時聽到速度變化的效果
  store.playSegmentRequest(
    currentSong.lyrics[0]?.start ?? 0,
    currentSong.lyrics[5]?.end ?? 0,
  )
}

const handlePlay = (isPlaying: boolean) => {
  if (isPlaying) {
    store.play()
    return
  }

  store.pause()
}

// 題型更換時開啟特效
watch(selectedQuizType, () => {
  emit('setQuizeType', selectedQuizType.value)
})

watch(translationGameLang, () => {
  emit('setTransGameLang', translationGameLang.value)
})

onMounted(() => {
  translationGameLang.value = currentSong?.translation_langs[0] ?? null
})
</script>

<template>
  <div class="px-5 py-6 md:px-20 md:py-10">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div class="space-y-5 lg:col-span-5">
        <div
          class="overflow-hidden rounded-2xl border-2 border-[#FFE5E5] bg-[#FFF9F9] p-1.5 shadow-sm"
        >
          <img
            :src="`https://img.youtube.com/vi/${currentSong.id}/mqdefault.jpg`"
            class="aspect-video w-full rounded-xl object-cover shadow-inner"
          />
          <div class="flex justify-between p-3">
            <div>
              <h2 class="line-clamp-1 text-lg font-bold text-[#7A3A3A]">
                {{ currentSong.title }}
              </h2>
              <p class="text-xs font-medium text-[#A66B6B]">
                {{ currentSong.artist }}
              </p>
            </div>
            <button
              class="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-pink-200 bg-white shadow-md"
              @click="handlePlay(!store.isPlaying)"
            >
              <i
                class="fa-solid text-lg text-[#F9595F]"
                :class="store.isPlaying ? 'fa-pause' : 'fa-play'"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-10 lg:col-span-7 lg:pt-2">
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-[#F9595F]"></div>
              <span class="text-sm font-bold text-[#7A3A3A]">
                {{ $t('play_speed') }}
              </span>
            </div>
            <span
              class="text-2xl font-black tracking-tighter text-[#F9595F] italic"
            >
              {{ currentSpeed.toFixed(2) }}
              <span class="ml-0.5 text-xs text-[#A66B6B] not-italic">x</span>
            </span>
          </div>
          <div class="px-1">
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.25"
              :value="currentSpeed"
              class="custom-slider w-full"
              :style="{
                '--progress': `${((currentSpeed - 0.5) / 1.0) * 100}%`,
              }"
              @change="handleSliderChange"
            />
            <div
              class="mt-4 flex justify-between px-1 text-[10px] font-black text-[#E4BABA]"
            >
              <span
                v-for="s in speedSteps"
                :key="s"
                :class="{
                  'scale-110 text-[#F9595F]': currentSpeed === s,
                }"
              >
                {{ s === 1 ? '1.0' : s }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="h-1.5 w-1.5 rounded-full bg-[#F9595F]"></div>
            <span class="text-sm font-bold text-[#7A3A3A]">
              {{ $t('test_type') }}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="t in quizTypes"
              :key="t"
              class="relative rounded-xl border-2 py-2.5 text-[13px] font-bold transition-all active:scale-95 md:py-3.5"
              :class="
                selectedQuizType === t
                  ? 'border-[#F9595F] bg-white text-[#F9595F] shadow-[0_3px_0_0_#F9595F15]'
                  : 'border-transparent bg-[#FFE5E5]/40 text-[#A66B6B]'
              "
              @click="selectedQuizType = t"
            >
              <span
                v-if="t !== 'translation'"
                class="absolute -top-2 -right-1 rounded-md bg-[#A66B6B] px-2 py-0.5 text-[12px] font-black text-white"
              >
                開發中
              </span>

              {{ $t(`quiz_type.${t}`) }}
            </button>
          </div>
          <!-- 預覽題型 -->
          <div
            class="rounded-2xl border border-dashed border-[#F9595F]/30 bg-[#FFE5E5]/20 p-4"
          >
            <Transition name="fade" mode="out-in">
              <div :key="selectedQuizType">
                <span
                  class="mb-10 text-[12px] font-black tracking-widest text-[#F9595F] uppercase"
                >
                  {{ selectedQuizType }}
                </span>
                <div
                  class="mb-3 flex items-center text-[14px] font-bold text-[#A66B6B] md:mb-6"
                >
                  <span class="mr-2">{{ $t('re_listen_time') }}</span>
                  <div class="flex items-end space-x-1.5">
                    <i
                      v-for="i in 3"
                      :key="i"
                      class="fa-solid fa-apple-whole text-lg text-[#F9595F] md:text-2xl"
                    />
                    <span class="ml-4">X3</span>
                  </div>
                </div>
                <div
                  v-if="selectedQuizType === 'allBlank'"
                  class="flex items-center space-x-3 md:space-x-5"
                >
                  <div
                    v-for="(_, i) in 10"
                    :key="i"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="flex h-7 w-5 items-center justify-center text-xl font-black md:h-11 md:w-8 md:text-4xl"
                      :class="{
                        'rounded-md bg-[#FFF9F9] text-[#F9595F] shadow-inner ring-2 ring-[#F9595F]/20 md:ring-4':
                          i === 0,
                      }"
                    ></div>

                    <div
                      class="mt-1 h-1 w-full rounded-full bg-[#FFE5E5] md:h-2"
                    />
                  </div>
                </div>
                <div
                  v-else-if="selectedQuizType === 'partial'"
                  class="flex items-center space-x-3 md:space-x-5"
                >
                  <div
                    v-for="(_, i) in 10"
                    :key="i"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="flex h-7 w-5 items-center justify-center text-xl font-black text-[#A66B6B] md:h-11 md:w-8 md:text-4xl"
                      :class="{
                        'rounded-md bg-[#FFF9F9] text-[#F9595F] shadow-inner ring-2 ring-[#F9595F]/20 md:ring-4':
                          i === 0,
                      }"
                    >
                      {{ i === 4 ? 'A' : '' }}
                      {{ i === 7 ? 'B' : '' }}
                    </div>

                    <div
                      class="mt-1 h-1 w-full rounded-full bg-[#FFE5E5] md:h-2"
                    />
                  </div>
                </div>
                <div
                  v-else-if="selectedQuizType === 'translation'"
                  class="space-y-6"
                >
                  <div class="space-y-4">
                    <div
                      class="text-xs leading-relaxed font-bold text-[#A66B6B]"
                    >
                      <div class="flex items-center gap-1.5 text-[#F9595F]">
                        <i class="fa-solid fa-circle-info"></i>
                        <span>{{ $t('test_ui.translation_hint') }}</span>
                      </div>
                      <p class="mt-1 opacity-80">
                        {{ $t('test_ui.translation_language_prompt') }}
                      </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="lang in currentSong.translation_langs"
                        :key="lang"
                        class="min-w-[70px] rounded-xl border-2 px-4 py-2 text-xs font-black transition-all active:scale-95"
                        :class="
                          translationGameLang === lang
                            ? 'border-[#F9595F] bg-white text-[#F9595F] shadow-[0_3px_0_0_#F9595F15]'
                            : 'border-transparent bg-white/50 text-[#A66B6B] hover:bg-white'
                        "
                        @click="translationGameLang = lang"
                      >
                        {{ languageMapCodeLabel[lang] }}
                      </button>
                    </div>
                  </div>

                  <div
                    class="rounded-2xl border border-[#F9595F]/10 bg-white/80 px-3 py-1 shadow-sm md:px-5 md:py-3"
                  >
                    <div class="space-y-4">
                      <span
                        class="rounded-xl bg-[#F9595F] px-3 py-1 text-[10px] font-black tracking-widest text-white"
                      >
                        EXAMPLE
                      </span>
                      <div class="flex items-center gap-4">
                        <span class="text-xs font-bold text-[#A66B6B]">
                          {{ $t('test_ui.listening_question') }}
                        </span>
                        <button
                          class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-pink-100 bg-white text-[#F9595F] shadow-sm"
                          @click="
                            store.playSegmentRequest(
                              currentSong.lyrics[5]?.start ?? 0,
                              currentSong.lyrics[5]?.end ?? 0,
                            )
                          "
                        >
                          <i class="fa-solid fa-volume-high text-sm"></i>
                        </button>
                      </div>

                      <div
                        class="h-px w-full border-b border-dashed border-[#FFE5E5]"
                      ></div>

                      <div class="space-y-2">
                        <span class="text-xs font-bold text-[#A66B6B]">
                          {{ $t('test_ui.correct_answer_preview') }}
                        </span>
                        <div
                          class="min-h-[40px] rounded-xl bg-[#FFF9F9] px-4 py-3 text-sm font-medium text-[#7A3A3A] ring-1 ring-[#F9595F]/5"
                        >
                          <template v-if="translationGameLang">
                            {{
                              currentSong.lyrics[5]?.[translationGameLang] ||
                              '暫無翻譯資料'
                            }}
                          </template>
                          <span v-else class="text-[#E4BABA] italic">
                            請先選擇語言...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
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

.custom-slider {
  appearance: none;
  height: 8px;
  border-radius: 9999px;
  cursor: pointer;
  outline: none;
  background-image: linear-gradient(
    to right,
    #f9595f 0%,
    #f9595f var(--progress),
    #ffe5e5 var(--progress),
    #ffe5e5 100%
  );
}

.custom-slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  background: #fff;
  border: 4px solid #f9595f;
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(249, 89, 95, 0.3);
  transition: transform 0.1s ease;
}

.custom-slider::-webkit-slider-thumb:active {
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
