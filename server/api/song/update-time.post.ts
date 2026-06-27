import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { videoId, lyrics } = body

  const { db } = await connectToDatabase()

  const operations = lyrics.map(
    (line: { nanoid: string; start?: number; end?: number }) => {
      const setData: Record<string, number> = {}

      if (line.start !== undefined) {
        setData['lyrics.$[elem].start'] = line.start
      }

      if (line.end !== undefined) {
        setData['lyrics.$[elem].end'] = line.end
      }

      return {
        updateOne: {
          filter: { id: videoId },
          update: {
            $set: setData,
          },
          arrayFilters: [{ 'elem.nanoid': line.nanoid }],
        },
      }
    },
  )

  await db.collection('songs').bulkWrite(operations)

  await db
    .collection('list')
    .updateOne({ id: videoId }, { $set: { has_timestamp: true } })

  return { success: true }
})
