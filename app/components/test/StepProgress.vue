<script setup lang="ts">
const { step } = defineProps<{ step: 1 | 2 | 3 | 4 }>()

const steps = [1, 2, 3, 4] as const

const stepConfig = {
  1: {
    titleKey: 'test_step.selectQuizType',
  },
  2: {
    titleKey: 'test_step.selectLyrics',
  },
  3: {
    titleKey: 'test_step.startTest',
  },
  4: {
    titleKey: 'test_step.review',
  },
} as const
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-4 md:px-0">
    <div class="hidden items-center justify-between gap-4 text-sm md:flex">
      <template v-for="(s, index) in steps" :key="s">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <div
            class="relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-150"
            :class="
              s <= step
                ? 'bg-[#F9595F] text-white'
                : 'bg-[#FFE5E5] text-[#A66B6B]'
            "
          >
            {{ s }}
            <span
              v-if="s === step"
              class="absolute inset-0 rounded-full shadow-[0_0_0_6px_rgba(249,89,95,0.18)]"
            />
          </div>
          <span
            class="font-medium transition-colors duration-150"
            :class="s === step ? 'text-[#7A3A3A]' : 'text-[#B58C8C]'"
          >
            {{ $t(stepConfig[s].titleKey) }}
          </span>
        </div>
        <span v-if="index !== 3" class="mx-2 text-[#E4BABA] select-none">
          —
        </span>
      </template>
    </div>

    <div class="flex items-center justify-between gap-2 md:hidden">
      <template v-for="(s, index) in steps" :key="s">
        <div
          class="flex items-center"
          :class="s === step ? 'flex-[2]' : 'flex-none'"
        >
          <div class="flex items-center gap-2">
            <div
              class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300"
              :class="
                s <= step
                  ? 'bg-[#F9595F] text-white'
                  : 'bg-[#FFE5E5] text-[#A66B6B]'
              "
            >
              {{ s }}
              <span
                v-if="s === step"
                class="absolute inset-0 rounded-full shadow-[0_0_0_4px_rgba(249,89,95,0.18)]"
              />
            </div>

            <span
              v-if="s === step"
              class="text-xs font-bold whitespace-nowrap text-[#7A3A3A] transition-opacity duration-300"
            >
              {{ $t(stepConfig[s].titleKey) }}
            </span>
          </div>
        </div>

        <div v-if="index !== 3" class="mx-1 h-px flex-1 bg-[#E4BABA]/40"></div>
      </template>
    </div>
  </div>
</template>
