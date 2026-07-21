import type { MaterialVocabularyNote } from '~/types/material'
import type { VocabularyItem, VocabularyPartOfSpeechCode } from '~/types/vocabulary'
import { vocabularyItems } from '~/data/materials/vocabulary'

/**
 * 單字身分的「自然鍵」欄位：辭書形 + 讀音 + 詞性。
 *
 * 用於「由活用形找回辭書形條目、確保不重複」；
 * 注意它不是 PK（可能被修改），PK 由穩定的 `id` 代理鍵擔任。
 */
export type VocabularyIdentity = {
  /** 辭書形（原形，例：食べる、楽しむ）。 */
  dictionaryForm: string
  /** 辭書形讀音（例：たべる、たのしむ）。 */
  reading: string
  /** 詞性代碼。 */
  partOfSpeech: VocabularyPartOfSpeechCode
}

/** 對自然鍵字串做基本正規化（去除前後空白、統一全半形）。 */
const normalize = (value: string): string => value.trim().normalize('NFKC')

/**
 * 由自然鍵組出穩定的身分鍵字串（僅供比對／去重，不是 PK）。
 * 相同辭書形、讀音、詞性會得到相同的鍵，與出現時的活用形（surface）無關。
 */
export const vocabularyIdentityKey = (identity: VocabularyIdentity): string =>
  `${normalize(identity.dictionaryForm)}|${normalize(identity.reading)}|${identity.partOfSpeech}`

/** 單字表條目本身的身分鍵；其辭書形即 `word`。 */
export const vocabularyItemIdentityKey = (item: VocabularyItem): string =>
  vocabularyIdentityKey({
    dictionaryForm: item.word,
    reading: item.reading,
    partOfSpeech: item.partOfSpeech,
  })

/**
 * 依自然鍵，把一個教材單字註解解析成單字表的完整條目。
 * 找到回傳該 `VocabularyItem`，找不到回傳 `null`（未連結／未來的待審核草稿）。
 */
export const resolveVocabularyItem = (
  identity: VocabularyIdentity,
  items: VocabularyItem[] = vocabularyItems,
): VocabularyItem | null => {
  const key = vocabularyIdentityKey(identity)
  return items.find((item) => vocabularyItemIdentityKey(item) === key) ?? null
}

/**
 * 收藏用的去重身分：
 * 已連結單字表 → 回傳單字表的 `id`（代理鍵）；未連結 → 由自然鍵組出的草稿鍵。
 * 因此「食べた」「食べる」等同字不同活用形會得到相同結果，達成收藏去重。
 */
export const favoriteVocabularyKey = (
  identity: VocabularyIdentity,
  items: VocabularyItem[] = vocabularyItems,
): string => {
  const item = resolveVocabularyItem(identity, items)
  return item ? item.id : `draft:${vocabularyIdentityKey(identity)}`
}

/** 從 `MaterialVocabularyNote` 取出自然鍵欄位，方便傳入上述函式。 */
export const noteIdentity = (
  note: Pick<
    MaterialVocabularyNote,
    'dictionaryForm' | 'reading' | 'partOfSpeech'
  >,
): VocabularyIdentity => ({
  dictionaryForm: note.dictionaryForm,
  reading: note.reading,
  partOfSpeech: note.partOfSpeech,
})
