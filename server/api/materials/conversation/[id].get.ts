import { createError, defineEventHandler, getRouterParam } from 'h3'
import {
  getMaterialCollections,
  replaceMongoIdWithId,
} from '~~/server/utils/materialCollections'
import {
  addExamplesToVocabularyNotes,
  collectConversationNotes,
} from '~~/server/utils/materialQuery'

/** 單篇對話教材，單字註解的例句已在伺服器端併好。 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { conversationMaterials } = await getMaterialCollections()
  const material = id ? await conversationMaterials.findOne({ _id: id }) : null

  if (!material) {
    throw createError({ statusCode: 404, statusMessage: '找不到這則對話' })
  }

  await addExamplesToVocabularyNotes(collectConversationNotes(material))

  return replaceMongoIdWithId(material)
})
