export interface TatoebaResults {
  results: TatoebaResultItem[]
}

export interface TatoebaResultItem {
  text: string
  transcriptions: TatoebaTranscriptionItem[]
  translations: TatoebaTranslationItem[][]
}

export interface TatoebaTranscriptionItem {
  html: string
}

export interface TatoebaTranslationItem {
  text: string
}

export interface DisplayAPIResult {
  text: string
  html: string
  translations: string
  lang: string
}
