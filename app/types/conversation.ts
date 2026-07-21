import type {
  MaterialGrammarNote,
  MaterialSummary,
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
  /** 純文字含 ruby 括號記法；純日文由 `toPlainJapanese()` 剝括號得到。 */
  text: string
  translation: string
  /** 本句的可點單字註解（stand-off，以 surface 定位）。 */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 本句的文法註解（stand-off，以 anchors 定位）。 */
  grammarNotes?: MaterialGrammarNote[]
}

export type ConversationMaterial = MaterialSummary & {
  type: 'conversation'
  sceneDescription: string
  participants: ConversationParticipant[]
  lines: ConversationLine[]
}
