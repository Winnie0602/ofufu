import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { videoId, words } = body

  const { db } = await connectToDatabase()

  await db.collection('songs').updateOne({ id: videoId }, { $set: { words } })

  return { success: true }
})
