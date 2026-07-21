import type { JlptLevel as MaterialJlptLevel, MaterialLevel } from './material'

export type VocabularyLevel = MaterialLevel

export type JlptLevel = MaterialJlptLevel

export const verbGroupLabels = {
  1: '第一類動詞（五段動詞）',
  2: '第二類動詞（一段動詞）',
  3: '第三類動詞（不規則動詞）',
} as const

export type VerbGroup = keyof typeof verbGroupLabels

export const vocabularyPartOfSpeechLabels = {
  noun: '名',
  verb: '動',
  i_adjective: 'い形',
  na_adjective: 'な形',
  adverb: '副',
  particle: '助',
} as const

export type VocabularyPartOfSpeechCode =
  keyof typeof vocabularyPartOfSpeechLabels

export type VocabularyConjugations = {
  dictionary: string
  polite: string
  negative: string
  te: string
  past: string
  potential: string
  passive: string
  causative: string
  causativePassive: string
  imperative: string
  volitional: string
  conditionalBa: string
  conditionalTara: string
}

export type VocabularyTextSegment = {
  /** 例句的其中一段文字。 */
  text: string
  /** 此段是否為要 highlight 的目標單字；畫面依此上色，不使用 v-html。 */
  highlighted: boolean
}

export type VocabularyExample = {
  /** 例句的固定模擬 nanoid（代理鍵）。 */
  id: string
  /** 不含 HTML 的完整日文例句；TTS 使用此欄位，不從 segments 或 DOM 組字。 */
  japanese: string
  /** 依 highlight 位置切好的顯示片段；由 japanese 與目標詞位置產生。 */
  segments: VocabularyTextSegment[]
  /** 對應的繁體中文翻譯。 */
  translation: string
}

/**
 * 單字表的完整條目，同時是「詞條身分」本體。
 *
 * `id` 是穩定的代理鍵（被收藏與教材註解參照）；
 * 身分辨識（去重、配對）用的「自然鍵」是 `(word 辭書形, reading 讀音, partOfSpeech 詞性)`。
 */
export type VocabularyItem = {
  /** 單字條目的固定模擬 nanoid（代理鍵／PK）；收藏與教材註解一律參照此值。 */
  id: string
  /** 主要寫法，即「辭書形（原形）」——自然鍵之一。 */
  word: string
  /** 供列表顯示的 Ruby 假名標記；僅列表頁使用。 */
  rubyHtml: string
  /** 辭書形讀音——自然鍵之一。 */
  reading: string
  /** 繁體中文意思。 */
  meaning: string
  /** 詞性代碼——自然鍵之一。 */
  partOfSpeech: VocabularyPartOfSpeechCode
  /** JLPT 程度。 */
  level: JlptLevel
  /** 動詞分類（第一／二／三類）；非動詞不填。 */
  verbGroup?: VerbGroup
  /** 動詞完整常用活用；非動詞不填。 */
  conjugations?: VocabularyConjugations
  /** 該單字的日文例句與繁中翻譯。 */
  examples: VocabularyExample[]
}
