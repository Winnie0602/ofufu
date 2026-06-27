import type { TatoebaResults } from '~/types/tatoeba'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    from: string
    to: string
    query: string
  }

  const ori = await $fetch<TatoebaResults>(
    'https://tatoeba.org/zh-tw/api_v0/search',
    {
      params: {
        from: query.from,
        to: query.to,
        query: query.query,
        include: 'translations',
        orphans: 'no',
        unapproved: 'no',
        sort: 'relevance',
        limit: 5,
      },
    },
  )

  const seen = new Set<string>()

  const result = ori.results
    .filter((data) => {
      if (data.text.length < 8) return false
      if (!data.text.includes(query.query)) return false

      return true
    })

    // 去重
    .filter((data) => {
      if (seen.has(data.text)) return false
      seen.add(data.text)
      return true
    })

    .map((data) => {
      const transcription = data.transcriptions.find((e) => e.html)
      const pre_translation = data.translations.find((e) => e.length !== 0)
      const translation = pre_translation?.find((e) => e.text)

      return {
        text: data.text,
        html: transcription?.html ?? '',
        translations: translation?.text ?? '',
        lang: query.to,
      }
    })

  return result
})
