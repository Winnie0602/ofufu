import type {
  MaterialGrammarNote,
  MaterialSummary,
  MaterialVocabularyNote,
} from './material'

/**
 * 閱讀教材的一句話。句子是閱讀教材的最小單位——翻譯、單字、文法、語音都掛在這一層。
 */
export type ReadingSentence = {
  id: string
  /**
   * 日文原文，假名用括號記法寫在漢字後面：
   *
   *   '私[わたし]は毎週[まいしゅう]、公園[こうえん]を散歩[さんぽ]します。'
   *
   * 存的是這個帶括號的版本，不是剝乾淨的純文字。要純日文（例如餵給 TTS）時
   * 呼叫 `toPlainJapanese()` 現場剝掉。
   */
  text: string
  /** 這一句的中文翻譯。單句模式下逐句顯示，可以被遮起來讓使用者先自己想。 */
  translation: string
  /**
   * 這句裡要標成可點的重點單字。註解與內文分開存，`text` 本身不含任何標記，
   * 靠註解裡的 `surface` 字串回頭到 `text` 找位置。
   * 這句沒有重點單字就不用寫。
   */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 同上，這句裡要標的文法。定位用 `anchors`，可以一則文法標在句中好幾個地方。 */
  grammarNotes?: MaterialGrammarNote[]
}

/** 一個段落，就是一組句子。段落是「整篇模式」的排版與翻譯單位。 */
export type ReadingParagraph = {
  id: string
  sentences: ReadingSentence[]
}

/**
 * 一篇閱讀教材。共用欄位（標題、程度、封面⋯）繼承自 `MaterialSummary`，
 * 讓它能直接丟進共用的教材卡片與列表。
 *
 * 注意這裡有**兩層翻譯**，是給兩種閱讀模式用的：
 * - 單句模式：讀 `ReadingSentence.translation`，一句一句對照
 * - 整篇模式：讀下面的 `translation`，整段一次看完
 */
export type ReadingMaterial = MaterialSummary & {
  type: 'reading'
  paragraphs: ReadingParagraph[]
  /**
   * 整段翻譯，**一個元素對應一個段落**，順序與 `paragraphs` 一致。
   * 內容是該段所有句子翻譯串起來的通順版本，不是逐句斷開的。
   */
  translation: string[]
}
