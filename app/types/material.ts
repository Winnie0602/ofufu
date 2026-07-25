import type { VocabularyPartOfSpeechCode } from './vocabulary'

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
  'sentence',
  'roleplay',
] as const

export type StudyMode = (typeof studyModes)[number]

/**
 * Ruby 括號記法解析後的顯示 token。
 *
 * 由 `parseRubyNotation()` 從純文字（含 furigana 括號）產生：
 * - 純文字段：只有 `text`。
 * - 漢字連續段：`text` 為漢字、`ruby` 為括號內讀音，供 `<ruby>` 顯示。
 */
export type RubyToken = {
  text: string
  ruby?: string
}

/**
 * 內文標註（stand-off）的定位錨點：以「表層字串 ＋ 第幾次出現」在句中定位，
 * renderer 自行找位置並包樣式，不預先把句子切成 segment。
 */
export type NoteAnchor = {
  /** 要標記的表層子字串（純文字，不含 ruby 括號），例：眺めたり。 */
  surface: string
  /** 同一 surface 在本句出現多次時，指定第幾個（1-based）；預設 1。 */
  occurrence?: number
}

export type MaterialExample = {
  /** 例句的固定模擬 nanoid（代理鍵）。 */
  id: string
  /** 不含 HTML 的完整日文例句；供顯示與 TTS 使用。 */
  japanese: string
  /** 對應的繁體中文翻譯。 */
  translation: string
}

/**
 * 教材內文（文章／對話）中「可點單字」的註解。
 *
 * 採「參照優先」設計：本型別只保存「出現位置」與「本文專屬」資訊，
 * 完整單字資料（活用、通用意思、豐富例句）一律由單字表 `VocabularyItem`
 * 以辭書形自然鍵 `(dictionaryForm, reading, partOfSpeech)` 查得，不內嵌於此。
 */
export type MaterialVocabularyNote = {
  /** 此單字「出現位置（occurrence）」的固定模擬 nanoid（代理鍵，非自然鍵）。 */
  id: string
  /**
   * 實際出現在文中的表層形／活用形（例：食べた、楽しめる）；僅供顯示，不用於配對。
   * 同時作為 stand-off 定位的 anchor：renderer 以此字串在句中找位置並包樣式。
   */
  surface: string
  /** 同一 surface 在本句出現多次時，指定要標第幾個（1-based）；預設 1，唯一出現可省略。 */
  occurrence?: number
  /** 表層形本身的讀音（例：楽しめる → たのしめる）；畫面主要顯示此讀音，供初學者對照發音。 */
  surfaceReading: string
  /** 辭書形（原形，例：食べる、楽しむ）——自然鍵之一，用於配對單字表。 */
  dictionaryForm: string
  /** 辭書形的讀音（例：たべる、たのしむ）——自然鍵之一，用於配對，非畫面主要顯示讀音。 */
  reading: string
  /** 詞性代碼——自然鍵之一，消除同形同音的歧義（沿用單字表既有代碼）。 */
  partOfSpeech: VocabularyPartOfSpeechCode
  /** 此字在「本段」的意思／用法；單字表沒有、屬本文專屬資訊，連結後仍會顯示。 */
  contextualMeaning: string
  /** 未連結單字表時的備用例句；已連結時優先顯示單字表例句。 */
  examples?: MaterialExample[]
  /**
   * resolver 依自然鍵解析後填入的單字表 id（代理鍵）；未命中為 null。
   * 前端原型可於執行時即時解析，故 mock data 不手動填寫；未來後端於匯入時填入。
   */
  vocabularyItemId?: string | null
}

export type MaterialGrammarNote = {
  id: string
  grammarPointId: string | null
  /** 文法句型本身（例：〜てくる）；作為 popover／列表的主標題。 */
  pattern: string
  /** 簡短意思，寫在標題旁當顯眼 gloss（例：漸漸變得～）；不寫「表示…」這種前綴。 */
  shortMeaning: string
  /**
   * 補充說明：較長、給人看的有意義說明（例：某種變化從過去逐漸累積、發展到現在）。
   * 避免公式化的「表示ＸＸＸ，意思是「ＸＸＸ」。」寫法。
   */
  explanation: string
  /**
   * 本文法在句中要框起的錨點；可有多個，用於不連續文法
   * （例：〜たり、〜たりする 跨逗號 → anchors: [{surface:'眺めたり'},{surface:'温めたり'}]）。
   */
  anchors: NoteAnchor[]
  sourceExample: MaterialExample
  extraExample: MaterialExample
}

/**
 * `buildAnnotatedSegments()` 產生的渲染計畫：把一句拆成連續的 span，
 * 每個 span 是「一串 ruby token ＋（可選）它所屬的單字／文法註解」。
 * 元件只要依序渲染：有 vocabularyNote 就包 Popover、有 grammarNote 就包按鈕、都沒有就純文字。
 */
export type AnnotatedSpan = {
  tokens: RubyToken[]
  vocabularyNote?: MaterialVocabularyNote
  grammarNote?: MaterialGrammarNote
}
