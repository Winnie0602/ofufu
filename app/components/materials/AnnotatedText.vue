<script setup lang="ts">
import type {
  MaterialTextSegment,
  MaterialVocabularyNote,
} from '~/types/material'

const props = defineProps<{
  segments: MaterialTextSegment[]
  vocabularyNotes: MaterialVocabularyNote[]
  showRuby: boolean
}>()

defineEmits<{
  (event: 'selectGrammar', grammarNoteId: string): void
}>()

const vocabularyNoteMap = computed(() =>
  new Map(props.vocabularyNotes.map((note) => [note.id, note])),
)
</script>

<template>
  <template v-for="segment in segments" :key="segment.id">
    <MaterialsVocabularyPopover
      v-if="segment.vocabularyNoteId && vocabularyNoteMap.get(segment.vocabularyNoteId)"
      :note="vocabularyNoteMap.get(segment.vocabularyNoteId)!"
    >
      <MaterialsRubyText :segment="segment" :show-ruby="showRuby" />
    </MaterialsVocabularyPopover>
    <button
      v-else-if="segment.grammarNoteId"
      type="button"
      class="font-medium underline decoration-primary decoration-2 underline-offset-4"
      @click="$emit('selectGrammar', segment.grammarNoteId)"
    >
      <MaterialsRubyText :segment="segment" :show-ruby="showRuby" />
    </button>
    <MaterialsRubyText v-else :segment="segment" :show-ruby="showRuby" />
  </template>
</template>
