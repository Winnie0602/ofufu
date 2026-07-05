<script setup lang="ts">
const newMaterials = [
  {
    type: '閱讀',
    level: 'N3',
    title: '日本の四季を楽しもう',
    subtitle:
      '春の桜、夏祭り、秋の紅葉、冬の雪景色など、日本の季節ごとの楽しみ方を紹介します。',
    videoId: 'ysz5S6PUM-U',
  },
  {
    type: '對話',
    level: 'N4',
    title: 'カフェでの会話',
    subtitle:
      '注文するとき、友達と話すとき、店員さんに質問するときに使える自然な表現を練習します。',
    videoId: 'p1JPKLa-Ofc',
  },
  {
    type: '歌詞',
    level: 'N2',
    title: 'Lemon - 米津玄師',
    subtitle:
      '歌詞に出てくる比喩表現や感情を表す言葉を読み取りながら、日本語のニュアンスを学びます。',
    videoId: 'SX_ViT4Ra7k',
  },
  {
    type: '文法',
    level: 'N1',
    title: '〜に至っては',
    subtitle:
      'ある話題の中でも特に極端な例を取り上げるときに使う JLPT N1 文法を例文で確認します。',
    videoId: 'QvY5qN7CE3M',
  },
  {
    type: '單字',
    level: 'N5',
    title: '毎日使う基本動詞',
    subtitle:
      '行く、見る、食べる、話すなど、日常会話でよく使う基本動詞を短い例文と一緒に覚えます。',
    videoId: 'T0qagA4_eVQ',
  },
]
</script>

<template>
  <section
    class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
  >
    <div class="flex items-center justify-between">
      <div class="section-title !mb-0">
        <span
          class="icon-[tabler--arrow-badge-right] section-title-icon"
        ></span>
        <h2>最新教材</h2>
      </div>
      <button
        type="button"
        class="text-primary hover:text-error flex shrink-0 items-center gap-1 text-sm font-medium tracking-wide transition"
      >
        看更多
        <span class="icon-[tabler--arrow-right] size-3.5"></span>
      </button>
    </div>
    <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <article
        v-for="material in newMaterials"
        :key="material.title"
        class="group border-primary/10 relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
      >
        <button
          type="button"
          class="btn btn-circle btn-sm border-error/20 text-error hover:border-error hover:bg-error absolute top-3 right-3 z-20 border bg-white shadow-sm transition hover:text-white"
          aria-label="收藏教材"
        >
          <span class="icon-[tabler--heart] size-4"></span>
        </button>
        <div
          class="relative aspect-video w-full overflow-hidden bg-neutral-100"
        >
          <div
            v-if="material.type === '文法'"
            class="flex h-full w-full items-center justify-center bg-white px-5 text-center"
          >
            <span
              class="text-xl leading-tight font-black break-words text-neutral-950 md:text-2xl"
            >
              {{ material.title }}
            </span>
          </div>
          <template v-else>
            <img
              :src="`https://img.youtube.com/vi/${material.videoId}/mqdefault.jpg`"
              :alt="material.title"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
          </template>
        </div>
        <div class="flex flex-1 flex-col p-3">
          <h3
            class="group-hover:text-primary line-clamp-1 text-sm font-black text-neutral-900 transition md:text-base"
          >
            {{ material.title }}
          </h3>
          <p
            class="mt-2 line-clamp-2 min-h-[2.6rem] text-xs leading-relaxed font-semibold text-neutral-500"
          >
            {{ material.subtitle }}
          </p>
          <div
            class="mt-auto flex items-center justify-between gap-3 border-t border-neutral-100 pt-3"
          >
            <div class="flex min-w-0 flex-wrap items-center gap-2">
              <span
                class="badge badge-outline badge-primary rounded-full px-3 text-[11px] font-black"
              >
                {{ material.type }}
              </span>
              <span
                class="badge badge-outline badge-error rounded-full px-3 text-[11px] font-black"
              >
                {{ material.level }}
              </span>
            </div>
            <button
              type="button"
              class="text-primary hover:text-error flex shrink-0 items-center gap-1 text-[11px] font-black tracking-wide transition"
            >
              READ
              <span class="icon-[tabler--arrow-right] size-3.5"></span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
