<script setup lang="ts">
import { materialLevels, type MaterialLevel } from '~/types/material'

defineProps<{
  modelValue: MaterialLevel
}>()

defineEmits<{
  (event: 'update:modelValue', level: MaterialLevel): void
}>()
</script>

<template>
  <div class="join" aria-label="JLPT 程度篩選">
    <button
      v-for="level in materialLevels"
      :key="level"
      type="button"
      class="btn btn-soft btn-sm join-item !rounded-none transition-none"
      :class="
        modelValue === level
          ? 'btn-error bg-error hover:bg-error text-white hover:text-white'
          : 'btn-error text-error hover:bg-error/10 bg-white hover:text-error'
      "
      :aria-pressed="modelValue === level"
      @click="$emit('update:modelValue', level)"
    >
      {{ level === 'all' ? 'All' : level.toUpperCase() }}
    </button>
  </div>
</template>
