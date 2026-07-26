import { conversationMaterials } from '~/data/materials/conversation'
import { readingMaterials } from '~/data/materials/reading'
import { vocabularyItems } from '~/data/materials/vocabulary'
import type { CharacterAvatarKey } from '~/types/conversation'
import type {
  MaterialVocabularyNote,
  SpeechMaterialType,
} from '~/types/material'
import { speechMaterialTypes } from '~/types/material'
import { toPlainJapanese } from '~/utils/parseRuby'

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

/** 內文的單字 Popover 播的是單字表層形，聲音一律用預設的旁白聲。 */
const noteUnits = (
  notes: MaterialVocabularyNote[] | undefined,
): [string, SpeechSource][] =>
  (notes ?? []).map((note) => [
    note.id,
    { text: toPlainJapanese(note.surface), voiceName: defaultJapaneseVoice },
  ])

/**
 * 單字：一筆單字自成一篇「教材」，`materialId` 就是 `VocabularyItem.id`。
 * 單位有兩種——單字本體（唸 `word`）與它的例句（唸 `example.japanese`），
 * 單字列表頁兩種都會播。
 */
const buildVocabularyUnits = (): Map<string, Map<string, SpeechSource>> =>
  new Map(
    vocabularyItems.map((item) => [
      item.id,
      new Map<string, SpeechSource>([
        [item.id, { text: item.word, voiceName: defaultJapaneseVoice }],
        ...item.examples.map(
          (example): [string, SpeechSource] => [
            example.id,
            { text: example.japanese, voiceName: defaultJapaneseVoice },
          ],
        ),
      ]),
    ]),
  )

/** 閱讀：單位是句子（`ReadingSentence.id`）與句中的單字註解。 */
const buildReadingUnits = (): Map<string, Map<string, SpeechSource>> =>
  new Map(
    readingMaterials.map((material) => {
      const sentences = material.paragraphs.flatMap(
        (paragraph) => paragraph.sentences,
      )
      return [
        material.id,
        new Map<string, SpeechSource>([
          ...sentences.map(
            (sentence): [string, SpeechSource] => [
              sentence.id,
              {
                text: toPlainJapanese(sentence.text),
                voiceName: defaultJapaneseVoice,
              },
            ],
          ),
          ...sentences.flatMap((sentence) =>
            noteUnits(sentence.vocabularyNotes),
          ),
        ]),
      ]
    }),
  )

/**
 * 對話：單位是台詞（`ConversationLine.id`）與台詞裡的單字註解。
 *
 * 台詞的聲音靠 `line.speakerId → participant.avatarKey` 查出來，
 * 所以**不需要在教材資料裡新增任何欄位**，現有的三個固定角色就夠用。
 */
const buildConversationUnits = (): Map<string, Map<string, SpeechSource>> =>
  new Map(
    conversationMaterials.map((material) => {
      const voiceOf = new Map(
        material.participants.map((participant) => [
          participant.id,
          characterVoiceMap[participant.avatarKey],
        ]),
      )
      return [
        material.id,
        new Map<string, SpeechSource>([
          ...material.lines.map(
            (line): [string, SpeechSource] => [
              line.id,
              {
                text: toPlainJapanese(line.text),
                voiceName: voiceOf.get(line.speakerId) ?? defaultJapaneseVoice,
              },
            ],
          ),
          ...material.lines.flatMap((line) => noteUnits(line.vocabularyNotes)),
        ]),
      ]
    }),
  )

// 第一次查詢時才建，之後整個行程共用。教材是編譯進來的常數，建好就不會變。
const unitBuilders: Record<
  SpeechMaterialType,
  () => Map<string, Map<string, SpeechSource>>
> = {
  vocabulary: buildVocabularyUnits,
  reading: buildReadingUnits,
  conversation: buildConversationUnits,
}
const unitsByType = new Map<
  SpeechMaterialType,
  Map<string, Map<string, SpeechSource>>
>()

const getUnits = (materialType: SpeechMaterialType) => {
  let units = unitsByType.get(materialType)
  if (!units) {
    units = unitBuilders[materialType]()
    unitsByType.set(materialType, units)
  }
  return units
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
 * 目前直接讀 `app/data/materials/*`（server 的 `~/*` 指向 `app/*`）。
 * 階段 1 換成讀 MongoDB 時只改這個檔案的內部實作，簽章不變，`/api/tts` 一行都不用動——
 * 所以這裡是非同步的，即使現在還不需要等任何東西。
 */
export async function findSpeechSource(
  target: SpeechTarget,
): Promise<SpeechSource | null> {
  return (
    getUnits(target.materialType).get(target.materialId)?.get(target.unitId) ??
    null
  )
}
