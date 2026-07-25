import type {
  MaterialGrammarNote,
  MaterialSummary,
  MaterialVocabularyNote,
} from './material'

/**
 * 對話教材固定用這三個角色，頭像圖檔位置寫在這裡。
 * 用固定角色是為了讓學習者在不同教材間有熟悉感，也省掉每篇教材各自準備頭像。
 */
export const characterAvatarMap = {
  fufu: '/images/characters/fufu.png',
  shiro: '/images/characters/shiro.png',
  kuro: '/images/characters/kuro.png',
} as const

export type CharacterAvatarKey = keyof typeof characterAvatarMap

/** 角色的日文名字，教材資料裡的 `name` 只能是這三個之一。 */
export const conversationCharacterNames = [
  'ふふ',
  'シロ',
  'クロ',
] as const

export type ConversationCharacterName =
  (typeof conversationCharacterNames)[number]

/** 日文名字 → 頭像 key。寫教材時只要填名字，頭像自動對上。 */
export const characterAvatarKeyMap: Record<
  ConversationCharacterName,
  CharacterAvatarKey
> = {
  ふふ: 'fufu',
  シロ: 'shiro',
  クロ: 'kuro',
}

/**
 * 這篇對話裡的一個角色。
 *
 *   { id: 'a9Tq3Lm7Xv2P', name: 'ふふ', role: '旅客', avatarKey: 'fufu' }
 *
 * `id` 是這篇教材內部用的代號，每句台詞靠它指出是誰說的。
 */
export type ConversationParticipant = {
  id: string
  name: ConversationCharacterName
  /** 這篇教材裡的身分，例：旅客、店員、地勤人員。每篇可以不一樣。 */
  role: string
  avatarKey: CharacterAvatarKey
}

/** 對話的一句台詞。 */
export type ConversationLine = {
  id: string
  /** 誰說的，對應 `ConversationParticipant.id`。 */
  speakerId: string
  /**
   * 日文台詞，假名用括號記法寫在漢字後面：
   *
   *   'チェックインをお願[ねが]いします。'
   *
   * 存的是帶括號的版本；要純日文（例如餵給 TTS）時呼叫 `toPlainJapanese()` 現場剝掉。
   */
  text: string
  translation: string
  /**
   * 這句要標成可點的重點單字。註解與內文分開存，`text` 本身不含任何標記，
   * 靠註解裡的 `surface` 字串回頭到 `text` 找位置。
   */
  vocabularyNotes?: MaterialVocabularyNote[]
  /** 同上，這句要標的文法。定位用 `anchors`，一則文法可以標在句中好幾個地方。 */
  grammarNotes?: MaterialGrammarNote[]
}

/**
 * 一篇對話教材。共用欄位（標題、程度、封面⋯）繼承自 `MaterialSummary`，
 * 讓它能直接丟進共用的教材卡片與列表。
 *
 * **`participants[0]` 有特殊意義**，寫教材時順序不能隨便排：
 * - 對話泡泡排版：`participants[0]` 的台詞靠右（像自己傳訊息），其他人靠左
 * - 角色扮演：預設就是扮演 `participants[0]`
 *
 * 所以第一個應該放「學習者最可能代入的角色」，例如點餐情境放客人而不是店員。
 */
export type ConversationMaterial = MaterialSummary & {
  type: 'conversation'
  /** 這段對話發生在什麼場合，顯示在頁面上方的「場景」區塊，用日文寫。 */
  sceneDescription: string
  participants: ConversationParticipant[]
  /** 台詞，照對話順序排。自動播放與逐句練習都依這個順序跑。 */
  lines: ConversationLine[]
}
