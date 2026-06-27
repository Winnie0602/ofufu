<script setup lang="ts">
import Pagination from '~/components/global/Pagination.vue'
import type { LangCode } from '~/types/lang'

definePageMeta({
  layout: 'no-player',
})

const { signOut } = useAuth()

const { open } = useCheckConfirm()

const page = ref(1)

const selectLang = ref<LangCode | 'all'>('all')

const { data, refresh, pending } = await useFetch('/api/list/songs', {
  query: {
    language: selectLang,
    page,
    sort: 'desc',
  },
})

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

const logout = async () => {
  await signOut()
}
</script>

<template>
  <div class="flex h-[calc(100vh-56px)] w-full overflow-hidden p-4 lg:p-6">
    <div
      class="mx-auto flex w-full max-w-[1280px] flex-col gap-4 md:flex-row lg:gap-6"
    >
      <aside class="w-full flex-none md:w-1/5">
        <div
          class="flex h-full flex-col rounded-3xl bg-white md:p-5 md:shadow-xl"
        >
          <div
            class="mb-6 hidden px-2 text-xs font-black tracking-[0.2em] text-[#F9595F] md:block"
          >
            ADMIN PANEL
          </div>

          <nav class="flex flex-row gap-2 md:flex-col">
            <NuxtLink
              to="/admin/song/list"
              class="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#F9595F] py-3 font-bold text-white transition-all md:justify-start md:px-5 md:shadow-md md:shadow-red-100"
            >
              <i class="fa-solid fa-layer-group text-sm"></i>
              <span class="text-sm md:text-base">歌曲列表</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/song/add"
              class="flex flex-1 items-center justify-center gap-3 rounded-2xl py-3 font-bold text-[#A66B6B] transition-all hover:bg-[#FFE5E5] md:justify-start md:px-5"
            >
              <i class="fa-solid fa-plus-circle text-sm"></i>
              <span class="text-sm md:text-base">新增歌曲</span>
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

      <main class="min-h-0 flex-1">
        <div class="flex h-full flex-col rounded-3xl bg-white shadow-xl">
          <div
            class="flex items-center justify-between border-b border-gray-50 px-8 pt-5"
          >
            <h2
              class="text-lg font-medium text-gray-800 md:text-xl md:font-bold"
            >
              歌曲管理
            </h2>
            <span
              class="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#F9595F]"
            >
              {{ data?.total || 0 }} Items
            </span>
          </div>

          <div class="no-scrollbar flex-1 overflow-y-auto px-3 md:px-6">
            <div class="flex flex-col items-center justify-center px-4 pt-3">
              <!-- <div
                class="mb-2 flex h-[35px] w-full items-center gap-3 rounded-full md:h-[50px]"
              >
                <i
                  class="fa-solid fa-magnifying-glass text-lg text-[#F9595F]"
                ></i>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search ..."
                  class="h-full w-full rounded-xl border-4 border-[#FFE5E5] bg-white px-4 text-sm text-gray-700 transition-colors outline-none placeholder:text-gray-400 focus:border-[#F9595F]/30 md:text-base"
                />
                <button
                  v-if="searchQuery"
                  class="text-gray-400 hover:text-[#F9595F]"
                  @click="searchQuery = ''"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </div> -->
              <Pagination
                :total="data?.total || 0"
                :page="page"
                :total-pages="data?.totalPages || 0"
                @update-page="(newPage) => (page = newPage)"
              />
            </div>
            <div v-if="!pending && data?.songs" class="grid md:gap-3">
              <div
                v-for="song in data.songs"
                :key="song.id"
                class="flex items-center justify-between border-b-[1px] border-gray-300 bg-white px-1 py-3 shadow-sm md:px-4"
              >
                <div class="flex items-center gap-3 md:gap-4">
                  <div
                    class="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-xl bg-[#FFF9F9] text-[#F9595F] md:h-12 md:w-12"
                  >
                    <img
                      v-if="song.id"
                      :src="`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`"
                      alt="thumbnail"
                      class="h-full w-full object-cover"
                    />

                    <i v-else class="fa-solid fa-music"></i>
                  </div>
                  <div class="min-w-0">
                    <div
                      class="line-clamp-1 truncate text-sm font-medium text-gray-800 md:text-base"
                    >
                      {{ song.title }}
                    </div>
                    <div class="line-clamp-1 truncate text-xs text-gray-400">
                      {{ song.artist }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <NuxtLink
                    :to="`/admin/song/edit/${song.id}`"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition hover:bg-[#F9595F] hover:text-white md:h-9 md:w-9"
                  >
                    <i class="fa-solid fa-pen-to-square text-sm"></i>
                  </NuxtLink>
                  <button
                    class="h-6 w-6 rounded-lg bg-gray-50 text-gray-400 transition hover:bg-red-500 hover:text-white md:h-9 md:w-9"
                    @click="deleteSong(song.id)"
                  >
                    <i class="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center gap-3 py-20"
            >
              <div
                class="h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-[#F9595F]"
              ></div>
              <span class="text-sm font-medium tracking-widest text-gray-400">
                LOADING ...
              </span>
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
