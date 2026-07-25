<script setup lang="ts">
import type { Tab } from '~/types/lang'
import { languageMapCode } from '~/types/lang'

const tabs = Object.keys(languageMapCode) as Tab[]
const nowTab = ref<Tab>('English')
</script>

<template>
  <div class="mb-8 md:mb-20">
    <!-- Tab -->
    <div
      class="flex flex-col justify-between border-b-2 border-[#F9595F]/40 md:flex-row md:items-end"
    >
      <!-- Title -->
      <div
        class="mb-2 text-3xl font-semibold tracking-wide text-[#A66B6B] md:mb-0 md:text-[36px]"
      >
        {{ $t('reading') }}
      </div>

      <!-- Language Tabs -->
      <div class="md:text-md flex items-end space-x-1 text-[13px]">
        <div v-for="tab in tabs" :key="tab">
          <!-- Active -->
          <div
            v-if="nowTab === tab"
            class="relative -mb-[2px] rounded-t-lg border-2 border-b-0 border-[#F9595F] bg-white px-2 py-2 font-medium text-[#F9595F] shadow-sm md:px-4"
          >
            {{ tab }}
          </div>

          <!-- Inactive -->
          <div
            v-else
            class="cursor-pointer rounded-t-lg px-2 py-2 text-[#A66B6B] transition-all duration-150 hover:bg-[#FFE5E5]/60 hover:text-[#F9595F] md:px-4"
            @click="nowTab = tab"
          >
            {{ tab }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex w-full items-center justify-center py-32 text-[#5A3E3E] md:py-60"
    >
      <h2 class="text-2xl font-light tracking-[0.4em] md:text-4xl">
        COMING
        <span class="font-bold text-[#F9595F]">SOON</span>
      </h2>

      <div class="mt-4 flex gap-1.5 opacity-30">
        <div class="h-1 w-1 rounded-full bg-[#5A3E3E]"></div>
        <div class="h-1 w-1 rounded-full bg-[#5A3E3E]"></div>
        <div class="h-1 w-1 rounded-full bg-[#5A3E3E]"></div>
      </div>
    </div>
  </div>
</template>
