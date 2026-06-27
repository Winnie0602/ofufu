# Schema v0.1

## 目標

新資料架構以教材與學習單位為核心：

```text
Material
-> Segment
-> Vocabulary Occurrence
-> Vocabulary Item / Annotation
```

歌曲、文章與對話共享 Material/Segment 基礎，但可以擁有不同的編輯流程與選用欄位。

## 設計原則

- 使用獨立 domain ID，不使用 YouTube Video ID 作為 primary key。
- Material metadata 與大量 Segment 分開儲存。
- 可重用知識與內容中的出現位置分開儲存。
- AI 產物必須保存來源、版本與審核狀態。
- 歷史測驗需保存題目快照，避免正式題目修改後無法重現。
- MP3 不存 MongoDB，只保存 asset metadata 與 storage key。

## 共用型別

```ts
type MaterialType = 'article' | 'dialogue' | 'song'
type MaterialStatus = 'draft' | 'published' | 'archived'
type ReviewStatus = 'draft' | 'reviewed' | 'published' | 'archived'
type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
type DialogueSpeaker = 'a' | 'b'
```

## Material

Material 代表一份教材，例如 Article、Dialogue 或 Song。

```ts
type Material = {
  id: string
  type: MaterialType
  title: string
  slug: string
  summary?: string
  level?: JlptLevel
  sourceLanguage: 'ja'
  learnerLanguage: 'zh-TW'
  status: MaterialStatus
  tags?: string[]
  coverAssetId?: string
  source?: {
    name?: string
    url?: string
    externalId?: string
  }
  publishedAt?: string
  createdBy?: string
  createdAt: string
  updatedAt: string
  version: number
}
```

### Collection

`materials`

### 建議索引

- Unique: `{ slug: 1 }`
- List query: `{ status: 1, type: 1, publishedAt: -1 }`
- Filtering: `{ tags: 1 }`

## Segment

Segment 是教材中可被顯示、朗讀、標記、解說與測驗的學習片段。

```ts
type Segment = {
  id: string
  materialId: string
  parentSegmentId?: string
  order: number
  kind: 'paragraph' | 'sentence' | 'dialogue_turn' | 'lyric_line'
  speaker?: DialogueSpeaker
  jaText: string
  zhTWText?: string
  reading?: string
  audioAssetId?: string
  timing?: {
    start: number
    end: number
  }
  createdAt: string
  updatedAt: string
  version: number
}
```

`parentSegmentId` 可保留文章段落與句子之間的層級。`timing` 只用於 Song 或其他具有時間軸的媒體。

### Dialogue 使用方式

MVP 的 Dialogue 固定由兩位角色 A、B 輪流對話。每次角色發言就是一個 `dialogue_turn` Segment，不另外拆分 Character collection 或 Dialogue Turn collection。

```ts
const dialogueSpeakers = {
  a: {
    name: '固定角色 A',
    avatar: '/images/dialogue/a.webp',
    voice: 'ja-JP-Wavenet-A',
  },
  b: {
    name: '固定角色 B',
    avatar: '/images/dialogue/b.webp',
    voice: 'ja-JP-Wavenet-B',
  },
} as const
```

角色的名字、頭像與 TTS voice 屬於應用程式設定，不重複存入每份 Material 或 Segment。Segment 只保存穩定角色代號：

```ts
const dialogueSegments: Segment[] = [
  {
    id: 'segment-1',
    materialId: 'material-1',
    order: 1,
    kind: 'dialogue_turn',
    speaker: 'a',
    jaText: '今日はいい天気ですね。',
    zhTWText: '今天天氣很好呢。',
    createdAt: '2026-06-20T00:00:00.000Z',
    updatedAt: '2026-06-20T00:00:00.000Z',
    version: 1,
  },
  {
    id: 'segment-2',
    materialId: 'material-1',
    order: 2,
    kind: 'dialogue_turn',
    speaker: 'b',
    jaText: 'そうですね！',
    zhTWText: '對呀！',
    createdAt: '2026-06-20T00:00:00.000Z',
    updatedAt: '2026-06-20T00:00:00.000Z',
    version: 1,
  },
]
```

即使內容原則上採 A、B 輪流發言，也不應根據 `order` 奇偶數推算角色。明確保存 `speaker` 可以避免插入、刪除或重排 Segment 時改變角色。

若未來需要每篇 Dialogue 使用不同角色，可將角色設定移至 Material 的 `dialogueConfig`；既有 Segment 的 `speaker: 'a' | 'b'` 不需要修改。

### Collection

`segments`

### 建議索引

- Unique: `{ materialId: 1, order: 1 }`
- Parent lookup: `{ parentSegmentId: 1, order: 1 }`

## VocabularyItem

VocabularyItem 代表可跨教材重用的單字本體。

```ts
type VocabularyItem = {
  id: string
  headword: string
  normalizedForm: string
  reading?: string
  meaningZhTW: string
  partOfSpeech?: string
  jlptLevel?: JlptLevel
  examples?: {
    ja: string
    zhTW: string
  }[]
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}
```

`headword` 不應視為天然唯一值。去重時至少需要考慮 `normalizedForm`、`reading` 與詞性。

### Collection

`vocabulary_items`

### 建議索引

- Lookup: `{ normalizedForm: 1, reading: 1 }`
- Filtering: `{ status: 1, jlptLevel: 1 }`

## VocabularyOccurrence

VocabularyOccurrence 表示某個 VocabularyItem 在特定 Segment 中的出現位置與語境意思。

```ts
type VocabularyOccurrence = {
  id: string
  vocabularyItemId: string
  segmentId: string
  surface: string
  startOffset?: number
  endOffset?: number
  contextualMeaningZhTW?: string
  createdAt: string
  updatedAt: string
}
```

### Collection

`vocabulary_occurrences`

### 建議索引

- Segment lookup: `{ segmentId: 1 }`
- Vocabulary sources: `{ vocabularyItemId: 1, segmentId: 1 }`

## Annotation

Annotation 代表文法、用法、AI 解說或人工備註。

```ts
type Annotation = {
  id: string
  targetType: 'material' | 'segment' | 'vocabulary'
  targetId: string
  kind: 'grammar' | 'usage' | 'ai_explanation' | 'editor_note'
  contentZhTW: string
  source: 'editor' | 'ai' | 'user'
  reviewStatus: ReviewStatus
  aiMetadata?: {
    provider: string
    model: string
    promptVersion: string
    generatedAt: string
  }
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
  version: number
}
```

MVP 的 Grammar 可以先使用 Annotation 表示。確認需要跨教材重用、搜尋與系統化教學後，再建立 `grammar_items` 與 `grammar_occurrences`。

### Collection

`annotations`

### 建議索引

- Target lookup: `{ targetType: 1, targetId: 1, reviewStatus: 1 }`
- Review queue: `{ source: 1, reviewStatus: 1, createdAt: 1 }`

## AudioAsset

AudioAsset 保存 TTS 音檔的產生與儲存資訊，不保存 MP3 binary。

```ts
type AudioAsset = {
  id: string
  provider: 'google_tts'
  providerVersion?: string
  textHash: string
  text: string
  language: 'ja-JP'
  voice: string
  rate: number
  format: 'mp3'
  storageKey: string
  publicUrl?: string
  status: 'generating' | 'ready' | 'failed'
  durationMs?: number
  errorCode?: string
  retryCount: number
  createdAt: string
  updatedAt: string
}
```

Cache key 應由正規化文字、語言、voice、rate、format 與 provider version 共同產生。

### Collection

`audio_assets`

### 建議索引

- Unique cache key: `{ textHash: 1, language: 1, voice: 1, rate: 1, format: 1, providerVersion: 1 }`
- Cleanup/retry: `{ status: 1, updatedAt: 1 }`

## QuizQuestion

QuizQuestion 是 Question Bank 中經過狀態管理的題目。

```ts
type QuizQuestion = {
  id: string
  type:
    | 'vocabulary_choice'
    | 'audio_choice'
    | 'kana_choice'
    | 'sentence_translation_choice'
  prompt: string
  options: string[]
  correctAnswerIndex: number
  explanationZhTW?: string
  sourceRefs?: {
    materialId?: string
    segmentId?: string
    vocabularyItemId?: string
  }
  sourceSnapshot?: {
    jaText?: string
    zhTWText?: string
    headword?: string
    reading?: string
  }
  status: ReviewStatus
  generatedBy: 'ai' | 'editor'
  generation?: {
    provider?: string
    model?: string
    promptVersion?: string
  }
  reviewedBy?: string
  reviewedAt?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  version: number
}
```

### Collection

`quiz_questions`

### 建議索引

- Question selection: `{ status: 1, type: 1, publishedAt: -1 }`
- Source lookup: `{ 'sourceRefs.materialId': 1 }`
- Review queue: `{ status: 1, createdAt: 1 }`

## QuizAttempt

QuizAttempt 保存一次測驗及其題目快照。

```ts
type QuizAttempt = {
  id: string
  userId: string
  mode: 'practice' | 'material_review'
  materialId?: string
  questions: {
    questionId: string
    questionVersion: number
    prompt: string
    options: string[]
    correctAnswerIndex: number
    selectedAnswerIndex?: number
    isCorrect?: boolean
  }[]
  score?: number
  startedAt: string
  completedAt?: string
  createdAt: string
}
```

### Collection

`quiz_attempts`

### 建議索引

- User history: `{ userId: 1, createdAt: -1 }`
- Material history: `{ userId: 1, materialId: 1, createdAt: -1 }`

## UserCollectionEntry

UserCollectionEntry 保存使用者收藏。收藏與未來的熟練度或 SRS 狀態應分開。

```ts
type UserCollectionEntry = {
  id: string
  userId: string
  collectionType: 'saved_vocabulary' | 'saved_material'
  targetType: 'vocabulary' | 'material'
  targetId: string
  sourceSegmentId?: string
  note?: string
  createdAt: string
  updatedAt: string
}
```

### Collection

`user_collection_entries`

### 建議索引

- Unique: `{ userId: 1, collectionType: 1, targetType: 1, targetId: 1 }`
- User list: `{ userId: 1, collectionType: 1, createdAt: -1 }`

## Collection 一覽

| Collection | 用途 |
| --- | --- |
| `materials` | 教材 metadata 與發布狀態 |
| `segments` | 教材內的學習片段 |
| `vocabulary_items` | 可重用單字知識 |
| `vocabulary_occurrences` | 單字與 Segment 的關聯 |
| `annotations` | 文法、用法與解說 |
| `audio_assets` | TTS/R2 資產 metadata |
| `quiz_questions` | 審核與發布後的 Question Bank |
| `quiz_attempts` | 使用者測驗紀錄與快照 |
| `user_collection_entries` | 使用者收藏 |
| `users` | 使用者、角色與帳號資料 |

## 舊 Song 資料映射

| Legacy | v2 |
| --- | --- |
| `songs.id` / YouTube Video ID | `material.source.externalId` |
| Song metadata | `materials`，`type = song` |
| `lyrics[]` | `segments[]`，`kind = lyric_line` |
| `lyrics.start/end` | `segment.timing` |
| `lyrics.ja/zh/...` | `segment.jaText/zhTWText` |
| `lyrics.ruby` | `segment.reading` 或可重建的顯示資料 |
| `words[]` | `vocabulary_items` + `vocabulary_occurrences` |

Migration 不應覆寫舊 collection。初期透過 adapter 或批次轉換報告比對，確認資料完整性後再切換讀取來源。

## 待決策事項

- `reading` 保存純文字、結構化 ruby token，或在顯示時產生。
- Material revision 是否需要獨立 revision collection。
- TTS `publicUrl` 是否持久保存，或由 `storageKey` 動態產生。
- Vocabulary example 是否長期 embed，或改成獨立來源關聯。
- Question 的 options 是否需要結構化 ID，以支援更複雜題型。
