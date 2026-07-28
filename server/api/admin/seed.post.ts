import { createError, defineEventHandler, getRequestHeader } from 'h3'
import { conversationMaterials } from '~/data/materials/conversation'
import { readingMaterials } from '~/data/materials/reading'
import { vocabularyItems } from '~/data/materials/vocabulary'
import type { MaterialVocabularyNote } from '~/types/material'
import type { VocabularyItem } from '~/types/vocabulary'
import {
  noteIdentity,
  vocabularyIdentityKey,
  vocabularyItemIdentityKey,
} from '~/utils/vocabularyMatching'
import {
  ensureMaterialIndexes,
  getMaterialCollections,
} from '~~/server/utils/materialCollections'
import {
  collectConversationNotes,
  collectReadingNotes,
} from '~~/server/utils/materialQuery'

/**
 * 把 repo 裡的教材資料寫進 MongoDB。
 *
 *   curl -X POST http://localhost:3000/api/admin/seed -H "x-seed-token: <token>"
 *
 * 用 domain id 當 `_id` 且整份取代，所以可以重跑無限次，改了教材就再跑一次。
 * 但**不會刪除** repo 已移除、資料庫還留著的舊教材，需要乾淨重建時先手動清空 collection。
 *
 * ⚠️ 本機與部署站台目前連同一個資料庫，這支會直接改動公開站台讀到的資料。
 */

/** 單字表裡自然鍵撞在一起的兩筆以上資料。有這種東西就整份不寫入。 */
type DuplicateNaturalKey = {
  naturalKey: string
  ids: string[]
}

/** 教材標了、但單字表還沒收錄的字。這份清單可以直接拿去反向產生單字資料。 */
type UnmatchedNote = {
  dictionaryForm: string
  reading: string
  partOfSpeech: string
  contextualMeaning: string
  /** 出自哪一篇，例：`reading/Rk9mZ2pQ7wA`。 */
  from: string
}

const findDuplicateNaturalKeys = (
  items: VocabularyItem[],
): DuplicateNaturalKey[] => {
  const idsByKey = new Map<string, string[]>()

  for (const item of items) {
    const key = vocabularyItemIdentityKey(item)
    const ids = idsByKey.get(key)
    if (ids) ids.push(item.id)
    else idsByKey.set(key, [item.id])
  }

  return [...idsByKey]
    .filter(([, ids]) => ids.length > 1)
    .map(([naturalKey, ids]) => ({ naturalKey, ids }))
}

/**
 * 把註解連上單字表：配對成功填入 `vocabularyItemId`，失敗填 `null` 並列進報告。
 * 直接寫進傳入的註解物件，呼叫端給的必須是複本。
 */
const linkNotes = (
  notes: MaterialVocabularyNote[],
  from: string,
  itemIdByKey: Map<string, string>,
  unmatched: UnmatchedNote[],
): number => {
  let matched = 0

  for (const note of notes) {
    const itemId = itemIdByKey.get(vocabularyIdentityKey(noteIdentity(note)))
    note.vocabularyItemId = itemId ?? null

    if (itemId) {
      matched += 1
      continue
    }

    unmatched.push({
      dictionaryForm: note.dictionaryForm,
      reading: note.reading,
      partOfSpeech: note.partOfSpeech,
      contextualMeaning: note.contextualMeaning,
      from,
    })
  }

  return matched
}

/**
 * 整份取代而不是 `$set`，這樣 repo 裡刪掉的欄位資料庫也會跟著消失。
 * 只有「repo 已刪掉整篇教材」這種情況需要另外手動清。
 */
const replaceOperations = <T extends { id: string }>(documents: T[]) =>
  documents.map(({ id, ...rest }) => ({
    replaceOne: { filter: { _id: id }, replacement: rest, upsert: true },
  }))

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({
      statusCode: 403,
      statusMessage: 'seed 只能在開發環境執行',
    })
  }

  const config = useRuntimeConfig()

  if (!config.seedToken) {
    throw createError({
      statusCode: 500,
      statusMessage: '請先在 .env 設定 SEED_TOKEN',
    })
  }

  if (getRequestHeader(event, 'x-seed-token') !== config.seedToken) {
    throw createError({ statusCode: 401, statusMessage: 'x-seed-token 不正確' })
  }

  // 重複的自然鍵會違反 unique index，先擋下來，一筆都不寫入。
  const duplicateNaturalKeys = findDuplicateNaturalKeys(vocabularyItems)
  if (duplicateNaturalKeys.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: '單字自然鍵重複，未寫入任何資料',
      data: { duplicateNaturalKeys },
    })
  }

  await ensureMaterialIndexes()
  const collections = await getMaterialCollections()

  const vocabularyResult = await collections.vocabularyItems.bulkWrite(
    replaceOperations(vocabularyItems),
  )

  const itemIdByKey = new Map(
    vocabularyItems.map((item) => [vocabularyItemIdentityKey(item), item.id]),
  )

  // 複製一份再寫 vocabularyItemId，否則會污染 findSpeechSource() 共用的同一份教材常數。
  const readings = structuredClone(readingMaterials)
  const conversations = structuredClone(conversationMaterials)

  const unmatchedNotes: UnmatchedNote[] = []
  let matchedNotes = 0

  for (const material of readings) {
    matchedNotes += linkNotes(
      collectReadingNotes(material),
      `reading/${material.id}`,
      itemIdByKey,
      unmatchedNotes,
    )
  }

  for (const material of conversations) {
    matchedNotes += linkNotes(
      collectConversationNotes(material),
      `conversation/${material.id}`,
      itemIdByKey,
      unmatchedNotes,
    )
  }

  const [readingResult, conversationResult] = await Promise.all([
    collections.readingMaterials.bulkWrite(replaceOperations(readings)),
    collections.conversationMaterials.bulkWrite(
      replaceOperations(conversations),
    ),
  ])

  return {
    // 本機 seed 會直接影響部署站台，把資料庫名字回報出來確認連對地方。
    database: config.mongoDbName,
    upserted: {
      vocabulary: vocabularyResult.upsertedCount + vocabularyResult.matchedCount,
      reading: readingResult.upsertedCount + readingResult.matchedCount,
      conversation:
        conversationResult.upsertedCount + conversationResult.matchedCount,
    },
    duplicateNaturalKeys,
    matchedNotes,
    unmatchedNotes,
  }
})
