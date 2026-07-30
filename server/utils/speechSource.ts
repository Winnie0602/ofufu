import type { CharacterAvatarKey } from '~/types/conversation'
import type { SpeechMaterialType } from '~/types/material'
import { speechMaterialTypes } from '~/types/material'
import { toPlainJapanese } from '~/utils/parseRuby'
import { getMaterialCollections } from '~~/server/utils/materialCollections'

/**
 * 「要唸哪一句」的座標。
 *
 * `/api/tts` 的 request body 就是這個——**前端無法提交任意文字或任意 voice 名稱**，
 * 只能指出教材裡的某一個位置，要唸什麼字、用誰的聲音都由伺服器決定。
 *
 * `materialType` 沿用 `types/material.ts` 既有的教材類型，不另創 scope 字彙。
 */
export type SpeechTarget = {
  materialType: SpeechMaterialType
  materialId: string
  unitId: string
}

/** 查出來的結果：要唸的字，和用誰的聲音。 */
export type SpeechSource = {
  /** 已用 `toPlainJapanese()` 剝掉括號 Ruby 的純日文。 */
  text: string
  voiceName: string
}

/** 對話三個固定角色的聲音。這份表只存在伺服器，等於 voice 的 allowlist。 */
const characterVoiceMap: Record<CharacterAvatarKey, string> = {
  fufu: 'ja-JP-Neural2-B', // 女聲
  shiro: 'ja-JP-Neural2-C', // 男聲
  kuro: 'ja-JP-Neural2-D', // 男聲（音色較低）
}

/** 閱讀與單字一律用這個聲音；對話查不到說話者時也退回這個。 */
const defaultJapaneseVoice = 'ja-JP-Neural2-B'

const withDefaultVoice = (text: string): SpeechSource => ({
  text: toPlainJapanese(text),
  voiceName: defaultJapaneseVoice,
})

/**
 * 單字：一筆單字自成一篇「教材」，`materialId` 就是 `VocabularyItem.id`。
 * 單位有兩種——單字本體（唸 `word`）與它的例句（唸 `example.japanese`），
 * 單字列表頁兩種都會播。
 */
const findVocabularySource = async (
  target: SpeechTarget,
): Promise<SpeechSource | null> => {
  const { vocabularyItems } = await getMaterialCollections()
  const item = await vocabularyItems.findOne({ _id: target.materialId })
  if (!item) return null

  if (target.unitId === target.materialId) return withDefaultVoice(item.word)

  const example = item.examples.find(({ id }) => id === target.unitId)
  return example ? withDefaultVoice(example.japanese) : null
}

/** 閱讀：單位是句子（`ReadingSentence.id`）與句中的單字註解。 */
const findReadingSource = async (
  target: SpeechTarget,
): Promise<SpeechSource | null> => {
  const { readingMaterials } = await getMaterialCollections()
  const material = await readingMaterials.findOne({ _id: target.materialId })
  if (!material) return null

  const sentences = material.paragraphs.flatMap(
    (paragraph) => paragraph.sentences,
  )

  const sentence = sentences.find(({ id }) => id === target.unitId)
  if (sentence) return withDefaultVoice(sentence.text)

  const note = sentences
    .flatMap((item) => item.vocabularyNotes ?? [])
    .find(({ id }) => id === target.unitId)

  return note ? withDefaultVoice(note.surface) : null
}

/**
 * 對話：單位是台詞（`ConversationLine.id`）與台詞裡的單字註解。
 *
 * 台詞的聲音靠 `line.speakerId → participant.avatarKey` 查出來，
 * 所以**不需要在教材資料裡新增任何欄位**，現有的三個固定角色就夠用。
 * 單字註解播的是單字表層形，一律用預設的旁白聲。
 */
const findConversationSource = async (
  target: SpeechTarget,
): Promise<SpeechSource | null> => {
  const { conversationMaterials } = await getMaterialCollections()
  const material = await conversationMaterials.findOne({
    _id: target.materialId,
  })
  if (!material) return null

  const line = material.lines.find(({ id }) => id === target.unitId)
  if (line) {
    const speaker = material.participants.find(({ id }) => id === line.speakerId)
    return {
      text: toPlainJapanese(line.text),
      voiceName: speaker
        ? characterVoiceMap[speaker.avatarKey]
        : defaultJapaneseVoice,
    }
  }

  const note = material.lines
    .flatMap((item) => item.vocabularyNotes ?? [])
    .find(({ id }) => id === target.unitId)

  return note ? withDefaultVoice(note.surface) : null
}

const sourceFinders: Record<
  SpeechMaterialType,
  (target: SpeechTarget) => Promise<SpeechSource | null>
> = {
  vocabulary: findVocabularySource,
  reading: findReadingSource,
  conversation: findConversationSource,
}

/** 擋掉 request body 裡亂寫的 `materialType`，不讓它變成查表的 key。 */
export const isSpeechMaterialType = (
  value: unknown,
): value is SpeechMaterialType =>
  speechMaterialTypes.includes(value as SpeechMaterialType)

/**
 * 依座標查出「要唸的字」與「用誰的聲音」。查不到就是 `null`，呼叫端回 404。
 *
 *   findSpeechSource({ materialType: 'conversation', materialId: 'C7Km…', unitId: 'CvLn…' })
 *   →  { text: 'お電話ありがとうございます。', voiceName: 'ja-JP-Neural2-C' }
 *
 * 資料來自 MongoDB。合成結果本來就有快取，所以同一句不會反覆查資料庫又反覆合成。
 */
export async function findSpeechSource(
  target: SpeechTarget,
): Promise<SpeechSource | null> {
  return sourceFinders[target.materialType](target)
}
