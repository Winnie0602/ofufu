<script setup lang="ts">
import type {
  MaterialGrammarNote,
  MaterialVocabularyNote,
} from '~/types/material'
import { buildAnnotatedSegments } from '~/utils/annotatedText'

const props = defineProps<{
  /** 純文字含 ruby 括號記法（例：日本[にほん]には…）。 */
  text: string
  /** 本句的可點單字註解。 */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 本句的文法註解。 */
  grammarNotes?: MaterialGrammarNote[]
  showRuby: boolean
}>()

defineEmits<{
  (event: 'selectGrammar', grammarNoteId: string): void
}>()

const spans = computed(() =>
  buildAnnotatedSegments(props.text, {
    // 查字模式（task-008）前的暫時 guard：只讓主打字（featured）產生可點高亮；
    // featured:false 先當純文字顯示（ruby 照常）。做查字模式時改這一行依開關揭露即可，不必改資料。
    vocabularyNotes: props.vocabularyNotes?.filter((note) => note.featured),
    grammarNotes: props.grammarNotes,
  }),
)
</script>

<template>
  <template v-for="(span, index) in spans" :key="index">
    <MaterialsVocabularyPopover
      v-if="span.vocabularyNote"
      :note="span.vocabularyNote"
    >
      <MaterialsRubyText :tokens="span.tokens" :show-ruby="showRuby" />
    </MaterialsVocabularyPopover>
    <button
      v-else-if="span.grammarNote"
      type="button"
      class="inline text-start align-baseline font-medium underline decoration-primary decoration-2 underline-offset-4"
      @click="$emit('selectGrammar', span.grammarNote.id)"
    >
      <MaterialsRubyText :tokens="span.tokens" :show-ruby="showRuby" />
    </button>
    <MaterialsRubyText v-else :tokens="span.tokens" :show-ruby="showRuby" />
  </template>
</template>
