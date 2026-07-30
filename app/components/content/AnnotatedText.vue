<script setup lang="ts">
import type {
  MaterialGrammarNote,
  MaterialVocabularyNote,
} from '~/types/material'
import { createAnnotatedSpans } from '~/utils/annotatedText'

const props = defineProps<{
  /** 純文字含 ruby 括號記法（例：日本[にほん]には…）。 */
  text: string
  /** 本句的可點單字註解。 */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 本句的文法註解。 */
  grammarNotes?: MaterialGrammarNote[]
  showRuby: boolean
  /** 顯示重點單字/文法：關＝內文純文字（單字與文法皆不標）；開＝標出重點單字與文法。 */
  lookupMode?: boolean
}>()

const spans = computed(() =>
  createAnnotatedSpans(props.text, {
    // 關閉時內文完全不標記（單字與文法皆不標），只顯示乾淨文章；
    // 開啟時同時揭露重點單字（淡粉底）與文法（primary 淡底）。
    vocabularyNotes: props.lookupMode ? props.vocabularyNotes : undefined,
    grammarNotes: props.lookupMode ? props.grammarNotes : undefined,
  }),
)

// 高亮只套在「底排文字」（見 RubyText.highlightClass），furigana 不上底色，
// 背景高度才會貼字身、行與行不相黏。單字一律淡粉底、文法用 primary 淡底。
const VOCABULARY_HIGHLIGHT = 'rounded-[2px] bg-error/20'
const GRAMMAR_HIGHLIGHT = 'rounded-[2px] bg-primary/20'
</script>

<template>
  <template v-for="(span, index) in spans" :key="index">
    <ContentVocabularyPopover
      v-if="span.vocabularyNote"
      :note="span.vocabularyNote"
    >
      <ContentRubyText
        :tokens="span.tokens"
        :show-ruby="showRuby"
        :highlight-class="VOCABULARY_HIGHLIGHT"
      />
    </ContentVocabularyPopover>
    <ContentGrammarPopover
      v-else-if="span.grammarNote"
      :note="span.grammarNote"
    >
      <ContentRubyText
        :tokens="span.tokens"
        :show-ruby="showRuby"
        :highlight-class="GRAMMAR_HIGHLIGHT"
      />
    </ContentGrammarPopover>
    <ContentRubyText v-else :tokens="span.tokens" :show-ruby="showRuby" />
  </template>
</template>
