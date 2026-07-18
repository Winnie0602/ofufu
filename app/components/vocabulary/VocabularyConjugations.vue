<script setup lang="ts">
import type { VocabularyConjugations } from '~/types/vocabulary'

defineProps<{
  conjugations: VocabularyConjugations
}>()

const sections = [
  {
    id: 'basic',
    title: '基本活用',
    forms: [
      { label: '辭書形', key: 'dictionary' },
      { label: 'ます形', key: 'polite' },
      { label: 'ない形', key: 'negative' },
      { label: 'て形', key: 'te' },
      { label: 'た形', key: 'past' },
    ],
  },
  {
    id: 'advanced',
    title: '進階活用',
    forms: [
      { label: '可能形', key: 'potential' },
      { label: '被動形', key: 'passive' },
      { label: '使役形', key: 'causative' },
      { label: '使役被動形', key: 'causativePassive' },
      { label: '命令形', key: 'imperative' },
      { label: '意向形', key: 'volitional' },
      { label: 'ば條件形', key: 'conditionalBa' },
      { label: 'たら條件形', key: 'conditionalTara' },
    ],
  },
] as const

const openSections = reactive<Record<(typeof sections)[number]['id'], boolean>>(
  {
    basic: true,
    advanced: false,
  },
)
</script>

<template>
  <div class="mx-6 divide-y divide-neutral-200">
    <section
      v-for="section in sections"
      :key="section.id"
      class="overflow-hidden bg-white"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-neutral-900"
        :aria-expanded="openSections[section.id]"
        @click="openSections[section.id] = !openSections[section.id]"
      >
        {{ section.title }}
        <span
          class="icon-[tabler--chevron-down] size-4 transition-transform"
          :class="{ 'rotate-180': openSections[section.id] }"
        />
      </button>

      <div
        class="grid transition-[grid-template-rows] duration-300"
        :class="
          openSections[section.id] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        "
      >
        <div class="min-h-0 overflow-hidden">
          <div
            class="border-base-content/25 mb-4 w-full overflow-hidden rounded-lg border"
          >
            <div class="overflow-x-auto">
              <table class="table min-w-max sm:min-w-full">
                <thead class="bg-error/10 text-neutral-700">
                  <tr>
                    <th v-for="form in section.forms" :key="form.key">
                      {{ form.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="form in section.forms" :key="form.key">
                      {{ conjugations[form.key] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
