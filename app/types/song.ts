import type { LangCode } from '~/types/lang'

export interface SongData {
  id: string
  title: string
  artist: string
  language: LangCode
  translation_langs: LangCode[]
  words: WordData[]
  lyrics: LyricData[]
}

export interface WordData {
  nanoids?: string[]
  word: string
}
export interface LyricData {
  nanoid: string
  start: number
  end: number
  ja?: string
  kr?: string
  en?: string
  tw?: string
  hk?: string
  zh: string
  ruby?: string
}

export interface SongsList {
  id: string
  language: LangCode
  title: string
  artist: string
  translation_langs: LangCode[]
  has_timestamp: boolean
}
