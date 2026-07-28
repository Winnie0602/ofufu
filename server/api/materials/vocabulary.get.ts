import { defineEventHandler } from 'h3'
import {
  getMaterialCollections,
  toDomainDocument,
} from '~~/server/utils/materialCollections'
import {
  limitToLastPage,
  listingResponse,
  materialPageSize,
  parseListingQuery,
} from '~~/server/utils/materialQuery'

/** 單字列表。單字沒有「內文」可以省，所以回整筆 `VocabularyItem`。 */
export default defineEventHandler(async (event) => {
  const query = parseListingQuery(event)
  const { vocabularyItems } = await getMaterialCollections()
  const filter = query.level ? { level: query.level } : {}

  // 先數總數才知道最後一頁是第幾頁，超出範圍的頁碼要收斂而不是回空陣列。
  const total = await vocabularyItems.countDocuments(filter)
  const page = limitToLastPage(query.page, total)

  const documents = await vocabularyItems
    .find(filter)
    // 程度由淺到深（n5 → n1），同程度內用 _id 固定順序，翻頁才不會跳。
    .sort({ level: -1, _id: 1 })
    .skip((page - 1) * materialPageSize)
    .limit(materialPageSize)
    .toArray()

  return listingResponse(documents.map(toDomainDocument), total, page)
})
