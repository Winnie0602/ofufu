// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    mongoURI: process.env.MONGODB_URI || '',
    // 教材資料庫名稱。舊的 karaoke 資料在同一個 instance 的 `karaoke_app`，
    // 由 `connectToDatabase(legacyDbName)` 指定。
    mongoDbName: process.env.MONGODB_DB || 'ofufu',
    // 語音合成的總開關，**預設關閉**：部署站台不設這個變數就打不到 Google TTS，
    // 公開端點不會被陌生人刷成本。本機要用就在 .env 設 `TTS_ENABLED=true`。
    // 關閉時教材頁照常可讀，只有播放鍵會拿到 503。
    ttsEnabled: process.env.TTS_ENABLED === 'true',
    authSecret: process.env.AUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      siteUrl: process.env.APP_URL || 'https://karaoke.zeabur.app',
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  auth: {
    originEnvKey: process.env.APP_URL || 'http://localhost:3000',
    baseURL: process.env.AUTH_ORIGIN || 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
    },
  },
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        },
      ],
    },
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
        flag: '🇺🇸',
      },
      {
        code: 'zh',
        language: 'zh-TW',
        name: '中文',
        file: 'zh.json',
        flag: '🇹🇼',
      },
      {
        code: 'ja',
        language: 'ja-JP',
        name: '日本語',
        file: 'ja.json',
        flag: '🇯🇵',
      },
      {
        code: 'ko',
        language: 'ko-KR',
        name: '한국어',
        file: 'ko.json',
        flag: '🇰🇷',
      },
    ],
    defaultLocale: 'en',
  },
})
