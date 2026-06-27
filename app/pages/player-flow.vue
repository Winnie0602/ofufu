<script setup lang="ts">
definePageMeta({
  layout: 'no-player',
})

useSeoMeta({
  title: 'Player Flow',
  description: 'Karaoke Lab player flow overview',
})

const techStackGroups = [
  {
    title: '核心框架',
    items: ['Nuxt 4', 'Vue 3', 'TypeScript'],
  },
  {
    title: '狀態管理',
    items: ['Pinia', 'pinia-plugin-persistedstate'],
  },
  {
    title: '多國語言',
    items: ['@nuxtjs/i18n', '多語seo metadata'],
  },
  {
    title: '第三方服務',
    items: ['YouTube Iframe API', 'Tatoeba API', 'Google Cloud TTS'],
  },
  {
    title: '資料與後端',
    items: ['MongoDB', 'Nuxt server routes', 'sidebase/nuxt-auth'],
  },
  {
    title: '介面與互動',
    items: ['Tailwind CSS', 'Headless UI', 'lodash-es throttle'],
  },
]

const dataFlowDiagram = [
  {
    title: 'route / middleware',
    desc: '根據要前往的頁面，設定播放模式為 "normal" 或 "test"',
    color: 'bg-[#FDE7E7] text-[#7A3A3A]',
  },
  {
    title: 'page',
    desc: '根據網址參數，把這一頁要播的影片 id 寫進 store。',
    color: 'bg-[#FFF3E2] text-[#7A3A3A]',
  },
  {
    title: 'store',
    desc: '保存共享狀態，讓不同頁面和元件共用同一份播放資訊。',
    color: 'bg-[#F9EED7] text-[#7A3A3A]',
  },
  {
    title: 'useYoutubePlayer',
    desc: '監聽 store，把狀態轉成真正的 YouTube API 行為。',
    color: 'bg-[#F3DDD0] text-[#7A3A3A]',
  },
  {
    title: 'YT Player 實體',
    desc: '真正播放影片，並把播放狀態回寫到 store',
    color: 'bg-[#ECD7CE] text-[#7A3A3A]',
  },
]

const highlightDiagram = [
  {
    title: '架構',
    items: [
      'middleware / page / store / composable 分層',
      '一般播放與測驗播放使用不同狀態',
    ],
    color: 'bg-[#FDE7E7]',
  },
  {
    title: '效能',
    items: [
      'YouTube API lazy load',
      '歌詞二分搜尋',
      '進度條拖曳節流 throttle',
      '快取 API 結果，減少重複呼叫',
      'TTS 語音避免短時間重複請求',
    ],
    color: 'bg-[#FFF3E2]',
  },
  {
    title: '體驗',
    items: ['播放器狀態持久化', '跨頁播放不被中斷', '多語 SEO metadata'],
    color: 'bg-[#F9EED7]',
  },
]

const uiStoreYtLoop = [
  {
    title: 'UI 發出操作',
    desc: '使用者點擊播放、拖曳進度條、點歌詞',
    color: 'bg-[#FDE7E7]',
  },
  {
    title: 'store 接收意圖',
    desc: '更新 isPlaying、seekToTime、playbackRate 等狀態',
    color: 'bg-[#FFF3E2]',
  },
  {
    title: 'useYoutubePlayer 執行',
    desc: '監聽 store，呼叫 playVideo、pauseVideo、seekTo、loadVideoById',
    color: 'bg-[#F9EED7]',
  },
  {
    title: 'YT player 回寫',
    desc: '把 currentTime、duration、playing state 再同步回 store',
    color: 'bg-[#F3DDD0]',
  },
  {
    title: 'UI 重新渲染',
    desc: '歌詞高亮、進度條、播放鍵圖示、速度選單一起更新',
    color: 'bg-[#ECD7CE]',
  },
]
</script>

<template>
  <div
    class="min-h-screen bg-[linear-gradient(180deg,#fff7f5_0%,#f8ece9_100%)]"
  >
    <div class="mx-auto max-w-[1520px] px-4 py-8 md:px-8 md:py-12">
      <section class="mb-8">
        <h1 class="text-3xl font-black text-[#7A3A3A] md:text-5xl">
          Karaoke Lab 播放器設計＆介紹
        </h1>
      </section>

      <section
        class="mb-10 rounded-[28px] border border-[#E8D2CB] bg-white p-6 shadow-sm md:p-8"
      >
        <h2 class="mb-5 text-2xl font-black text-[#7A3A3A]">頁面架構圖</h2>
        <div class="grid gap-6 xl:grid-cols-2">
          <div class="rounded-[24px] bg-[#FFF7F4] p-5 ring-1 ring-[#E8D2CB]">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <div class="text-xs font-bold tracking-[0.2em] text-[#A66B6B]">
                  FRONTEND
                </div>
                <div class="mt-2 text-2xl font-black text-[#7A3A3A]">前台</div>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <div
                class="rounded-[24px] bg-[#F6E6E1] px-4 py-5 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-lg font-black">首頁</div>
                <div class="mt-1 text-sm font-bold opacity-80">/</div>
                <div class="mt-3 text-sm opacity-80">
                  網站入口，顯示輪播、歌曲列表、影片列表與閱讀區塊
                </div>
              </div>

              <div
                class="rounded-[24px] bg-[#FDE7E7] px-4 py-5 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-lg font-black">歌曲頁</div>
                <div class="mt-1 text-sm font-bold opacity-80">/song/[id]</div>
                <div class="mt-3 text-sm opacity-80">
                  聽歌、看歌詞、看翻譯、學單字
                </div>
              </div>

              <div
                class="rounded-[24px] bg-[#FFF3E2] px-4 py-5 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-lg font-black">測驗頁</div>
                <div class="mt-1 text-sm font-bold opacity-80">
                  /song/test/[id]
                </div>
                <div class="mt-3 text-sm opacity-80">
                  把歌詞轉成互動題目流程
                </div>
              </div>
            </div>

            <div class="my-4 text-center text-3xl font-black text-[#A66B6B]">
              ↓
            </div>

            <div
              class="rounded-[24px] bg-[#E9D8D2] px-5 py-4 text-center text-[#7A3A3A] shadow-sm"
            >
              <div class="text-xs font-bold tracking-[0.2em] text-[#7A3A3A]/60">
                SHARED
              </div>
              <div class="mt-2 text-2xl font-black">共用全站播放器</div>
              <div
                class="mt-3 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"
              >
                <div
                  class="rounded-2xl bg-white/70 px-4 py-3 text-sm text-[#7A3A3A]"
                >
                  videoid
                  <div class="mt-1 font-bold">首頁 / 歌曲頁</div>
                </div>
                <div class="text-2xl font-black text-[#7A3A3A]/70">|</div>
                <div
                  class="rounded-2xl bg-white/70 px-4 py-3 text-sm text-[#7A3A3A]"
                >
                  test_videoid
                  <div class="mt-1 font-bold">測驗頁</div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-[24px] bg-[#FFF7F4] p-5 ring-1 ring-[#E8D2CB]">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <div class="text-xs font-bold tracking-[0.2em] text-[#A66B6B]">
                  ADMIN
                </div>
                <div class="mt-2 text-2xl font-black text-[#7A3A3A]">後台</div>
              </div>
            </div>

            <div class="grid justify-items-end gap-3 md:grid-cols-4">
              <div
                class="w-full max-w-[155px] rounded-[20px] bg-[#F9EED7] px-3 py-4 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-base font-black">Admin 登入頁</div>
                <div class="mt-1 text-xs font-bold opacity-80">
                  /admin/login
                </div>
                <div class="mt-2 text-xs opacity-80">管理者登入入口</div>
              </div>

              <div
                class="w-full max-w-[155px] rounded-[20px] bg-[#F3DDD0] px-3 py-4 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-base font-black">歌曲列表管理</div>
                <div class="mt-1 text-xs font-bold opacity-80">
                  /admin/song/list
                </div>
                <div class="mt-2 text-xs opacity-80">
                  查看所有歌曲與管理狀態
                </div>
              </div>

              <div
                class="w-full max-w-[155px] rounded-[20px] bg-[#ECD7CE] px-3 py-4 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-base font-black">新增歌曲</div>
                <div class="mt-1 text-xs font-bold opacity-80">
                  /admin/song/add
                </div>
                <div class="mt-2 text-xs opacity-80">
                  新增歌曲資料與初始內容
                </div>
              </div>

              <div
                class="w-full max-w-[155px] rounded-[20px] bg-[#FFEFEA] px-3 py-4 text-[#7A3A3A] shadow-sm"
              >
                <div class="text-base font-black">編輯歌曲</div>
                <div class="mt-1 text-xs font-bold opacity-80">
                  /admin/song/edit/[id]
                </div>
                <div class="mt-2 text-xs opacity-80">
                  管理翻譯、時間戳記與單字
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="mt-12 mb-10 rounded-[28px] border border-[#E8D2CB] bg-white p-6 shadow-sm md:p-8"
      >
        <h2 class="mb-5 text-2xl font-black text-[#7A3A3A]">
          播放器整體資料流圖
        </h2>
        <div class="overflow-x-auto pb-2">
          <div class="mx-auto min-w-[1180px] space-y-6">
            <div class="p-4">
              <div
                class="mb-4 text-sm font-bold tracking-[0.18em] text-[#A66B6B]"
              >
                更換影片流程
              </div>
              <div class="flex items-start gap-4">
                <div
                  v-for="(item, index) in dataFlowDiagram"
                  :key="`merged-init-${item.title}`"
                  class="flex items-center gap-4"
                >
                  <div
                    class="w-[200px] rounded-[24px] px-4 py-5 shadow-sm"
                    :class="item.color"
                  >
                    <div class="text-xs font-bold tracking-[0.2em] opacity-70">
                      STEP {{ index + 1 }}
                    </div>
                    <div class="mt-2 text-xl font-black">{{ item.title }}</div>
                    <div class="mt-2 text-sm opacity-80">{{ item.desc }}</div>
                  </div>
                  <div
                    v-if="index !== dataFlowDiagram.length - 1"
                    class="text-3xl font-black text-[#A66B6B]"
                  >
                    →
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div
                class="mb-4 text-sm font-bold tracking-[0.18em] text-[#A66B6B]"
              >
                UI播放器互動流程
              </div>
              <div class="flex items-start gap-4">
                <div
                  v-for="(item, index) in uiStoreYtLoop"
                  :key="`merged-loop-${item.title}`"
                  class="flex items-center gap-4"
                >
                  <div
                    class="w-[200px] rounded-[24px] p-5 shadow-sm"
                    :class="item.color"
                  >
                    <div
                      class="text-xs font-bold tracking-[0.2em] text-[#A66B6B]"
                    >
                      LOOP {{ index + 1 }}
                    </div>
                    <div class="mt-2 text-xl font-black text-[#7A3A3A]">
                      {{ item.title }}
                    </div>
                    <div class="mt-3 text-sm leading-6 text-[#7A3A3A]/80">
                      {{ item.desc }}
                    </div>
                  </div>
                  <div
                    v-if="index !== uiStoreYtLoop.length - 1"
                    class="text-3xl font-black text-[#A66B6B]"
                  >
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="my-10 rounded-[28px] border border-[#E8D2CB] bg-white p-6 shadow-sm md:p-8"
      >
        <h2 class="mb-5 text-2xl font-black text-[#7A3A3A]">技術＆套件</h2>
        <div class="grid gap-5 xl:grid-cols-3">
          <article
            v-for="group in techStackGroups"
            :key="group.title"
            class="rounded-[24px] bg-[#FFF7F4] p-5"
          >
            <h3 class="mb-4 text-xl font-black text-[#7A3A3A]">
              {{ group.title }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#7A3A3A] ring-1 ring-[#E8D2CB]"
              >
                {{ item }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section
        class="mt-12 rounded-[28px] border border-[#E8D2CB] bg-white p-6 shadow-sm md:p-8"
      >
        <h2 class="mb-5 text-2xl font-black text-[#7A3A3A]">亮點優化</h2>
        <div class="grid gap-4 xl:grid-cols-4">
          <div
            v-for="group in highlightDiagram"
            :key="group.title"
            class="rounded-[24px] p-5 shadow-sm"
            :class="group.color"
          >
            <div class="text-xs font-bold tracking-[0.2em] text-[#A66B6B]">
              HIGHLIGHT
            </div>
            <div class="mt-2 text-xl font-black text-[#7A3A3A]">
              {{ group.title }}
            </div>
            <div class="mt-4 space-y-2">
              <div
                v-for="item in group.items"
                :key="item"
                class="rounded-xl bg-white/80 px-3 py-2 text-sm text-[#7A3A3A]"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
