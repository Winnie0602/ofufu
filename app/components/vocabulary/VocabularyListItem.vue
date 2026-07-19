<script setup lang="ts">
import {
  verbGroupLabels,
  vocabularyPartOfSpeechLabels,
  type VocabularyItem,
} from '~/types/vocabulary'

const props = defineProps<{
  item: VocabularyItem
  number: number
  isActive: boolean
  showRuby: boolean
  showLevel: boolean
  audioState: (id: string) => 'idle' | 'loading' | 'playing'
}>()

defineEmits<{
  (event: 'toggle', vocabularyId: string): void
  (event: 'play', payload: { audioId: string; text: string }): void
}>()

const verbGroupLabel = computed(() =>
  props.item.verbGroup ? verbGroupLabels[props.item.verbGroup] : '',
)
</script>

<template>
  <article
    :id="`vocabulary-${item.id}`"
    class="vocabulary-list-item accordion-item --prevent-on-load-init relative overflow-hidden border-b bg-white shadow-none"
    :class="
      isActive
        ? `active rounded-lg border-transparent after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-lg after:border after:border-neutral-200 after:content-['']`
        : 'border-neutral-200'
    "
  >
    <div
      class="accordion-toggle grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-3 py-4 sm:gap-4 sm:px-5"
    >
      <span
        class="mb-0.5 flex size-6 items-center justify-center self-end rounded-full text-xs font-bold"
        :class="
          isActive ? 'bg-primary text-white' : 'bg-primary/5 text-primary'
        "
      >
        {{ number }}
      </span>

      <button
        :id="`vocabulary-${item.id}-toggle`"
        type="button"
        class="flex min-w-0 scroll-mt-[84px] flex-wrap items-end gap-x-4 gap-y-1 text-left"
        :aria-controls="`vocabulary-${item.id}-collapse`"
        :aria-expanded="isActive"
        @click="$emit('toggle', item.id)"
      >
        <span
          class="block min-w-20 text-xl leading-tight font-medium text-neutral-950 sm:text-2xl [&_rt]:text-[0.4em] [&_rt]:leading-none [&_rt]:text-neutral-400"
          :class="{ 'hide-vocabulary-ruby': !showRuby }"
          v-html="item.rubyHtml"
        />
        <span v-if="showLevel" class="mb-0.5 flex shrink-0">
          <span class="badge badge-outline badge-primary badge-sm">
            {{ item.level.toUpperCase() }}
          </span>
        </span>
      </button>

      <AudioButton
        :label="`播放 ${item.word} 讀音`"
        :state="audioState(item.id)"
        @play="$emit('play', { audioId: item.id, text: item.word })"
      />

      <FavoriteButton :label="`收藏 ${item.word}`" :active="isActive" />

      <button
        type="button"
        class="btn btn-circle btn-text btn-sm text-neutral-900"
        :aria-controls="`vocabulary-${item.id}-collapse`"
        :aria-expanded="isActive"
        :aria-label="`${isActive ? '收合' : '展開'} ${item.word}`"
        @click="$emit('toggle', item.id)"
      >
        <span
          class="icon-[tabler--chevron-down] accordion-item-active:hidden size-5 shrink-0"
        />
        <span
          class="icon-[tabler--chevron-up] accordion-item-active:block hidden size-5 shrink-0"
        />
      </button>
    </div>

    <div
      :id="`vocabulary-${item.id}-collapse`"
      class="accordion-content grid w-full overflow-hidden transition-[grid-template-rows,opacity] duration-300"
      :class="
        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      "
      :aria-hidden="!isActive"
      :aria-labelledby="`vocabulary-${item.id}-toggle`"
      role="region"
    >
      <div class="min-h-0 overflow-hidden">
        <div
          class="grid gap-4 px-0 pb-5 sm:px-5 lg:grid-cols-[280px_minmax(0,1fr)]"
        >
          <dl class="space-y-4 px-6 py-2 text-sm sm:px-1">
            <div>
              <dt class="font-bold text-neutral-700">意思</dt>
              <dd class="mt-1 text-neutral-950">{{ item.meaning }}</dd>
            </div>
            <div v-if="item.verbGroup">
              <dt class="font-bold text-neutral-700">動詞分類</dt>
              <dd class="mt-1 text-neutral-950">{{ verbGroupLabel }}</dd>
            </div>
            <div>
              <dt class="sr-only">詞性</dt>
              <dd>
                <span
                  class="badge badge-outline badge-error rounded-sm px-1.5"
                >
                  {{ vocabularyPartOfSpeechLabels[item.partOfSpeech] }}
                </span>
              </dd>
            </div>
          </dl>

          <div class="overflow-hidden bg-white">
            <VocabularyConjugations
              v-if="item.conjugations"
              :conjugations="item.conjugations"
            />

            <section class="px-6 pb-3">
              <div
                class="pt-3"
                :class="{ 'border-t border-neutral-200': item.conjugations }"
              >
                <h3 class="mb-2 text-sm font-bold text-neutral-900">例句</h3>
                <div class="space-y-1.5">
                  <div
                    v-for="example in item.examples"
                    :key="example.id"
                    class="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 py-2"
                  >
                    <div class="min-w-0">
                      <p
                        class="text-[15px] leading-6 font-medium text-neutral-900"
                      >
                        <span
                          v-for="(segment, segmentIndex) in example.segments"
                          :key="`${example.id}-${segmentIndex}`"
                          :class="{
                            'font-bold text-error': segment.highlighted,
                          }"
                        >
                          {{ segment.text }}
                        </span>
                      </p>
                      <p class="mt-1 text-xs leading-5 text-neutral-500">
                        {{ example.translation }}
                      </p>
                    </div>
                    <AudioButton
                      :label="`播放 ${item.word} 例句`"
                      :state="audioState(example.id)"
                      @play="
                        $emit('play', {
                          audioId: example.id,
                          text: example.japanese,
                        })
                      "
                    />
                    <FavoriteButton :label="`收藏 ${item.word} 例句`" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.vocabulary-list-item:has(+ .vocabulary-list-item.active) {
  border-bottom-color: transparent;
}
</style>
