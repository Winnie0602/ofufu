import type { MaterialVocabularyNote } from '~/types/material'
import type { VocabularyItem, VocabularyPartOfSpeechCode } from '~/types/vocabulary'
import { vocabularyItems } from '~/data/materials/vocabulary'

/**
 * 判斷「兩個單字是不是同一個字」。
 *
 * ## 要解決什麼問題
 *
 * 文章內文出現的是活用形，單字表存的是辭書形：
 *
 *   文章裡寫「昨日ケーキを食べた」  ←「食べた」
 *   單字表裡存的是               ←「食べる」
 *
 * 兩邊寫法不同，又沒有共用的 id 可以直接對上（教材是 AI 產的，它不可能知道單字表的 id
 * 長什麼樣）。所以改用單字本身的三個特徵當識別：**辭書形 ＋ 讀音 ＋ 詞性**。
 * 這三個湊起來就能認出是同一個字，本檔把這件事包成幾個小工具。
 *
 * ## 為什麼是這三個欄位
 *
 * 少了讀音會撞到同形異音（例：「行った」可能是 いった 或 おこなった）；
 * 少了詞性會撞到同形同音但用法不同的字。三個一起才夠準。
 *
 * ## 兩個用途
 *
 * 1. **查完整資料**：內文只存最少資訊，點開單字時要去單字表撈活用表、例句等等。
 * 2. **收藏去重**：使用者在 A 文章收藏「食べた」、在 B 文章收藏「食べる」，
 *    應該只留一筆「食べる」，而不是兩筆看起來很像的東西。
 */

/**
 * 認人用的三個欄位。
 *
 * 注意這**不是**主鍵——這些值有可能被編輯（例如發現讀音打錯）。
 * 真正的主鍵是 `VocabularyItem.id` 那種不會變的亂數字串。
 */
export type VocabularyIdentity = {
  /** 辭書形／原形，例：食べる、楽しむ。 */
  dictionaryForm: string
  /** 辭書形的讀音，例：たべる、たのしむ。 */
  reading: string
  /** 詞性代碼，例：verb、noun。 */
  partOfSpeech: VocabularyPartOfSpeechCode
}

/**
 * 比對前的字串清理：去掉前後空白、把全形英數統一成半形。
 *
 *   '  食べる '  →  '食べる'
 *   'ｖｅｒｂ'   →  'verb'
 *
 * 免得資料手打時多了個空格就被當成不同的字。
 */
const normalize = (value: string): string => value.trim().normalize('NFKC')

/**
 * 把三個欄位串成一個字串，方便直接用 `===` 比對。
 *
 *   輸入：{ dictionaryForm: '食べる', reading: 'たべる', partOfSpeech: 'verb' }
 *   輸出：'食べる|たべる|verb'
 *
 * 不管內文寫的是「食べた」「食べて」還是「食べます」，只要辭書形一樣，
 * 產生的字串就一樣——這正是去重的基礎。
 *
 * 這個字串只用來比對，不要拿去當資料庫的鍵或寫進網址。
 */
export const vocabularyIdentityKey = (identity: VocabularyIdentity): string =>
  `${normalize(identity.dictionaryForm)}|${normalize(identity.reading)}|${identity.partOfSpeech}`

/**
 * 同上，但輸入是單字表的條目。
 *
 *   輸入：{ id: 'xf0UXfch7bLu', word: '食べる', reading: 'たべる', partOfSpeech: 'verb', ... }
 *   輸出：'食べる|たべる|verb'
 *
 * 單字表的辭書形欄位叫 `word` 而不是 `dictionaryForm`，這裡順手轉換。
 */
export const vocabularyItemIdentityKey = (item: VocabularyItem): string =>
  vocabularyIdentityKey({
    dictionaryForm: item.word,
    reading: item.reading,
    partOfSpeech: item.partOfSpeech,
  })

/**
 * 拿三個欄位去單字表找出完整那一筆。
 *
 *   輸入：{ dictionaryForm: '食べる', reading: 'たべる', partOfSpeech: 'verb' }
 *   輸出：單字表裡 id 為 'xf0UXfch7bLu' 的完整條目（含活用表、例句、程度⋯）
 *
 *   找不到時輸出 null。
 *
 * 找不到是正常情況，代表這個字還沒被收進單字表；之後接後端時，這種字會變成待審核草稿。
 * `items` 參數平常不用傳，預設就是整份單字表，開放它是為了方便測試時塞假資料。
 */
export const findVocabularyItem = (
  identity: VocabularyIdentity,
  items: VocabularyItem[] = vocabularyItems,
): VocabularyItem | null => {
  const key = vocabularyIdentityKey(identity)
  return items.find((item) => vocabularyItemIdentityKey(item) === key) ?? null
}

/**
 * 算出收藏時該用哪個鍵，讓同一個字不管從哪篇文章收藏都只留一筆。
 *
 *   食べる 在單字表裡  →  'xf0UXfch7bLu'         （直接用單字表的 id）
 *   某個字還沒收錄     →  'draft:眺める|ながめる|verb'  （用三欄位組的臨時鍵）
 *
 * 所以使用者在 A 文章收藏「食べた」、在 B 文章收藏「食べる」，兩次都會拿到
 * 'xf0UXfch7bLu'，收藏清單裡只會有一筆「食べる」，而且顯示的是單字表的完整資料。
 *
 * `draft:` 前綴是為了讓人一眼看出這筆還沒對上單字表，未來單字補進表裡之後要做一次搬移。
 */
export const favoriteVocabularyKey = (
  identity: VocabularyIdentity,
  items: VocabularyItem[] = vocabularyItems,
): string => {
  const item = findVocabularyItem(identity, items)
  return item ? item.id : `draft:${vocabularyIdentityKey(identity)}`
}

/**
 * 從教材的單字註解裡挑出這三個欄位，好餵給上面那些函式。
 *
 *   輸入：內文註解（有 surface、surfaceReading、contextualMeaning⋯一堆欄位）
 *   輸出：{ dictionaryForm, reading, partOfSpeech } 三個而已
 *
 * 純粹是省掉每次呼叫都手寫一次這三行。
 */
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
