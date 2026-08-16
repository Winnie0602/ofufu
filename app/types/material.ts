import type { InjectionKey } from 'vue'
import type { VocabularyPartOfSpeechCode } from './vocabulary'

/** 程度篩選用的完整清單。`all` 只是篩選器的「全部」選項，不是真的教材程度。 */
export const materialLevels = ['all', 'n5', 'n4', 'n3', 'n2', 'n1'] as const

export type MaterialLevel = (typeof materialLevels)[number]

/** 教材本身的程度，一定是 n5～n1 其中一個，不會是 `all`。 */
export type JlptLevel = Exclude<MaterialLevel, 'all'>

/**
 * 六大教材類型。key 是不會變的英文代碼（存進資料、寫進網址），value 是畫面上顯示的中文。
 */
export const materialTypeLabels = {
  vocabulary: '單字',
  reading: '閱讀',
  conversation: '對話',
  song: '歌曲',
  grammar: '文法',
  quiz: '測驗',
} as const

export type MaterialType = keyof typeof materialTypeLabels

/**
 * 目前有語音的教材類型。
 *
 * `/api/tts` 只接受「內容座標」——教材類型 ＋ 教材 id ＋ 單位 id——不接受任意文字，
 * 所以前端能送的類型必須是伺服器查得到的這三種。歌曲、文法、測驗還沒有語音。
 */
export const speechMaterialTypes = [
  'vocabulary',
  'reading',
  'conversation',
] as const

export type SpeechMaterialType = (typeof speechMaterialTypes)[number]

/**
 * 「現在這一頁是哪一篇教材」，由兩個詳情頁 `provide`，內文元件自己 `inject`。
 *
 *   provide(currentMaterialKey, { materialType: 'reading', materialId: material.id })
 *   const currentMaterial = inject(currentMaterialKey)
 *
 * 單字列表頁不用這個：那裡每一筆單字自成一篇教材，隨按鈕而變。
 */
export type CurrentMaterial = {
  materialType: Extract<SpeechMaterialType, 'reading' | 'conversation'>
  materialId: string
}

// 目前正在看的教材
export const currentMaterialKey = Symbol(
  'currentMaterial',
) as InjectionKey<CurrentMaterial>

/**
 * 教材分類標籤的中文對照，例：`categories: ['airport', 'travel']` → 「機場」「旅遊」。
 *
 * 型別故意寫成寬鬆的 `Record<string, string>`：分類會隨教材增加，
 * 查不到時畫面會退回顯示原始英文代碼，不會壞掉。
 */
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

/**
 * 列表頁與推薦卡片需要的最少資訊——六種教材共用同一組欄位，所以一張卡片元件就能通吃。
 * 內文、註解那些重東西不放這裡，點進去才載。
 */
export type MaterialSummary = {
  id: string
  type: MaterialType
  title: string
  excerpt: string
  level: JlptLevel
  categories: string[]
  coverImage: string | null
}

/**
 * 列表 API 的回應形狀，三個列表頁共用。
 * 篩選與分頁都在伺服器完成，`items` 就是這一頁要顯示的東西。
 */
export type MaterialListingResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 教材頁上方 Tabs 的三種學習方式：
 * - `full`     整篇／整段閱讀，可自動播放全文
 * - `sentence` 一句一句學，可個別遮住日文或中文
 * - `roleplay` 對話專用，挑一個角色扮演，遮住他的台詞並逐句練習
 */
export const studyModes = [
  'full',
  'sentence',
  'roleplay',
] as const

export type StudyMode = (typeof studyModes)[number]

/**
 * 日文句子解析後的其中一小段。
 *
 * 有漢字讀音：
 * `{ text: '朝', ruby: 'あさ' }`
 *
 * 普通文字：
 * `{ text: 'の' }`
 *
 * 一整句會由多個 RubyToken 組成：
 * `朝[あさ]の空気[くうき]`
 * → [
 *   { text: '朝', ruby: 'あさ' },
 *   { text: 'の' },
 *   { text: '空気', ruby: 'くうき' },
 * ]
 */
export type RubyToken = {
  text: string
  ruby?: string
}

/**
 * 「這則註解要標在句子的哪個位置」。
 *
 * 不用數字索引（句子改一個字就全部位移，手寫也容易錯），改用「要標的字 ＋ 第幾次出現」：
 *
 *   句子：花が咲いて、花が散る
 *   { surface: '花' }                 →  標第一個花
 *   { surface: '花', occurrence: 2 }  →  標第二個花
 */
export type NoteAnchor = {
  /** 要標記的字，寫剝掉括號後的樣子（寫「眺めたり」不是「眺[なが]めたり」）。 */
  surface: string
  /** 同一個字在這句出現多次時，指定第幾個（從 1 數起）。只出現一次可省略。 */
  occurrence?: number
}

/** 一組日文例句與它的中文翻譯。單字註解、文法註解都會用到。 */
export type MaterialExample = {
  /** 固定的模擬 nanoid，只是拿來當唯一識別，本身沒有意義。 */
  id: string
  /** 純日文，不含 HTML；同時供畫面顯示與 TTS 發音使用。 */
  japanese: string
  translation: string
}

/**
 * 某個單字出現在某篇教材的某個句子時，該次出現所需要的註解資料。
 *
 * 這裡**只記「這個字在這篇文章的哪裡、在這句話是什麼意思」**，不放完整單字資料。
 * 活用變化、通用意思、豐富例句都在單字表裡，靠辭書形去查：
 *
 *   內文出現「食べた」  →  dictionaryForm: '食べる'  →  查到單字表那一筆
 *
 * 好處是使用者收藏「食べた」和「食べる」會收到同一筆，而且單字表更新了內文也跟著更新。
 */
export type MaterialVocabularyNote = {
  /** 這個「出現位置」的固定模擬 nanoid。同一個單字在不同篇文章有不同的 id。 */
  id: string
  /**
   * 實際出現在文中的樣子，可能是活用形（食べた、楽しめる）
   */
  surface: string
  /** 同一個字在這句出現多次時，指定要標第幾個（從 1 數起）；只出現一次可省略。 */
  occurrence?: number
  /** 這個活用形本身怎麼唸（楽しめる → たのしめる）。畫面主要顯示這個，讓初學者對得上發音。 */
  surfaceReading: string
  /** 辭書形／原形（食べた → 食べる）。這是拿去配對單字表的鍵之一。 */
  dictionaryForm: string
  /** 辭書形的讀音（食べる → たべる）。配對用，不是畫面主要顯示的讀音。 */
  reading: string
  /** 詞性代碼。配對用，用來區分同形同音但詞性不同的字。 */
  partOfSpeech: VocabularyPartOfSpeechCode
  /** 這個字在**這一段**是什麼意思。單字表不會有這種上下文資訊，所以配對成功後仍然顯示。 */
  contextualMeaning: string
  /** 這篇教材依目前情境提供的本篇例句。 */
  examples?: MaterialExample[]
  /** 詳情 API 依 vocabularyItemId 併入的單字教材例句；不寫回教材正本。 */
  vocabularyExamples?: MaterialExample[]
  /**
   * 配對成功後填入的單字表 id，沒配到就是 null。
   * 前端原型是執行時即時配對，所以假資料不用手寫；之後改由後端在匯入時填。
   */
  vocabularyItemId?: string | null
}

/** 內文裡一個可點文法的註解。 */
export type MaterialGrammarNote = {
  id: string
  /** 配對到文法教材的 id，還沒連上就是 null。 */
  grammarPointId: string | null
  /** 句型本身（〜てくる），當作 Popover 與頁尾列表的標題。 */
  pattern: string
  /** 一句話講完是什麼意思（漸漸變得～），顯示在標題旁邊。不要寫「表示…」這種開頭。 */
  shortMeaning: string
  /**
   * 較長的說明，寫給人看的白話，例：「某種變化從過去逐漸累積、發展到現在」。
   */
  explanation: string
  /**
   * 這個文法要框在句子的哪些地方。可以有多個，用來處理被切開的文法：
   *
   *   〜たり、〜たりする  →  [{ surface: '眺めたり' }, { surface: '温めたり' }]
   *
   * 這樣只會框住兩個關鍵字，中間的逗號和其他字不會一起被畫色。
   */
  anchors: NoteAnchor[]
  /** 取自本文的那一句，讓學習者看到文法在原文裡怎麼用。 */
  sourceExample: MaterialExample
  /** 另外補一句不同情境的例句。 */
  extraExample: MaterialExample
}

/**
 * `createAnnotatedSpans()` 算好的「渲染計畫」——一句話被切成好幾段，每段標明歸誰管。
 *
 *   [ { tokens: 公園(こうえん)/の/花(はな)/が },            ← 普通文字
 *     { tokens: 咲(さ)/いていて, grammarNote },              ← 藍底、點了開文法說明
 *     { tokens: '、きれいです。' } ]                          ← 普通文字
 *
 * 元件不必自己算位置，照順序看每段掛了什麼就好：
 * 有 vocabularyNote 包單字 Popover、有 grammarNote 包文法 Popover、都沒有就純文字。
 */
export type AnnotatedSpan = {
  tokens: RubyToken[]
  vocabularyNote?: MaterialVocabularyNote
  grammarNote?: MaterialGrammarNote
}
