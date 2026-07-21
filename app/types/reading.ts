import type {
  MaterialGrammarNote,
  MaterialSummary,
  MaterialVocabularyNote,
} from './material'

export type ReadingSentence = {
  id: string
  /** 純文字含 ruby 括號記法（例：日本[にほん]には…）；純日文由 `toPlainJapanese()` 剝括號得到。 */
  text: string
  translation: string
  /** 本句的可點單字註解（stand-off，以 surface 定位）。 */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 本句的文法註解（stand-off，以 anchors 定位）。 */
  grammarNotes?: MaterialGrammarNote[]
}

export type ReadingParagraph = {
  id: string
  sentences: ReadingSentence[]
}

export type ReadingMaterial = MaterialSummary & {
  type: 'reading'
  paragraphs: ReadingParagraph[]
  translation: string[]
}
