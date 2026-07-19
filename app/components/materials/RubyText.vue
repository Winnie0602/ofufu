<script setup lang="ts">
import type { MaterialTextSegment } from '~/types/material'

defineProps<{
  segment: MaterialTextSegment
  showRuby: boolean
}>()
</script>

<template>
  <template v-if="segment.parts">
    <template v-for="(part, index) in segment.parts" :key="`${segment.id}-${index}`">
      <ruby v-if="part.ruby">
        {{ part.text }}
        <rt v-if="showRuby">{{ part.ruby }}</rt>
      </ruby>
      <template v-else>{{ part.text }}</template>
    </template>
  </template>
  <ruby v-else-if="segment.ruby">
    {{ segment.text }}
    <rt v-if="showRuby">{{ segment.ruby }}</rt>
  </ruby>
  <template v-else>{{ segment.text }}</template>
</template>
