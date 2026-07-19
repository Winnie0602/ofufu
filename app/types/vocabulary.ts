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
  text: string
  highlighted: boolean
}

export type VocabularyExample = {
  id: string
  japanese: string
  segments: VocabularyTextSegment[]
  translation: string
}

export type VocabularyItem = {
  id: string
  word: string
  rubyHtml: string
  reading: string
  meaning: string
  partOfSpeech: VocabularyPartOfSpeechCode
  level: JlptLevel
  verbGroup?: VerbGroup
  conjugations?: VocabularyConjugations
  examples: VocabularyExample[]
}
