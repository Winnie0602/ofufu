<script setup lang="ts">
import type { SongData } from '~/types/song'
import { type LangCode, I18N_TO_DB } from '~/types/lang'
const { locale } = useI18n()

const { show } = useToast()

const store = usePlayerStore()

const { currentSong, translationGameLang } = defineProps<{
  currentSong: SongData
  translationGameLang: LangCode | null
  selectedQuizType: 'partial' | 'allBlank' | 'translation'
}>()

const emit = defineEmits<{
  (e: 'update', testIds: string[]): void // 更新選擇的歌詞 ID 列表
}>()

// 已選擇的歌詞 ID 陣列
const testIds = ref<string[]>([])

// 目前打開的 Disclosure ID
const openDisclosureId = ref<string | null>(null)

// 按下選擇歌詞按鈕後的處理函式
const setTestlyric = (nanoid: string) => {
  // 最多只能選擇 8 句歌詞
  if (testIds.value.length >= 8) {
    show($t('up_to_8_words'), 2000)

    return
  }

  // 選擇新的歌詞後，關閉 Disclosure
  openDisclosureId.value = null

  testIds.value.push(nanoid)

  emit('update', testIds.value)
}

// 按下重置按鈕後的處理函式(取消選擇該歌詞，並關閉 Disclosure)
const reset = (id: string) => {
  testIds.value = testIds.value.filter((i) => i !== id)

  if (openDisclosureId.value === id) {
    openDisclosureId.value = null
  }
}

// 切換 Disclosure 的開啟狀態
const toggleDisclosure = (id: string) => {
  openDisclosureId.value = openDisclosureId.value === id ? null : id
}
</script>

<template>
  <div class="h-full w-full md:h-[calc(100%-40px)]">
    <div class="mt-1 space-y-4 bg-white md:space-y-6 md:px-6 md:py-6">
      <div v-for="lyric in currentSong.lyrics" :key="lyric.nanoid">
        <div
          class="relative flex flex-col justify-center px-4 py-2 pr-10 text-sm transition-all md:flex-row md:items-center md:justify-between md:px-3 md:py-3 md:pr-10 md:text-base"
          :class="{
            'bg-[#F9595F]/10': testIds.includes(lyric.nanoid),
          }"
        >
          <i
            v-if="testIds.includes(lyric.nanoid)"
            class="fa-solid fa-circle-check absolute top-1/2 right-3 -translate-y-1/2 text-lg text-[#22C55E]"
          />

          <div class="w-full">
            <button
              type="button"
              class="flex flex-col text-left"
              @click="toggleDisclosure(lyric.nanoid)"
            >
              <!-- 主要歌詞 -->
              <div
                v-if="currentSong.language === 'ja'"
                class="text-[#8F5F5F]"
                v-html="lyric.ruby"
              />

              <div v-else class="flex flex-wrap text-[#8F5F5F]">
                {{ lyric[currentSong.language] }}
              </div>

              <!-- 歌詞翻譯 -->
              <span class="mt-1 text-[12px] text-gray-500 md:text-[13px]">
                {{
                  selectedQuizType === 'translation'
                    ? lyric[translationGameLang ?? I18N_TO_DB[locale]]
                    : lyric[I18N_TO_DB[locale]]
                }}
              </span>
            </button>

            <!-- 下拉 Disclosure Content -->
            <transition
              enter-active-class="transition-[max-height,opacity] duration-300 ease-out overflow-hidden"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[200px] opacity-100"
              leave-active-class="transition-[max-height,opacity] duration-200 ease-in overflow-hidden"
              leave-from-class="max-h-[200px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div
                v-if="openDisclosureId === lyric.nanoid"
                class="mt-1 flex gap-2"
              >
                <!-- 播放 -->
                <button
                  class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F9595F] bg-[#F9595F]/90 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#e8484e] md:flex-none md:rounded-md md:px-4 md:text-sm"
                  @click="store.playSegmentRequest(lyric.start, lyric.end)"
                >
                  <i class="fa-solid fa-play"></i>
                  <span>{{ $t('preview') }}</span>
                </button>

                <!-- 重置 ／ 選擇 -->
                <button
                  v-if="testIds.includes(lyric.nanoid)"
                  class="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-[#F9595F] bg-white px-2 py-1.5 text-xs font-medium text-[#F9595F] transition-all hover:bg-[#F9595F]/5 md:flex-none md:rounded-md md:px-4 md:text-sm"
                  @click="reset(lyric.nanoid)"
                >
                  <span>{{ $t('reset') }}</span>
                </button>
                <button
                  v-else
                  class="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-[#F9595F] bg-white px-2 py-1.5 text-xs font-medium text-[#F9595F] transition-all hover:bg-[#F9595F]/5 md:flex-none md:rounded-md md:px-4 md:text-sm"
                  @click="setTestlyric(lyric.nanoid)"
                >
                  <span>{{ $t('select_this_lyric') }}</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
