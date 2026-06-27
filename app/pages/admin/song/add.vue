<script setup lang="ts">
import { nanoid } from 'nanoid'

definePageMeta({
  layout: 'no-player',
})

const { signOut } = useAuth()

const router = useRouter()

// 表單資料狀態
const songForm = ref({
  title: '',
  videoId: '',
  language: 'ja', // 預設日文
  artist: '',
  rawLyrics: '', // 存放使用者貼入的文字 (日文：どこかで鐘(かね)が鳴(な)って)
})

const handleLyrics = () => {
  // 分行
  const lines = songForm.value.rawLyrics
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '')

  return lines.map((line) => {
    const obj = {
      nanoid: nanoid(),
      [songForm.value.language]: line,
    }

    return obj
  })
}
const { open } = useCheckConfirm()

// 提交處理
const handleSubmit = async () => {
  // 1. 簡易必填檢查
  const { title, videoId, artist, rawLyrics } = songForm.value
  if (!title || !videoId || !artist || !rawLyrics) {
    await open('所有欄位皆為必填', '', 'noAsk')

    return
  }

  const payload = {
    ...songForm.value,
    lyrics: handleLyrics(),
  }

  const response = await $fetch('/api/song/add', {
    method: 'POST',
    body: { payload },
  })

  if (response.success) {
    await open('新增成功', '', 'noAsk')

    router.push({ path: '/admin/song/list' })
  } else {
    await open('新增失敗', '', 'noAsk')
  }
}

const logout = async () => {
  await signOut()
}
</script>

<template>
  <div
    class="flex w-full flex-col p-2 md:h-[calc(100vh-56px)] md:flex-row md:overflow-hidden md:p-4 lg:p-6"
  >
    <div
      class="mx-auto flex w-full max-w-[1280px] flex-col gap-3 md:flex-row md:gap-4 lg:gap-6"
    >
      <aside class="w-full flex-none md:w-1/5">
        <div
          class="flex flex-col rounded-2xl bg-white p-2 shadow-sm md:h-full md:rounded-3xl md:p-5 md:shadow-xl"
        >
          <div
            class="mb-6 hidden px-2 text-xs font-black tracking-[0.2em] text-[#F9595F] md:block"
          >
            ADMIN PANEL
          </div>

          <nav class="flex flex-row gap-2 md:flex-col">
            <NuxtLink
              to="/admin/song/list"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2 font-bold text-[#A66B6B] transition-all hover:bg-[#FFE5E5] md:justify-start md:rounded-2xl md:px-5 md:py-3"
            >
              <i class="fa-solid fa-layer-group text-xs md:text-sm"></i>
              <span class="text-xs md:text-base">歌曲列表</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/song/add"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F9595F] py-2 font-bold text-white transition-all md:justify-start md:rounded-2xl md:px-5 md:py-3 md:shadow-md md:shadow-red-100"
            >
              <i class="fa-solid fa-plus-circle text-xs md:text-sm"></i>
              <span class="text-xs md:text-base">新增歌曲</span>
            </NuxtLink>
          </nav>

          <div class="mt-auto hidden border-t border-gray-50 pt-4 md:block">
            <button
              class="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-400 hover:text-[#F9595F]"
              @click="logout"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              登出
            </button>
          </div>
        </div>
      </aside>

      <main class="min-h-0 flex-1 overflow-hidden">
        <div
          class="flex h-full flex-col rounded-2xl bg-white shadow-md md:rounded-3xl md:shadow-xl"
        >
          <div
            class="flex items-center justify-between border-b border-gray-50 px-5 py-3 md:px-8 md:py-5"
          >
            <h2 class="text-lg font-bold text-gray-800 md:text-xl">
              新增歌曲資料
            </h2>
            <span
              class="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-[#F9595F] md:px-3 md:py-1 md:text-sm"
            >
              均為必填
            </span>
          </div>

          <div class="no-scrollbar flex-1 overflow-y-auto p-4 md:p-6">
            <div class="mx-auto max-w-3xl space-y-4 md:space-y-6">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div class="space-y-1.5">
                  <label
                    class="ml-1 text-[10px] font-bold tracking-wider text-[#A66B6B] uppercase md:text-sm"
                  >
                    YouTube Video ID *
                  </label>
                  <input
                    v-model="songForm.videoId"
                    type="text"
                    class="w-full rounded-xl bg-[#FFF9F9] px-4 py-2.5 text-sm text-gray-700 ring-2 ring-red-300/30 outline-none focus:ring-red-400 md:py-3 md:text-base"
                    placeholder="例如: dQw4w9WgXcQ"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                    class="ml-1 text-[10px] font-bold tracking-wider text-[#A66B6B] uppercase md:text-sm"
                  >
                    Song Title *
                  </label>
                  <input
                    v-model="songForm.title"
                    type="text"
                    class="w-full rounded-xl bg-[#FFF9F9] px-4 py-2.5 text-sm text-gray-700 ring-2 ring-red-300/30 outline-none focus:ring-red-400 md:py-3 md:text-base"
                    placeholder="輸入歌曲名稱"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                    class="ml-1 text-[10px] font-bold tracking-wider text-[#A66B6B] uppercase md:text-sm"
                  >
                    Artist *
                  </label>
                  <input
                    v-model="songForm.artist"
                    type="text"
                    class="w-full rounded-xl bg-[#FFF9F9] px-4 py-2.5 text-sm text-gray-700 ring-2 ring-red-300/30 outline-none focus:ring-red-400 md:py-3 md:text-base"
                    placeholder="輸入歌手名稱"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                    class="ml-1 text-[10px] font-bold tracking-wider text-[#A66B6B] uppercase md:text-sm"
                  >
                    Language *
                  </label>
                  <select
                    v-model="songForm.language"
                    class="w-full appearance-none rounded-xl bg-[#FFF9F9] px-4 py-2.5 text-sm text-gray-700 ring-2 ring-red-300/30 outline-none md:py-3 md:text-base"
                  >
                    <option value="ja">日本語 (JA)</option>
                    <option value="en">English (EN)</option>
                    <option value="zh">中文 (ZH)</option>
                    <option value="kr">韓文 (KR)</option>
                    <option value="tw">台語 (TW)</option>
                    <option value="hk">廣東話 (HK)</option>
                  </select>
                </div>
              </div>

              <div class="space-y-1.5">
                <div class="ml-1 flex items-center justify-between">
                  <label
                    class="text-[10px] font-bold tracking-wider text-[#A66B6B] uppercase md:text-sm"
                  >
                    Lyrics Content *
                  </label>
                  <span class="text-[10px] text-gray-400 md:text-sm">
                    需手動斷行
                  </span>
                </div>
                <textarea
                  v-model="songForm.rawLyrics"
                  rows="6"
                  class="no-scrollbar w-full rounded-2xl bg-[#FFF9F9] p-4 text-xs leading-relaxed text-gray-700 ring-2 ring-red-300/30 outline-none md:text-sm"
                  placeholder="在此貼上整段歌詞..."
                ></textarea>
              </div>

              <div class="pt-2">
                <button
                  class="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F9595F] py-3.5 font-bold text-white shadow-lg shadow-red-100 transition-all hover:brightness-110 active:scale-[0.98] md:py-4"
                  @click="handleSubmit"
                >
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                  儲存並新增歌曲
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 針對右側捲動區隱藏捲軸 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
