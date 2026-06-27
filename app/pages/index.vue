<script setup lang="ts">
import type { LangCode } from '~/types/lang'

const songsPage = ref(1)
const songListLang = ref<LangCode | 'all'>('en')

const videosPage = ref(1)
const videosLang = ref<LangCode | 'all'>('en')
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home_title'),
  description: () => t('seo.home_description'),
  ogTitle: () => t('seo.home_title'),
  ogDescription: () => t('seo.home_description'),
})

// 1. 歌曲列表
const { data: songListData, pending: songListPending } = await useFetch(
  '/api/list/songs',
  {
    query: {
      language: songListLang,
      page: songsPage,
      sort: 'desc',
      limit: 6,
    },
  },
)

// 2. 輪播資料
const { data: allSongData, pending: allSongPending } = await useFetch(
  '/api/list/songs',
  {
    query: {
      language: 'all',
      sort: 'desc',
      limit: 10,
    },
  },
)

// 3. 影片列表
const { data: videosData, pending: videosPending } = await useFetch(
  '/api/list/videos',
  {
    query: {
      language: videosLang,
      page: videosPage,
      sort: 'desc',
      limit: 5,
    },
  },
)

const handler = (
  component: 'songList' | 'videoList',
  payload: { page?: number; lang?: LangCode },
) => {
  const componentMap = {
    songList: { page: songsPage, lang: songListLang },
    videoList: { page: videosPage, lang: videosLang },
  }

  const target = componentMap[component]
  if (payload.page !== undefined) target.page.value = payload.page
  if (payload.lang !== undefined) target.lang.value = payload.lang
}
</script>

<template>
  <div class="w-full">
    <IndexTopCarousel
      :songs="allSongData?.songs || []"
      :pending="allSongPending"
    />

    <div class="mx-auto my-4 w-full px-4 md:my-8 md:max-w-[1280px] md:px-8">
      <section class="mb-12">
        <IndexSongsList
          :songs="songListData?.songs || []"
          :page="songListData?.page || 1"
          :total-pages="songListData?.totalPages || 1"
          :total="songListData?.total || 0"
          :pending="songListPending"
          @refresh="(payload) => handler('songList', payload)"
        />
      </section>

      <section class="mb-12">
        <IndexVideosList
          :videos="videosData?.videos || []"
          :page="videosData?.page || 1"
          :total-pages="videosData?.totalPages || 1"
          :total="videosData?.total || 0"
          :pending="videosPending"
          @refresh="(payload) => handler('videoList', payload)"
        />
      </section>

      <IndexReadingList />
    </div>
  </div>
</template>
