import type {
  MaterialGrammarNote,
  MaterialSummary,
  MaterialTextSegment,
  MaterialVocabularyNote,
} from './material'

export const characterAvatarMap = {
  fufu: '/images/characters/fufu.png',
  shiro: '/images/characters/shiro.png',
  kuro: '/images/characters/kuro.png',
} as const

export type CharacterAvatarKey = keyof typeof characterAvatarMap

export const conversationCharacterNames = [
  'ふふ',
  'シロ',
  'クロ',
] as const

export type ConversationCharacterName =
  (typeof conversationCharacterNames)[number]

export const characterAvatarKeyMap: Record<
  ConversationCharacterName,
  CharacterAvatarKey
> = {
  ふふ: 'fufu',
  シロ: 'shiro',
  クロ: 'kuro',
}

export type ConversationParticipant = {
  id: string
  name: ConversationCharacterName
  role: string
  avatarKey: CharacterAvatarKey
}

export type ConversationLine = {
  id: string
  speakerId: string
  japanese: string
  segments: MaterialTextSegment[]
  translation: string
}

export type ConversationMaterial = MaterialSummary & {
  type: 'conversation'
  sceneDescription: string
  participants: ConversationParticipant[]
  lines: ConversationLine[]
  vocabularyNotes: MaterialVocabularyNote[]
  grammarNotes: MaterialGrammarNote[]
}
