import type { ConversationMaterial } from '~/types/conversation'
import type { ReadingMaterial } from '~/types/reading'
import type { VocabularyItem } from '~/types/vocabulary'
import { connectToDatabase } from '~~/server/utils/mongodb'

/**
 * 資料庫裡的形狀 = 前端型別，只是最外層的 `id` 改名為 `_id`。
 *
 * 直接用 domain id 當主鍵，不會有「MongoDB `_id` 與 domain id 兩套身分」的問題，
 * upsert 也天然冪等。內文的句子、台詞、註解、例句 id 都是巢狀欄位，維持 `id` 不動。
 */
export type StoredVocabularyItem = Omit<VocabularyItem, 'id'> & { _id: string }
export type StoredReadingMaterial = Omit<ReadingMaterial, 'id'> & { _id: string }
export type StoredConversationMaterial = Omit<ConversationMaterial, 'id'> & {
  _id: string
}

/**
 * 回傳給前端之前把 `_id` 改回 `id`，前端型別因此完全不用動。
 * 只處理最外層，內文的巢狀 `id` 本來就沒改過。
 */
export const toDomainDocument = <T extends { _id: string }>(
  document: T,
): Omit<T, '_id'> & { id: string } => {
  const { _id, ...rest } = document
  return { id: _id, ...rest }
}

/** 取得三個教材 collection 的 handle。 */
export async function getMaterialCollections() {
  const { db } = await connectToDatabase()

  return {
    vocabularyItems: db.collection<StoredVocabularyItem>('vocabulary_items'),
    readingMaterials: db.collection<StoredReadingMaterial>('reading_materials'),
    conversationMaterials: db.collection<StoredConversationMaterial>(
      'conversation_materials',
    ),
  }
}

/**
 * 建立 index。`createIndex` 是冪等的，已存在就不會有動作。
 *
 * 單字的 unique index 用的是自然鍵（辭書形＋讀音＋詞性），
 * 教材則依程度篩選建 index。
 */
export async function ensureMaterialIndexes() {
  const collections = await getMaterialCollections()

  await Promise.all([
    collections.vocabularyItems.createIndex(
      { word: 1, reading: 1, partOfSpeech: 1 },
      { unique: true },
    ),
    collections.readingMaterials.createIndex({ level: 1 }),
    collections.conversationMaterials.createIndex({ level: 1 }),
  ])
}
