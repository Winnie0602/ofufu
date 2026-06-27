// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    mongoURI: process.env.MONGODB_URI || '',
    authSecret: process.env.AUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      siteUrl: process.env.APP_URL || 'https://karaoke.zeabur.app',
    },
  },
  css: ['~/assets/css/main.css'],
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
