// UI顯示用
export type Tab = '한국어' | '日本語' | '臺語' | 'English' | '廣東話' | '中文'

// DB欄位
export type LangCode = 'kr' | 'ja' | 'tw' | 'en' | 'hk' | 'zh'

// i18n
export type I18nLocale = 'ko' | 'ja' | 'en' | 'zh'

// ui轉db code
export const languageMapCode: Record<Tab, LangCode> = {
  English: 'en',
  日本語: 'ja',
  臺語: 'tw',
  한국어: 'kr',
  廣東話: 'hk',
  中文: 'zh',
}

// 反轉
// db code轉ui
const entries = Object.entries(languageMapCode)

const reversed = entries.map(([code, label]) => {
  return [label, code]
})

export const languageMapCodeLabel = Object.fromEntries(reversed)
// ****

// db code 轉 Tatoeba API & TTS API 對照表
export const LANG_CONFIG_MAP: Record<
  LangCode,
  {
    tatoeba: string
    ttsCode: string
    ttsName: string
  }
> = {
  kr: { tatoeba: 'kor', ttsCode: 'ko-KR', ttsName: 'ko-KR-Wavenet-A' },
  ja: { tatoeba: 'jpn', ttsCode: 'ja-JP', ttsName: 'ja-JP-Wavenet-A' },
  en: { tatoeba: 'eng', ttsCode: 'en-US', ttsName: 'en-US-Wavenet-D' },
  tw: { tatoeba: 'cmn', ttsCode: 'zh-TW', ttsName: 'cmn-TW-Wavenet-A' },
  zh: { tatoeba: 'cmn', ttsCode: 'zh-TW', ttsName: 'cmn-TW-Wavenet-A' },
  hk: { tatoeba: 'cmn', ttsCode: 'zh-TW', ttsName: 'cmn-TW-Wavenet-A' },
}

export const DB_TO_I18N: Record<LangCode, I18nLocale> = {
  kr: 'ko',
  ja: 'ja',
  en: 'en',
  zh: 'zh',
  tw: 'zh',
  hk: 'zh',
}

export const I18N_TO_DB: Record<I18nLocale, LangCode> = {
  ko: 'kr',
  ja: 'ja',
  en: 'en',
  zh: 'zh',
}
