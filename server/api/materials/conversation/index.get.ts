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

/** 對話列表。與閱讀相同，只回卡片需要的欄位。 */
export default defineEventHandler(async (event) => {
  const query = parseListingQuery(event)
  const { conversationMaterials } = await getMaterialCollections()
  const filter = query.level ? { level: query.level } : {}

  // 先數總數才知道最後一頁是第幾頁，超出範圍的頁碼要收斂而不是回空陣列。
  const total = await conversationMaterials.countDocuments(filter)
  const page = limitToLastPage(query.page, total)

  const documents = await conversationMaterials
    .find(filter, { projection: materialListFields })
    .sort({ level: -1, _id: 1 })
    .skip((page - 1) * materialPageSize)
    .limit(materialPageSize)
    .toArray()

  return listingResponse(documents.map(replaceMongoIdWithId), total, page)
})
