<script setup lang="ts">
import type { RubyToken } from '~/types/material'

defineProps<{
  tokens: RubyToken[]
  showRuby: boolean
}>()
</script>

<template>
  <template v-for="(token, index) in tokens" :key="index">
    <ruby v-if="token.ruby">
      {{ token.text }}
      <rt v-if="showRuby">{{ token.ruby }}</rt>
    </ruby>
    <template v-else>{{ token.text }}</template>
  </template>
</template>
