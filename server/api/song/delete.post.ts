export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { videoId } = body

  if (!videoId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'no videoId',
    })
  }

  const { db } = await connectToDatabase()

  await Promise.all([
    db.collection('songs').deleteOne({ id: videoId }),
    db.collection('list').deleteOne({ id: videoId }),
  ])

  return { success: true }
})
