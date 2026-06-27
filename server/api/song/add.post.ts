import type { LangCode } from '~/types/lang'

interface oriSongData {
  videoId: string
  title: string
  artist: string
  language: LangCode
  lyrics: {
    nanoid: string
    ja?: string
    en?: string
    kr?: string
    zh?: string
    tw?: string
    hk?: string
  }[]
}

// param original - どこかで鐘(かね)が鳴(な)って
// returns string - <ruby>鐘<rt>かね</rt></ruby>が<ruby>鳴<rt>な</rt></ruby>って
function generateRuby(original: string) {
  return original.replace(
    /([一-龯々]+)\(([^)]+)\)/g,
    '<ruby>$1<rt>$2</rt></ruby>',
  )
}
// param original - どこかで鐘(かね)が鳴(な)って
// returns string - どこかで鐘が鳴って
function generateJapanese(original: string) {
  return original.replace(/\(([^)]+)\)/g, '')
}

export default defineEventHandler(async (event) => {
  const { payload } = (await readBody(event)) as { payload: oriSongData }

  const { title, videoId, language, artist, lyrics } = payload

  if (!videoId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id',
    })
  }

  const resultLyrics = lyrics.map((lyric) => {
    if (language === 'ja' && lyric.ja) {
      return {
        nanoid: lyric.nanoid,
        ja: generateJapanese(lyric.ja),
        ruby: generateRuby(lyric.ja),
      }
    } else {
      let value: string | undefined

      switch (language) {
        case 'en':
          value = lyric.en
          break
        case 'zh':
          value = lyric.zh
          break
        case 'kr':
          value = lyric.kr
          break
        case 'tw':
          value = lyric.tw
          break
        case 'hk':
          value = lyric.hk
          break
        default:
          value = undefined
      }

      return {
        nanoid: lyric.nanoid,
        [language]: value ?? '',
      }
    }
  })

  const { db } = await connectToDatabase()

  // 新增一筆該歌曲資料
  await db.collection('songs').insertOne({
    title,
    id: videoId,
    language,
    translation_langs: [],
    artist,
    lyrics: resultLyrics,
  })

  // 新增一筆歌曲資料到列表
  await db.collection('list').insertOne({
    id: videoId,
    title,
    language,
    artist,
    translation_langs: [],
    has_timestamp: false,
  })

  return { success: true }
})
