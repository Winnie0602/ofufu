<script setup lang="ts">
import type { LyricData, WordData } from '~/types/song'
import type { DisplayAPIResult } from '~/types/tatoeba'
import type { LangCode } from '~/types/lang'
import { LANG_CONFIG_MAP } from '~/types/lang'

const { show } = useToast()

const emit = defineEmits(['goBack'])

const { videoId, lyrics, language, words } = defineProps<{
  videoId: string
  lyrics: LyricData[]
  language: LangCode
  words: WordData[]
}>()

// 單字及出現的句子 的陣列
const wordArr = ref<{ nanoids?: string[]; word: string }[]>(words)

const blockMode = ref<'lyric' | 'tatoeba'>('lyric')

// 目前選取的單字
const selectedWord = ref('')

const isSelectLyric = (nanoid: string) => {
  return wordArr.value
    .find((w) => w.word === selectedWord.value)
    ?.nanoids?.includes(nanoid)
}

const selectWordHandler = (word: string) => {
  if (selectedWord.value === word) {
    selectedWord.value = ''
  } else {
    selectedWord.value = word
  }
}

// input輸入匡
const inputText = ref('')

// 增加單字到單字陣列
const handleEnter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement
  const inputValue = target.value

  if (wordArr.value.length >= 20) {
    show('最多20個單字', 2000)

    return
  }

  if (!inputValue.trim()) return

  if (wordArr.value.find((w) => w.word === inputValue)) {
    show('已有此單字', 2000)

    inputText.value = ''
    return
  }

  wordArr.value.push({ word: inputValue, nanoids: [] })

  inputText.value = ''
}

const deleteTag = () => {
  wordArr.value = wordArr.value.filter((w) => w.word !== selectedWord.value)

  if (wordArr.value[0]) {
    selectedWord.value = wordArr.value[0]?.word
  } else {
    selectedWord.value = ''
  }
}

const selectLyric = (nanoid: string) => {
  if (selectedWord.value === '') {
    show('請先選擇一個單字', 2000)
    return
  }
  const targetWord = wordArr.value.find((w) => w.word === selectedWord.value)

  if (!targetWord) return

  if (!targetWord.nanoids) {
    targetWord.nanoids = []
  }

  // 找目標nanoid
  const index = targetWord.nanoids.indexOf(nanoid)

  // 移除
  if (index !== -1) {
    targetWord.nanoids.splice(index, 1)
  } else {
    // 加入
    targetWord.nanoids.push(nanoid)
  }
}

const saveWords = async () => {
  if (wordArr.value.length === 0) {
    show('沒有要更新的資料', 2000)

    return
  }

  await $fetch('/api/song/update-word', {
    method: 'POST',
    body: {
      videoId: videoId,
      words: wordArr.value,
    },
  })

  show('更新完成', 2000)

  emit('goBack')
}

// 歌曲語言的config
const currentLangConfig = ref(LANG_CONFIG_MAP[language || 'en'])

// tatoeba api回傳句子陣列
const tatoebaSentenses = ref<DisplayAPIResult[]>()

const { get: getTatoebaResult, loading: tatoebaLoading } = useTatoeba(
  currentLangConfig.value.tatoeba,
  'zh',
)

const showTatoeba = async () => {
  blockMode.value = 'tatoeba'

  tatoebaSentenses.value = await getTatoebaResult(selectedWord.value)
}

watch(selectedWord, async () => {
  if (selectedWord.value !== '' && blockMode.value === 'tatoeba') {
    tatoebaSentenses.value = await getTatoebaResult(selectedWord.value)
  }
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4 md:space-y-6">
    <!-- 新增單字input -->
    <div class="flex w-full max-w-[360px] items-center justify-center">
      <input
        v-model="inputText"
        type="text"
        class="flex-1 rounded-xl bg-[#FFF9F9] px-4 py-2.5 text-sm text-gray-700 ring-2 ring-red-300/30 outline-none focus:ring-red-400 md:py-3 md:text-base"
        placeholder="按下 Enter 新增單字"
        @keyup.enter="handleEnter"
      />

      <button
        class="ml-2 rounded-md border-red-300 bg-red-300 px-2.5 py-2.5 text-white"
      >
        送出
      </button>

      <div class="ml-1 text-sm md:ml-3 md:text-sm">
        {{ wordArr.length }} / 20
      </div>
    </div>

    <!-- 單字顯示Tags -->
    <div
      v-if="wordArr.length === 0"
      class="flex flex-col items-center py-4 md:py-8"
    >
      <p class="text-sm font-bold text-[#A66B6B] md:text-base">目前沒有單字</p>
      <p class="mt-1 text-[10px] text-[#A66B6B] opacity-60 md:text-xs">
        在上方輸入框按下 Enter 建立新單字
      </p>
    </div>
    <div v-else class="flex w-full max-w-[760px] flex-wrap gap-1.5 md:gap-3">
      <button
        v-for="(w, index) in wordArr"
        :key="index"
        class="group flex items-center overflow-hidden rounded-xl border border-[#FFE5E5] px-3 py-1 md:px-4 md:py-2"
        :class="
          selectedWord === w.word
            ? 'border-red-300/50 bg-red-300/50 shadow-md'
            : 'bg-[#FFF9F9] hover:border-[#F9595F]/50 hover:bg-white hover:shadow-md'
        "
        @click="selectWordHandler(w.word)"
      >
        <div class="flex items-center">
          <span
            class="text-[11px] font-medium text-[#7A3A3A] group-hover:text-[#F9595F] md:text-base"
          >
            {{ w.word }}
          </span>
        </div>
      </button>
    </div>

    <div
      class="flex w-full max-w-[760px] flex-col items-center space-y-3 rounded-2xl p-4 ring-1 ring-[#FFE5E5]"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm tracking-widest text-[#A66B6B] uppercase">
          Editing Word:
        </span>
        <span
          class="rounded-lg px-2 py-1 text-sm font-medium text-red-800 md:text-base"
        >
          {{ selectedWord || '尚未選取' }}
        </span>
      </div>

      <div
        class="flex w-full flex-col gap-2 md:flex-row md:justify-center md:gap-3"
      >
        <button
          class="flex-1 rounded-lg border py-2 text-xs transition-all md:max-w-[120px] md:text-sm"
          :class="
            blockMode === 'lyric'
              ? 'border-red-300/50 bg-red-300/50 shadow-md'
              : 'border-[#FFE5E5] bg-white text-[#7A3A3A]'
          "
          @click="blockMode = 'lyric'"
        >
          選取歌詞
        </button>

        <button
          class="flex-1 rounded-lg border py-2 text-xs transition-all md:max-w-[120px] md:text-sm"
          :class="
            blockMode === 'tatoeba'
              ? 'border-red-300/50 bg-red-300/50 shadow-md'
              : 'border-[#FFE5E5] bg-white text-[#7A3A3A]'
          "
          @click="showTatoeba"
        >
          查看例句
        </button>

        <button
          class="flex-1 rounded-lg border border-[#FFE5E5] bg-white py-2 text-xs text-[#7A3A3A] transition-all md:max-w-[120px] md:text-sm"
          @click="deleteTag"
        >
          <i class="fa-solid fa-trash-can text-[10px]"></i>
          刪除
        </button>
      </div>
    </div>
    <div
      class="hide-scroll h-[450px] w-full max-w-[1280px] overflow-y-scroll rounded-2xl border border-[#FFE5E5] bg-white/50 md:h-[460px]"
    >
      <!-- 歌詞 -->
      <div v-if="blockMode === 'lyric'" class="flex flex-col items-center">
        <div
          v-for="(lyric, index) in lyrics"
          v-show="lyric[language]?.includes(selectedWord)"
          :key="lyric.nanoid"
          class="flex w-full flex-col items-center justify-center gap-2 border-b border-white/20 px-4 py-6 transition-all hover:bg-[#F9595F]/5 md:flex-row md:gap-6 md:px-0 md:py-8"
        >
          <div
            class="flex w-full items-center justify-center md:w-24 md:justify-end"
          >
            <button
              class="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-[#F9595F] ring-1 transition-all hover:bg-[#F9595F] hover:text-white md:text-xs"
              :class="
                isSelectLyric(lyric.nanoid)
                  ? 'bg-[#F9595F]/30 ring-[#F9595F]/30'
                  : 'bg-white ring-[#F9595F]/30'
              "
              @click="selectLyric(lyric.nanoid)"
            >
              <i
                :class="
                  isSelectLyric(lyric.nanoid)
                    ? 'fa-solid fa-check text-white'
                    : 'fa-solid fa-plus'
                "
              ></i>

              {{ isSelectLyric(lyric.nanoid) ? '' : '選取' }}
            </button>
          </div>

          <div class="flex-1 text-center md:max-w-[500px] md:text-left">
            <div
              class="text-base leading-tight font-black text-[#7A3A3A] transition-all md:text-xl md:leading-relaxed"
            >
              <span>{{ lyric[language] }}</span>
            </div>
          </div>

          <div class="hidden w-24 md:block"></div>
        </div>
      </div>
      <!-- 例句 -->
      <div v-else class="mt-2 flex items-center justify-center">
        <!-- loading -->
        <div
          v-if="tatoebaLoading"
          class="flex flex-col items-center py-10 text-center opacity-60"
        >
          <p class="text-sm font-medium text-[#A66B6B] md:text-base">
            查詢中 ...
          </p>
        </div>

        <!-- 沒資料 -->
        <div
          v-else-if="!tatoebaSentenses || tatoebaSentenses.length === 0"
          class="flex flex-col items-center py-10 text-center opacity-60"
        >
          <p class="text-sm font-medium text-[#A66B6B] md:text-base">
            「
            <span class="text-[#F9595F]">{{ selectedWord }}</span>
            」 沒有找到相關例句
          </p>
        </div>

        <!-- 有資料 -->
        <div v-else>
          <div
            v-for="(sentense, i) in tatoebaSentenses"
            :key="i"
            class="flex items-center space-x-2 py-5 pb-3 text-sm font-black text-[#7A3A3A] transition-all md:text-xl"
          >
            <div class="px-1 text-[#7A3A3A]">{{ i + 1 }}.</div>
            <div>{{ sentense.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-[240px] pt-2">
      <button
        class="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F9595F] py-3.5 font-bold text-white shadow-lg shadow-red-100 transition-all hover:brightness-110 active:scale-[0.98] md:py-4"
        @click="saveWords"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i>
        儲存
      </button>
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
</style>
