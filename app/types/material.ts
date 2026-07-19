export const materialLevels = ['all', 'n5', 'n4', 'n3', 'n2', 'n1'] as const

export type MaterialLevel = (typeof materialLevels)[number]

export type JlptLevel = Exclude<MaterialLevel, 'all'>

export const materialTypeLabels = {
  vocabulary: '單字',
  reading: '閱讀',
  conversation: '對話',
  song: '歌曲',
  grammar: '文法',
  quiz: '測驗',
} as const

export type MaterialType = keyof typeof materialTypeLabels

export const materialCategoryLabels: Record<string, string> = {
  news: '新聞',
  science: '科學',
  culture: '文化',
  food: '美食',
  travel: '旅遊',
  life: '生活',
  restaurant: '餐廳',
  reservation: '預約',
  airport: '機場',
  work: '職場',
  schedule: '行程',
  hotel: '住宿',
  shopping: '購物',
  service: '服務',
  daily: '日常',
  friends: '朋友',
}

export type MaterialSummary = {
  id: string
  type: MaterialType
  title: string
  excerpt: string
  level: JlptLevel
  categories: string[]
  coverImage: string | null
}

export const studyModes = [
  'full',
  'japanese',
  'listening',
  'sentence',
] as const

export type StudyMode = (typeof studyModes)[number]

export type MaterialRubyPart = {
  text: string
  ruby?: string
}

export type MaterialTextSegment = {
  id: string
  text: string
  ruby?: string
  parts?: MaterialRubyPart[]
  vocabularyNoteId?: string
  grammarNoteId?: string
}

export type MaterialExample = {
  id: string
  japanese: string
  translation: string
}

export type MaterialVocabularyNote = {
  id: string
  lexemeId: string
  surface: string
  reading: string
  contextualMeaning: string
  examples: MaterialExample[]
}

export type MaterialGrammarNote = {
  id: string
  grammarPointId: string | null
  pattern: string
  shortExplanation: string
  sourceSentenceId: string
  sourceExample: MaterialExample
  extraExample: MaterialExample
}
