<script setup lang="ts">
import type { LyricData } from '~/types/song'
import type { LangCode } from '~/types/lang'
import { languageMapCodeLabel } from '~/types/lang'

const { open } = useCheckConfirm()

const emit = defineEmits(['goBack'])

const { show } = useToast()

const {
  videoId,
  lyrics,
  language: originalLanguage,
  translationLangs,
} = defineProps<{
  videoId: string
  lyrics: LyricData[]
  language: LangCode
  translationLangs: LangCode[] // 已有的翻譯
}>()

// ***編輯功能
// 每個語言的編輯狀態
const isLangsEditing = ref<Partial<Record<LangCode, boolean>>>({})

const toggleEdit = (code: LangCode) => {
  isLangsEditing.value[code] = !isLangsEditing.value[code]
}

// 儲存各個語言的 rawLyrics 字串內容
const langForms = ref<Partial<Record<LangCode, string>>>({})

// 目前已開啟編輯的語言列表 (預設不包含原始語言)
const activeLangs = ref<LangCode[]>(translationLangs)

// 計算還剩下哪些語言可以新增
const availableLangs = computed(() => {
  const allCodes = Object.keys(languageMapCodeLabel) as LangCode[]

  return allCodes.filter(
    (code) => !activeLangs.value.includes(code) && code !== originalLanguage,
  )
})

// 新增語言到列表
const addLanguage = (code: LangCode) => {
  if (!activeLangs.value.includes(code)) {
    activeLangs.value.push(code)
    langForms.value[code] = ''
    isLangsEditing.value[code] = true
  }
}

// 移除語言
const removeLanguage = async (code: LangCode) => {
  if (langForms.value[code]?.trim()) {
    const confirm = await open('請注意無法復原', '將刪除該語言歌詞', 'ask')
    if (!confirm) return
  }

  activeLangs.value = activeLangs.value.filter((c) => c !== code)

  // 移除編輯狀態
  if (isLangsEditing.value[code] !== undefined) {
    const { [code]: _, ...restEditing } = isLangsEditing.value
    isLangsEditing.value = restEditing
  }

  // 移除表單歌詞內容
  if (langForms.value[code] !== undefined) {
    const { [code]: _, ...restForms } = langForms.value
    langForms.value = restForms
  }
}

const handleSave = async () => {
  // 先檢查是否資料行數都正確
  const errLangsContent = [] as string[]

  activeLangs.value.forEach((lang) => {
    const newTranslation = langForms.value[lang]
      ?.split('\n')
      .filter((l) => l.trim())

    if (newTranslation?.length !== lyrics.length) {
      errLangsContent.push(languageMapCodeLabel[lang])
    }
  })

  if (errLangsContent.length > 0) {
    open('資料錯誤', `欄位: ${errLangsContent} 與原文行數不一致`, 'noAsk')

    return
  }

  const payload = {
    videoId,
    langsLyrics: langForms.value,
    langs: activeLangs.value,
  }

  await $fetch('/api/song/update-translation', {
    method: 'POST',
    body: { payload },
  })

  show('更新完成', 2000)

  emit('goBack')
}

//複製功能
const copied = ref(false)

const handleCopy = async () => {
  try {
    const text = lyrics.map((l) => l[originalLanguage] || '').join('\n')

    await navigator.clipboard.writeText(text)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 5000)
  } catch (e) {
    console.error('copy failed', e)
  }
}

onMounted(() => {
  // 填入歌詞原本內容到form
  activeLangs.value.forEach((code) => {
    langForms.value[code] = lyrics.map((l) => l[code] || '').join('\n')
  })
})
</script>

<template>
  <div class="mx-auto w-full max-w-3xl space-y-8 md:pb-20">
    <div
      class="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-[#FFE5E5] bg-[#FFF9F9] p-2 md:flex-row md:p-4"
    >
      <div class="text-xs text-[#A66B6B] md:text-sm">新增其他語言翻譯</div>

      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="code in availableLangs"
          :key="code"
          class="rounded-full bg-white px-2 py-1 text-xs text-[#F9595F] ring-1 ring-[#F9595F]/20 transition-all hover:bg-[#F9595F] hover:text-white md:px-4 md:py-1.5 md:text-sm"
          @click="addLanguage(code)"
        >
          + {{ languageMapCodeLabel[code] }}
        </button>
      </div>
    </div>

    <div class="space-y-5">
      <div class="space-y-3">
        <!-- 原文 -->
        <div class="ml-1 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F9595F]/80 text-[10px] font-black text-white"
            >
              {{ language.toUpperCase() }}
            </span>
            <label
              class="text-[10px] font-medium tracking-wider text-[#A66B6B] uppercase md:text-sm"
            >
              原文：{{ languageMapCodeLabel[language] }}
            </label>
            <div class="text-xs">行數: {{ lyrics.length }}</div>
          </div>
          <button
            class="flex items-center gap-1 rounded-md bg-[#FFE5E5] px-2 py-1 text-xs text-[#F9595F] active:scale-95"
            @click="handleCopy"
          >
            <i class="fa-regular fa-copy"></i>
            <span>
              {{ copied ? '已複製' : 'Copy' }}
            </span>
          </button>
        </div>

        <div
          class="no-scrollbar h-[200px] w-full overflow-scroll rounded-2xl bg-gray-200 p-3 text-sm text-gray-700 ring-2 ring-red-300/30 md:p-5 md:text-base"
        >
          <div v-for="lyric in lyrics" :key="lyric.nanoid">
            {{ lyric[language] }}
          </div>
        </div>
      </div>
      <div v-for="code in activeLangs" :key="code" class="space-y-3">
        <div class="ml-1 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F9595F]/80 text-[10px] font-black text-white"
            >
              {{ code.toUpperCase() }}
            </span>
            <label
              class="text-[10px] font-medium tracking-wider text-[#A66B6B] uppercase md:text-sm"
            >
              {{ languageMapCodeLabel[code] }} translation
            </label>
            <div v-if="isLangsEditing[code]" class="text-xs">
              ( 目前行數:
              {{
                langForms[code]?.split('\n').filter((l) => l.trim()).length || 0
              }}
              / {{ lyrics.length }} )
            </div>
          </div>

          <div class="flex space-x-2">
            <!-- 編輯 -->
            <button
              class="text-lg font-medium text-red-400 hover:text-red-600"
              @click="toggleEdit(code)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <!-- 刪除 -->
            <button
              class="text-lg font-medium text-red-400 hover:text-red-600"
              @click="removeLanguage(code)"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div
          v-if="!isLangsEditing[code]"
          class="no-scrollbar h-[200px] w-full overflow-scroll rounded-2xl bg-gray-200 p-3 text-sm text-gray-700 ring-2 ring-red-300/30 md:p-5 md:text-base"
        >
          <div v-for="lyric in lyrics" :key="lyric.nanoid">
            {{ lyric[code] }}
          </div>
        </div>
        <textarea
          v-else
          v-model="langForms[code]"
          rows="8"
          class="no-scrollbar w-full rounded-2xl bg-[#FFF9F9] p-3 text-sm leading-relaxed text-gray-700 ring-2 ring-red-300/30 transition-all outline-none focus:ring-red-400 md:p-5 md:text-base"
          :placeholder="`在此貼上整段翻譯...&#10;行數與原歌詞 (${lyrics.length} 行)需一致`"
        ></textarea>
      </div>
    </div>

    <div v-if="activeLangs.length !== 0" class="pt-2">
      <button
        class="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F9595F] py-3.5 font-bold text-white shadow-lg shadow-red-100 transition-all hover:brightness-110 active:scale-[0.98] md:py-4"
        @click="handleSave()"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i>
        儲存
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
