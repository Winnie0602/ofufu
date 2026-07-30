import { defineEventHandler } from 'h3'
import {
  getMaterialCollections,
  replaceMongoIdWithId,
} from '~~/server/utils/materialCollections'
import {
  limitToLastPage,
  listingResponse,
  materialPageSize,
  materialListFields,
  parseListingQuery,
} from '~~/server/utils/materialQuery'

/** 閱讀列表。用 projection 只取卡片需要的欄位，整篇內文留給詳情 API。 */
export default defineEventHandler(async (event) => {
  const query = parseListingQuery(event)
  const { readingMaterials } = await getMaterialCollections()
  const filter = query.level ? { level: query.level } : {}

  // 先數總數才知道最後一頁是第幾頁，超出範圍的頁碼要收斂而不是回空陣列。
  const total = await readingMaterials.countDocuments(filter)
  const page = limitToLastPage(query.page, total)

  const documents = await readingMaterials
    .find(filter, { projection: materialListFields })
    .sort({ level: -1, _id: 1 })
    .skip((page - 1) * materialPageSize)
    .limit(materialPageSize)
    .toArray()

  return listingResponse(documents.map(replaceMongoIdWithId), total, page)
})
