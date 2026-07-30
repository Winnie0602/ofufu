import { createHash } from 'node:crypto'
import textToSpeech from '@google-cloud/text-to-speech'
import {
  findSpeechSource,
  isSpeechMaterialType,
  type SpeechSource,
  type SpeechTarget,
} from '~~/server/utils/speechSource'

/**
 * 教材語音合成。
 *
 * **只接受內容座標，不接受文字。** body 是 `SpeechTarget`（教材類型＋教材 id＋單位 id），
 * 伺服器自己去教材裡查出要唸的字與 voice。這樣公開環境的使用者無法丟任意文字進來
 * 觸發付費合成，也無法指定 voice。
 *
 *   POST /api/tts
 *   { "materialType": "conversation", "materialId": "C7Km3pQx92Ab", "unitId": "CvLn1qT7mN3pH" }
 *   →  { "audioContent": "<base64 MP3>" }
 *
 * 查不到座標一律 404，不會進入合成。
 */

/**
 * 單次合成的字數上限。教材目前最長的一句約 73 字，200 已經很寬鬆；
 * 真的超過代表教材內容出了問題，不該默默送去計費。
 */
const maxSpeechTextLength = 200

/**
 * 行程內音檔快取：同一句＋同一個 voice 只會跟 Google 要一次。
 *
 * key 用「voice ＋ 純文字」的雜湊，所以教材文字改了就會自然變成另一個 key，
 * 不會誤用舊音檔。階段 2 會把這層換成 MongoDB 的 `audio_cache`，屆時重啟也能命中；
 * 現在重啟就清空，只是少省一點錢，功能不受影響。
 */
const audioCache = new Map<string, string>()

/**
 * 正在合成中的請求。
 *
 * 只有 `audioCache` 的話，同一句被同時點 20 次會有 20 個請求都在寫入快取前就查完、
 * 全部跑去跟 Google 要一次——第一次點播反而是最貴的。所以合成中的 Promise 也要共用：
 * 第一個負責合成，其他人等同一個結果。成功或失敗都要清掉，失敗後下一次才重試得了。
 */
const pendingAudio = new Map<string, Promise<string>>()

const cacheKeyOf = (voiceName: string, text: string) =>
  createHash('sha256').update(`${voiceName}|${text}`).digest('hex').slice(0, 32)

let client: textToSpeech.TextToSpeechClient | null = null

// 憑證在第一次真的要合成時才讀。放在模組頂層的話，沒設 GOOGLE_CREDENTIALS 的環境
// 會在載入這支 route 時就整個炸掉，連「語音停用」的路徑都走不到。
const getClient = () => {
  if (client) return client

  const credentials = process.env.GOOGLE_CREDENTIALS
  if (!credentials) {
    throw createError({
      statusCode: 503,
      message: '尚未設定語音合成憑證',
    })
  }

  client = new textToSpeech.TextToSpeechClient({
    credentials: JSON.parse(credentials),
  })
  return client
}

const readSpeechTarget = (body: unknown): SpeechTarget => {
  const { materialType, materialId, unitId } = (body ?? {}) as Record<
    string,
    unknown
  >

  if (
    !isSpeechMaterialType(materialType) ||
    typeof materialId !== 'string' ||
    typeof unitId !== 'string' ||
    !materialId ||
    !unitId
  ) {
    throw createError({
      statusCode: 400,
      message: '語音請求需要 materialType、materialId 與 unitId',
    })
  }

  return { materialType, materialId, unitId }
}

const synthesize = async (source: SpeechSource) => {
  const [response] = await getClient().synthesizeSpeech({
    input: { text: source.text },
    voice: {
      languageCode: 'ja-JP',
      name: source.voiceName,
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  })

  return Buffer.from(response.audioContent as Buffer).toString('base64')
}

export default defineEventHandler(async (event) => {
  const { ttsEnabled } = useRuntimeConfig()
  if (!ttsEnabled) {
    throw createError({ statusCode: 503, message: '語音合成暫時停用' })
  }

  const target = readSpeechTarget(await readBody(event))
  const source = await findSpeechSource(target)

  if (!source) {
    throw createError({ statusCode: 404, message: '找不到要朗讀的內容' })
  }

  if (source.text.length > maxSpeechTextLength) {
    throw createError({
      statusCode: 400,
      message: `要朗讀的內容超過 ${maxSpeechTextLength} 字`,
    })
  }

  const cacheKey = cacheKeyOf(source.voiceName, source.text)
  const cached = audioCache.get(cacheKey)
  if (cached) return { audioContent: cached }

  let pending = pendingAudio.get(cacheKey)
  if (!pending) {
    pending = synthesize(source)
      .then((audioContent) => {
        audioCache.set(cacheKey, audioContent)
        return audioContent
      })
      .finally(() => pendingAudio.delete(cacheKey))
    pendingAudio.set(cacheKey, pending)
  }

  return { audioContent: await pending }
})
