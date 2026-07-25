<script setup lang="ts">
import { conversationMaterials } from '~/data/materials/conversation'
import { readingMaterials } from '~/data/materials/reading'
import type { MaterialSummary } from '~/types/material'

const newMaterials: MaterialSummary[] = [
  readingMaterials[0]!,
  conversationMaterials[0]!,
  {
    id: 'Sg8Qm2Vx7LpR',
    type: 'song',
    level: 'n2',
    title: 'Lemon - 米津玄師',
    excerpt: '歌詞に出てくる比喩表現や感情を表す言葉を読み取りながら、日本語のニュアンスを学びます。',
    categories: ['culture'],
    coverImage: null,
  },
  {
    id: 'Gr4Tn9Kp1XcM',
    type: 'grammar',
    level: 'n1',
    title: '〜に至っては',
    excerpt: 'ある話題の中でも特に極端な例を取り上げるときに使う JLPT N1 文法を例文で確認します。',
    categories: [],
    coverImage: null,
  },
  {
    id: 'Vw6Rk3Hq8NsA',
    type: 'vocabulary',
    level: 'n5',
    title: '毎日使う基本動詞',
    excerpt: '行く、見る、食べる、話すなど、日常会話でよく使う基本動詞を短い例文と一緒に覚えます。',
    categories: ['daily'],
    coverImage: null,
  },
]
</script>

<template>
  <section
    class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
  >
    <div class="flex items-center justify-between">
      <div class="section-title !mb-0">
        <span class="icon-[tabler--arrow-badge-right] section-title-icon" />
        <h2>最新教材</h2>
      </div>
      <NuxtLink
        to="/reading"
        class="text-primary hover:text-error flex shrink-0 items-center gap-1 text-sm font-medium tracking-wide transition"
      >
        看更多
        <span class="icon-[tabler--arrow-right] size-3.5" />
      </NuxtLink>
    </div>
    <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <MaterialCard
        v-for="material in newMaterials"
        :key="material.id"
        :material="material"
        :show-categories="false"
      />
    </div>
  </section>
</template>
