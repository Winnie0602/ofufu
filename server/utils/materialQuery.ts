import { getQuery, type H3Event } from 'h3'
import type { ConversationMaterial } from '~/types/conversation'
import {
  materialLevels,
  type JlptLevel,
  type MaterialExample,
  type MaterialVocabularyNote,
} from '~/types/material'
import type { ReadingMaterial } from '~/types/reading'
import { getMaterialCollections } from '~~/server/utils/materialCollections'

/** 列表頁一頁幾筆。前端不傳這個值，由伺服器決定並回報。 */
export const materialPageSize = 20

/** 教材本身的程度，不含`all`。 */
const jlptLevels = materialLevels.filter(
  (level): level is JlptLevel => level !== 'all',
)

/**
 * 讀 query 的 `level` 與 `page`。這兩個值使用者可以在網址上亂打，
 * 所以一律收斂：`level` 不是 n5～n1（含 `all`）就不加 filter，`page` 非正整數當第 1 頁。
 */
export const parseListingQuery = (event: H3Event) => {
  const query = getQuery(event)
  const level = String(query.level ?? '').toLowerCase()
  const page = Number(query.page ?? 1)

  return {
    level: jlptLevels.includes(level as JlptLevel) ? (level as JlptLevel) : null,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  }
}

const totalPagesOf = (total: number) =>
  Math.max(1, Math.ceil(total / materialPageSize))

/**
 * 把超出範圍的頁碼收斂到最後一頁。
 *
 * 網址寫 `page=99` 但只有 5 頁時要回第 5 頁的內容，不能回空陣列——
 * 那會讓畫面顯示「目前沒有這個程度的教材」，看起來像資料不存在。
 * 因此列表 API 一律先數總數再查，回應的 `page` 是實際給的那一頁。
 */
export const limitToLastPage = (page: number, total: number) =>
  Math.min(page, totalPagesOf(total))

/** 列表 API 的統一回應形狀。 */
export const listingResponse = <T>(items: T[], total: number, page: number) => ({
  items,
  total,
  page,
  pageSize: materialPageSize,
  totalPages: totalPagesOf(total),
})

/** 列表只需要 `MaterialSummary` 的欄位，不把整篇內文送到列表頁。 */
export const materialListFields = {
  type: 1,
  title: 1,
  excerpt: 1,
  level: 1,
  categories: 1,
  coverImage: 1,
} as const

/**
 * 攤平出一篇教材的所有單字註解。
 * 只看 `paragraphs`／`lines`，所以資料庫形狀與前端形狀都吃得下。
 */
export const collectReadingNotes = (
  material: Pick<ReadingMaterial, 'paragraphs'>,
): MaterialVocabularyNote[] =>
  material.paragraphs.flatMap((paragraph) =>
    paragraph.sentences.flatMap((sentence) => sentence.vocabularyNotes ?? []),
  )

export const collectConversationNotes = (
  material: Pick<ConversationMaterial, 'lines'>,
): MaterialVocabularyNote[] =>
  material.lines.flatMap((line) => line.vocabularyNotes ?? [])

/**
 * 把配對成功的單字教材例句併進註解，但保留本篇教材自己的例句。
 *
 * 兩個來源若有相同日文，只保留本篇例句裡的那一則，避免 Popover 重複顯示。
 * 在伺服器做完，前端不必為了幾個字載入整份單字表。
 */
export const addExamplesToVocabularyNotes = async (
  notes: MaterialVocabularyNote[],
) => {
  const itemIds = [
    ...new Set(
      notes
        .map((note) => note.vocabularyItemId)
        .filter((id): id is string => Boolean(id)),
    ),
  ]
  if (itemIds.length === 0) return

  const { vocabularyItems } = await getMaterialCollections()
  const items = await vocabularyItems
    .find({ _id: { $in: itemIds } }, { projection: { examples: 1 } })
    .toArray()

  // 只取 popover 需要的欄位，不把單字表的 segments 一起送出去。
  const examplesById = new Map<string, MaterialExample[]>(
    items.map((item) => [
      item._id,
      item.examples.map(({ id, japanese, translation }) => ({
        id,
        japanese,
        translation,
      })),
    ]),
  )

  for (const note of notes) {
    const examples = note.vocabularyItemId
      ? examplesById.get(note.vocabularyItemId)
      : undefined
    if (!examples) continue

    const contextJapanese = new Set(
      note.examples?.map((example) => example.japanese) ?? [],
    )
    note.vocabularyExamples = examples.filter(
      (example) => !contextJapanese.has(example.japanese),
    )
  }
}
