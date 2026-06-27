<script setup lang="ts">
import type { SongData, WordData } from '~/types/song'
import type { DisplayAPIResult } from '~/types/tatoeba'
import { LANG_CONFIG_MAP, I18N_TO_DB } from '~/types/lang'
const { locale } = useI18n()

const { song, currentNanoid } = defineProps<{
  song: SongData
  currentNanoid: string
}>()

const store = usePlayerStore()

// 底下例句panel打開狀態
const isPanelOpen = ref(false)

// ********* Tatoeba ************
// 歌曲語言的config
const currentLangConfig = ref(LANG_CONFIG_MAP[song.language || 'en'])

// tatoeba api回傳句子陣列
const tatoebaSentenses = ref<DisplayAPIResult[]>()

const { get: getTatoebaResult, loading: tatoebaLoading } = useTatoeba(
  currentLangConfig.value.tatoeba,
  computed(() => LANG_CONFIG_MAP[I18N_TO_DB[locale.value]].tatoeba),
)

const selectedWord = ref('')

const isNowWord = (word: WordData) => {
  if (!word.nanoids || word.nanoids.length < 0) return false
  return word.nanoids.includes(currentNanoid)
}

// 打開panel前的音樂播放狀態
let wasListening = false

// 打開下方panel區塊
const openPanel = async (word: string) => {
  selectedWord.value = word

  // 記住打開前的播放狀態
  wasListening = store.isPlaying

  isPanelOpen.value = true
  store.pause()

  tatoebaSentenses.value = await getTatoebaResult(selectedWord.value)
}

watch(isPanelOpen, (open) => {
  if (!open && wasListening) {
    store.play()
  }
})

watch(locale, () => {
  isPanelOpen.value = false
})
</script>

<template>
  <div
    class="w-full rounded-3xl border border-[#FFE5E5] bg-white p-4 shadow-sm md:p-6"
  >
    <div
      class="mb-6 flex items-center justify-between border-b border-[#FFF9F9] pb-1 md:pb-4"
    >
      <!-- 左邊 -->
      <div class="flex items-center">
        <h3
          class="flex flex-col text-lg font-black tracking-widest text-[#7A3A3A] md:gap-3 md:text-xl"
          :class="locale === 'en' ? '' : 'md:flex-row md:items-center'"
        >
          {{ $t('wors_examples') }}

          <span class="text-xs font-medium text-[#A66B6B] uppercase opacity-60">
            {{ $t('wors_examples_sub') }}
          </span>
        </h3>
      </div>

      <!-- 右邊 -->
      <span
        class="flex-none rounded-lg bg-[#FFE5E5] px-2 py-1 text-[10px] font-bold whitespace-nowrap text-[#F9595F]"
      >
        {{ $t('total_items', { count: song.words?.length || 0 }) }}
      </span>
    </div>

    <div
      v-if="song.words && song?.words.length > 0"
      class="flex flex-wrap gap-3"
    >
      <button
        v-for="(w, index) in song.words"
        :key="index"
        class="group flex items-center overflow-hidden rounded-xl border px-3 py-1.5 transition-all md:px-4 md:py-2"
        :class="
          isNowWord(w)
            ? 'scale-95 border-red-300 bg-red-300 text-white'
            : 'border-[#FFE5E5] bg-[#FFF9F9] hover:border-[#F9595F]/50 hover:bg-white hover:shadow-md'
        "
        @click="openPanel(w.word)"
      >
        <div class="flex items-center">
          <span
            class="text-sm font-bold text-[#7A3A3A] group-hover:text-[#F9595F] md:text-base"
          >
            {{ w.word }}
          </span>
        </div>
      </button>
    </div>

    <div
      v-else
      class="my-2 ml-3 flex w-full text-sm text-red-600 md:justify-center md:text-base"
    >
      {{ $t('no_words') }}
    </div>

    <BottomPanel
      :open="isPanelOpen"
      :word="selectedWord"
      :sentense="tatoebaSentenses"
      :loading="tatoebaLoading"
      :lang="song.language"
      @close="isPanelOpen = false"
    />
  </div>
</template>
