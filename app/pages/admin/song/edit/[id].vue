<script setup lang="ts">
import type { SongData } from '~/types/song'

definePageMeta({
  layout: 'no-player',
})

const route = useRoute()

const router = useRouter()

const videoId = computed(() => route.params.id as string)

const {
  data: songData,
  pending,
  refresh,
} = await useFetch<SongData | null>(`/api/song/${videoId.value}`)

const editMode = ref<'' | 'info' | 'word' | 'time' | 'translation'>('')

const modeTitleMap = {
  '': '編輯',
  info: '編輯歌曲資訊',
  word: '編輯歌曲單字',
  time: '編輯歌詞時間軸',
  translation: '編輯歌曲歌詞翻譯',
}

const currentTitle = computed(() => modeTitleMap[editMode.value])

const prevStep = () => {
  if (editMode.value === '') {
    router.push({ path: '/admin/song/list' })

    return
  }

  editMode.value = ''
}

const deleteSong = async (id: string) => {
  const check = await open('確認刪除?', '將會從資料庫刪除該歌曲資料。', 'ask')

  if (!check) return

  const response = await $fetch('/api/song/delete', {
    method: 'POST',
    body: { videoId: id },
  })

  if (response.success) {
    await open('刪除成功', '該歌曲已從資料庫移除。', 'noAsk')

    refresh()
  } else {
    await open('刪除失敗', '', 'noAsk')
  }
}

watch(editMode, () => {
  if (editMode.value === '') {
    refresh()
  }
})
</script>

<template>
  <div class="h-full px-4 pb-5">
    <div
      class="mt-4 flex items-center justify-center px-4 py-4 md:px-8 md:py-6"
    >
      <button
        class="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE5E5] text-[#F9595F] transition-all active:scale-90 md:left-8 md:h-10 md:w-10"
        @click="prevStep()"
      >
        <i class="fa-solid fa-chevron-left md:text-lg"></i>
      </button>

      <h1 class="text-lg font-medium tracking-wider text-[#7A3A3A] md:text-2xl">
        {{ currentTitle }}
      </h1>
    </div>
    <!-- 所有列表 -->
    <div
      v-if="editMode === '' && songData"
      class="flex flex-col items-center justify-center space-y-4 md:space-y-5"
    >
      <div class="mb-2 flex flex-col items-center">
        <div class="mb-2 w-full max-w-[640px] text-center">
          <h2
            class="text-xl leading-tight font-medium text-[#F9595F] md:text-2xl"
          >
            {{ songData?.title || '未知曲名' }}
          </h2>
          <p class="mt-1 text-[#7A3A3A] opacity-80 md:text-lg md:font-medium">
            {{ songData?.artist || '未知歌手' }}
          </p>
        </div>

        <img
          :src="`https://img.youtube.com/vi/${songData?.id}/mqdefault.jpg`"
          alt="thumbnail"
          class="w-[240px] rounded-lg border-4 border-[#FFE5E5] object-cover shadow-sm"
        />
      </div>

      <button
        class="w-full max-w-[640px] rounded-xl bg-[#FFE5E5] py-3 font-medium text-[#F9595F] active:scale-95 md:font-black"
      >
        編輯歌曲資訊
        <div class="mt-1 text-xs text-[#7A3A3A]">
          編輯歌曲ID、標題、歌手、語言
        </div>
      </button>
      <button
        class="w-full max-w-[640px] rounded-xl bg-[#FFE5E5] py-3 font-medium text-[#F9595F] active:scale-95 md:font-black"
        @click="editMode = 'word'"
      >
        編輯歌曲單字
        <div class="mt-1 text-xs text-[#7A3A3A]">新增及管理歌曲單字</div>
      </button>
      <button
        class="w-full max-w-[640px] rounded-xl bg-[#FFE5E5] py-3 font-medium text-[#F9595F] active:scale-95 md:font-black"
        @click="editMode = 'time'"
      >
        編輯歌曲時間軸
        <div class="mt-1 text-xs text-[#7A3A3A]">手動對齊歌曲時間</div>
      </button>
      <button
        class="w-full max-w-[640px] rounded-xl bg-[#FFE5E5] py-3 font-medium text-[#F9595F] active:scale-95 md:font-black"
        @click="editMode = 'translation'"
      >
        編輯歌曲歌詞翻譯
        <div class="mt-1 text-xs text-[#7A3A3A]">編輯歌詞各國語言翻譯</div>
      </button>
      <button
        class="w-full max-w-[640px] rounded-xl bg-[#FFE5E5] py-3 font-medium text-[#F9595F] active:scale-95 md:font-black"
        @click="deleteSong(videoId)"
      >
        刪除該歌曲
        <div class="mt-1 text-xs text-[#7A3A3A]">從資料庫刪除該歌曲</div>
      </button>
      <a
        :href="`https://www.youtube.com/watch?v=${songData?.id}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex w-full max-w-[640px] flex-col items-center rounded-xl bg-[#FFE5E5] py-3 text-[#F9595F] active:scale-95"
      >
        <div
          class="flex w-full items-center justify-center font-medium md:font-black"
        >
          前往YouTube
          <i class="fa-brands fa-youtube ml-2 text-lg text-[#F9595F]"></i>
        </div>
        <div class="mt-1 text-xs text-[#7A3A3A]">將以新視窗打開外站</div>
      </a>
    </div>

    <!-- 歌曲單字 -->
    <AdminSongEditWord
      v-if="editMode === 'word' && songData"
      :video-id="songData.id"
      :lyrics="songData.lyrics"
      :language="songData.language"
      :words="songData.words || []"
      @go-back="editMode = ''"
    />

    <!-- 編輯時間戳記 -->
    <AdminSongEditTime
      v-if="editMode === 'time' && songData"
      :video-id="songData.id"
      :lyrics="songData.lyrics"
      :language="songData.language"
      @go-back="editMode = ''"
    />

    <!-- 編輯歌詞翻譯 -->
    <AdminSongEditTranslation
      v-if="editMode === 'translation' && songData"
      :video-id="songData.id"
      :lyrics="songData.lyrics"
      :language="songData.language"
      :translation-langs="songData.translation_langs || []"
      @go-back="editMode = ''"
    />
  </div>
</template>
