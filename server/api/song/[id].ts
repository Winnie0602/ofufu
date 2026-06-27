import { createError } from 'h3'
import { connectToDatabase } from '~~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id',
    })
  }

  const { db } = await connectToDatabase()

  const collection = db.collection('songs')

  const song = await collection.findOne({
    id,
  })

  if (!song) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Song not found',
    })
  }

  return song
})
