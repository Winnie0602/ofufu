import type {
  MaterialGrammarNote,
  MaterialSummary,
  MaterialTextSegment,
  MaterialVocabularyNote,
} from './material'

export type ReadingSentence = {
  id: string
  japanese: string
  translation: string
  segments: MaterialTextSegment[]
}

export type ReadingParagraph = {
  id: string
  sentences: ReadingSentence[]
}

export type ReadingMaterial = MaterialSummary & {
  type: 'reading'
  paragraphs: ReadingParagraph[]
  translation: string[]
  vocabularyNotes: MaterialVocabularyNote[]
  grammarNotes: MaterialGrammarNote[]
}
