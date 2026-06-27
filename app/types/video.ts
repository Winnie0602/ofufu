import type { LangCode } from '~/types/lang'

export interface VideosList {
  language: LangCode
  type: string
  name: string
  nanoid: string
  episode: EpisodeData[]
}

export interface EpisodeData {
  name: string
  videoId: string
}
