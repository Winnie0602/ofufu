import { getQuery } from 'h3'
import { connectToDatabase } from '~~/server/utils/mongodb'
import type { VideosList } from '~/types/video'
import type { LangCode } from '~/types/lang'

export default defineEventHandler(async (event) => {
  const { db } = await connectToDatabase()
  const query = getQuery(event)

  const language = query.language as string

  const page = Number(query.page || 1)

  const limit = Number(query.limit || 10)
  const skip = (page - 1) * limit // 要跳過幾筆 ex第一頁跳過0筆 第二頁跳過limit筆

  const sortOrder = query.sort === 'asc' ? 1 : -1

  // Partial --> 可選欄位
  const filter: Partial<Pick<VideosList, 'language'>> = {}

  if (language !== 'all') filter.language = language as LangCode

  const collection = db.collection<VideosList>('videos')

  const [videos, total] = await Promise.all([
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
    videos,
    total,
    page,
    totalPages,
  }
})
