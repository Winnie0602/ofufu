<script setup lang="ts">
const { isModalOpen, title, content, type, confirm, cancel } = useCheckConfirm()
const { locale } = useI18n()
const config = useRuntimeConfig()
const siteName = 'Karaoke Lab'
const siteUrl = config.public.siteUrl.replace(/\/+$/, '')

useHead(() => ({
  // Google Search Console 驗證碼
  meta: [
    {
      name: 'google-site-verification',
      content: '6RsNwJZO2CDZVdTuNStgFJSVffmaEYMqij35P0UKaps',
    },
  ],
  // 設定 HTML 的 lang 屬性
  htmlAttrs: {
    lang: locale.value,
  },
  // 動態設定頁面標題，根據當前路由或內容變化
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${siteName}` : siteName
  },
}))

useSeoMeta({
  ogSiteName: siteName,
  ogImage: `${siteUrl}/og-img.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-img.png`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Teleport to="body">
    <Toast />
    <ConfirmModal
      :open="isModalOpen"
      :title="title"
      :content="content"
      :type="type"
      @confirm="confirm"
      @close="cancel"
    />
  </Teleport>
</template>
