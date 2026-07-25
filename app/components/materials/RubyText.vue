<script setup lang="ts">
import type { RubyToken } from '~/types/material'

defineProps<{
  tokens: RubyToken[]
  showRuby: boolean
  /**
   * 套在「底排文字」上的高亮樣式（查字模式的單字標記）；**不含 furigana**，
   * 讓 furigana 浮在背景外、背景高度只貼合漢字與假名，避免行與行的螢光筆相黏。
   */
  highlightClass?: string
}>()
</script>

<template>
  <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
  <template v-for="(token, index) in tokens" :key="index"><ruby v-if="token.ruby"><span :class="highlightClass">{{ token.text }}</span><rt
        v-if="showRuby"
        class="text-[calc(0.4em+1px)] leading-none text-neutral-500"
      >{{ token.ruby }}</rt></ruby><span v-else :class="highlightClass">{{ token.text }}</span></template>
</template>
