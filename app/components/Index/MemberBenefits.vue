<script setup lang="ts">
const memberBenefits = [
  {
    title: '設定你的日文程度',
    text: '選擇適合的程度，讓 Ofufu 推薦更貼近你的教材。',
    icon: 'icon-[tabler--target-arrow]',
  },
  {
    title: '收藏喜歡的內容',
    text: '把文章、單字與歌曲留下來，之後想複習時更好找。',
    icon: 'icon-[tabler--heart-filled]',
  },
  {
    title: '留下學習紀錄',
    text: '自動記錄你的學習歷程，方便從上次的位置繼續。',
    icon: 'icon-[tabler--calendar-check]',
  },
  {
    title: '記錄測驗結果',
    text: '保存每次測驗成果，慢慢看見自己的進步軌跡。',
    icon: 'icon-[tabler--report-analytics]',
  },
  {
    title: '複習答錯的題目',
    text: '整理還不熟悉的內容，讓複習更有方向。',
    icon: 'icon-[tabler--refresh-dot]',
  },
  {
    title: '跨裝置同步學習',
    text: '登入後手機與電腦都能接續學習，進度不會消失。',
    icon: 'icon-[tabler--devices]',
  },
]
</script>

<template>
  <section
    class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
  >
    <div class="flex items-center">
      <div class="section-title !mb-0">
        <span
          class="icon-[tabler--arrow-badge-right] section-title-icon"
        ></span>
        <h2>登入享專屬學習紀錄</h2>
      </div>
    </div>

    <div class="mt-5 grid gap-3 md:grid-cols-3 md:gap-5">
      <article
        v-for="(benefit, index) in memberBenefits"
        :key="benefit.title"
        class="relative flex min-h-[112px] items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-2 hover:shadow-md md:min-h-[240px] md:flex-col md:justify-center md:p-6 md:text-center"
      >
        <div
          class="text-error/90 bg-error/5 flex size-16 shrink-0 items-center justify-center rounded-full md:size-20"
        >
          <span :class="[benefit.icon, 'size-10 md:size-12']"></span>
        </div>
        <div class="min-w-0 pt-1 md:pt-0">
          <h3 class="text-base font-black text-neutral-950 md:text-lg">
            {{ benefit.title }}
          </h3>
          <p
            class="mt-1 text-sm leading-6 font-medium text-neutral-600 md:mt-3"
          >
            {{ benefit.text }}
          </p>
        </div>
      </article>
    </div>
    <div class="mt-10 flex w-full justify-center">
      <button
        class="btn btn-error btn-wide shadow-error/20 transition duration-200 hover:scale-[1.05] active:scale-100"
      >
        立即登入
      </button>
    </div>
  </section>
</template>
