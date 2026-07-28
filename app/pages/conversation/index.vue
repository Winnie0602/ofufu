<script setup lang="ts">
useSeoMeta({
  title: '對話學習',
  description: '依照 JLPT 程度練習不同生活情境的日文角色對話。',
})
</script>

<template>
  <MaterialListing
    title="對話學習"
    :description="`從餐廳、旅行到職場，跟著角色練習自然對話，\n搭配逐句翻譯與發音，累積實際溝通能力。`"
    endpoint="/api/materials/conversation"
    item-id-prefix="conversation-card"
    empty-label="目前沒有這個程度的對話。"
  />
</template>
