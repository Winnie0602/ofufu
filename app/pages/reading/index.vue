<script setup lang="ts">
import { readingMaterials } from '~/data/materials/reading'

useSeoMeta({
  title: '文章閱讀',
  description: '依照 JLPT 程度閱讀日文文章，搭配單字、文法、假名與繁中翻譯學習。',
})
</script>

<template>
  <MaterialsMaterialListing
    title="文章閱讀"
    :description="`依照適合自己的 JLPT 程度閱讀各類文章，\n從文化、生活到科學，用日文探索更多主題。`"
    :items="readingMaterials"
    item-id-prefix="reading-card"
    empty-label="目前沒有這個程度的文章。"
  />
</template>
