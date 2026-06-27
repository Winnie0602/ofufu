import { getQuery } from 'h3'
import { connectToDatabase } from '~~/server/utils/mongodb'
import type { SongsList } from '~/types/song'
import type { LangCode } from '~/types/lang'

export default defineEventHandler(async (event) => {
  const { db } = await connectToDatabase()
  const query = getQuery(event)

  const language = query.language as string
  const artist = query.artist as string | undefined

  const page = Number(query.page || 1)

  const limit = Number(query.limit || 10)
  const skip = (page - 1) * limit // 要跳過幾筆 ex第一頁跳過0筆 第二頁跳過limit筆

  const sortOrder = query.sort === 'asc' ? 1 : -1

  // Partial --> 可選欄位
  const filter: Partial<Pick<SongsList, 'language' | 'artist'>> = {}

  if (language !== 'all') filter.language = language as LangCode
  if (artist) filter.artist = artist

  const collection = db.collection<SongsList>('list')

  const [songs, total] = await Promise.all([
    collection
      .find(filter)
      .sort({ _id: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray(),
    collection.countDocuments(filter),
  ])

  const totalPages = Math.ceil(total / limit)

  return {
    songs,
    total,
    page,
    totalPages,
  }
})
