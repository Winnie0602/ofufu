import { createError, defineEventHandler, getRouterParam } from 'h3'
import {
  getMaterialCollections,
  replaceMongoIdWithId,
} from '~~/server/utils/materialCollections'
import {
  addExamplesToVocabularyNotes,
  collectReadingNotes,
} from '~~/server/utils/materialQuery'

/** 單篇閱讀教材，單字註解的例句已在伺服器端併好。 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { readingMaterials } = await getMaterialCollections()
  const material = id ? await readingMaterials.findOne({ _id: id }) : null

  if (!material) {
    throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
  }

  await addExamplesToVocabularyNotes(collectReadingNotes(material))

  return replaceMongoIdWithId(material)
})
