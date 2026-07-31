import type { AudioPlaybackState } from '~/types/audio'
import type { SpeechMaterialType } from '~/types/material'

/**
 * 這次播放屬於哪種教材、哪一份教材。
 *
 * 閱讀／對話詳情頁整頁只對應一份教材，因此建立 useTtsAudio 時就能傳入 materialId。
 * 單字列表一頁有很多筆單字，materialId 會隨播放按鈕改變，所以建立時可以不傳，
 * 改由每次播放的 PlayTtsAudioPayload 提供。
 */
export type TtsMaterialSource = {
  materialType: SpeechMaterialType
  materialId?: string
}

/**
 * 一次要播放的教材內容。
 *
 * audioId 可以是單字、例句、閱讀句子、對話台詞或單字註解的 ID。
 * 送到 `/api/tts` 時會放進 unitId；前端也用它判斷哪顆按鈕正在載入或播放。
 *
 * 前端不傳朗讀文字。伺服器會用 materialType、materialId、unitId 從教材資料找文字。
 */
export interface PlayTtsAudioPayload {
  audioId: string
  /** 單字頁用來指出這次播放屬於哪筆單字；閱讀／對話已在建立 useTtsAudio 時傳入。 */
  materialId?: string
}

type PlayAudioOptions = {
  toggleWhenActive: boolean
}

/**
 * 教材語音的前端播放工具。
 *
 * 它會把教材座標送到 `/api/tts`，收到 Base64 MP3 後交給瀏覽器 Audio 播放。
 * 它不決定朗讀文字或 voice，那些由伺服器處理。
 *
 * 閱讀頁的使用方式：
 *
 *   const { audioState, togglePlay } = useTtsAudio({
 *     materialType: 'reading',
 *     materialId: material.id,
 *   })
 *
 *   togglePlay({ audioId: sentence.id })
 *   audioState(sentence.id)   →  'loading' → 'playing' → 'idle'
 *
 * ## 播放限制
 *
 * 每個 useTtsAudio 實例只使用一個瀏覽器 Audio 物件。
 * 播放新內容前會停止舊內容，因此同一個實例不會同時播放兩段聲音。
 *
 * ## 三種播放方式
 *
 * | 函式 | 用在哪 | 行為 |
 * | --- | --- | --- |
 * | `togglePlay` | 單字／句子／台詞旁的播放鍵 | 開始播放；同一顆再按一次就停止 |
 * | `playAll` | 整篇文章／整段對話 | 等上一句結束後自動播放下一句 |
 * | `playAndWait` | 對話角色扮演 | 等一段結束並回報是否自然播完 |
 *
 * 角色扮演只有在對方台詞自然播完時才能前進；若中途被停止，playAndWait 會回傳 false。
 *
 * ## 防止舊請求回來播放
 *
 * 使用者可能在 A 的 API 尚未回來前改播 B。requestVersion 和 pendingPlayVersion
 * 用來辨認已過期的 A 請求及連播流程，避免它回來後蓋掉 B 或繼續播放下一句。
 *
 * @param source 教材種類，以及可預先確定的教材 ID。
 * @param options.playbackRate 播放速度；傳入 ref 時，播放中改速會立即生效。
 */
export const useTtsAudio = (
  source: TtsMaterialSource,
  options: { playbackRate?: MaybeRefOrGetter<number> } = {},
) => {
  const loadingAudioId = ref<string | null>(null)
  const playingAudioId = ref<string | null>(null)
  const { show: showToast } = useToast()
  let audio: HTMLAudioElement | null = null
  // 單次 API 請求版本：停止或切換內容後，舊回應即使較晚回來也不播放。
  let requestVersion = 0
  // 播放流程版本：停止後讓 playAll 迴圈和 playAndWait 等待一起失效。
  let pendingPlayVersion = 0
  let removeAudioListeners: (() => void) | null = null

  // 速度必須是正數；未提供或不合法時使用正常速度 1。
  const getPlaybackRate = () => {
    const rate = toValue(options.playbackRate) ?? 1
    return Number.isFinite(rate) && rate > 0 ? rate : 1
  }

  // 播放途中調整速度時，立即更新目前的 Audio。
  if (options.playbackRate !== undefined) {
    watch(getPlaybackRate, (rate) => {
      if (audio) audio.playbackRate = rate
    })
  }

  /**
   * 回傳指定內容目前的播放狀態，供 AudioButton 選擇圖示。
   *
   *   audioState('sV7cL3pT1wF')  →  'idle' | 'loading' | 'playing'
   */
  const audioState = (audioId: string): AudioPlaybackState => {
    if (loadingAudioId.value === audioId) return 'loading'
    if (playingAudioId.value === audioId) return 'playing'
    return 'idle'
  }

  /** 停止目前的聲音與 API 狀態，但不主動取消外層連播版本。 */
  const stopCurrentAudio = () => {
    requestVersion += 1

    // 移除上一段的事件，避免舊 Audio 事件修改新內容的按鈕狀態。
    removeAudioListeners?.()
    removeAudioListeners = null

    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }

    loadingAudioId.value = null
    playingAudioId.value = null
  }

  /** 停止目前聲音，並使整篇連播或角色扮演等待流程失效。 */
  const stopAudio = () => {
    // 整個播放流程的版本號:目前還在等待或連播的流程，是不是最新那一輪？
    pendingPlayVersion += 1
    stopCurrentAudio()
  }

  /**
   * 呼叫 `/api/tts` 取得 MP3 並開始播放，回傳是否成功開始。
   *
   * toggleWhenActive 為 true：再次點擊目前內容會停止。
   * toggleWhenActive 為 false：這是 playAll／playAndWait 的流程呼叫，不當成手動切換。
   */
  const requestAudio = async (
    { audioId, materialId }: PlayTtsAudioPayload,
    { toggleWhenActive }: PlayAudioOptions,
  ) => {
    // materialId 有兩個可能來源：
    // 1. 單字頁在這次播放的 payload 傳入 materialId。
    // 2. 閱讀／對話在建立 useTtsAudio 時，已放進 source.materialId。
    // 兩處都沒有時，API 無法知道要去哪份教材找內容，因此直接拋出明確錯誤。
    const targetMaterialId = materialId ?? source.materialId
    if (!targetMaterialId) {
      throw new Error(
        `useTtsAudio：${source.materialType} 的 ${audioId} 缺少 materialId，請在建立 composable 時或 payload 裡指定`,
      )
    }

    if (
      loadingAudioId.value === audioId ||
      playingAudioId.value === audioId
    ) {
      if (toggleWhenActive) {
        stopCurrentAudio()
        return false
      }
    }

    stopCurrentAudio()
    const currentRequestVersion = requestVersion
    loadingAudioId.value = audioId

    const handleFailure = (message: string) => {
      if (currentRequestVersion !== requestVersion) return
      stopAudio()
      showToast(message)
    }

    try {
      const response = await $fetch<{ audioContent: string }>('/api/tts', {
        method: 'POST',
        body: {
          materialType: source.materialType,
          materialId: targetMaterialId,
          unitId: audioId,
        },
      })

      // 等 API 時若使用者已停止或改播其他內容，忽略這份過期回應。
      if (currentRequestVersion !== requestVersion) return

      // 延遲建立並重複使用同一個瀏覽器 Audio，避免同一實例內聲音重疊。
      audio ??= new Audio()

      const handlePlaying = () => {
        if (currentRequestVersion !== requestVersion) return
        loadingAudioId.value = null
        playingAudioId.value = audioId
      }
      const handleEnded = () => {
        if (currentRequestVersion !== requestVersion) return
        loadingAudioId.value = null
        playingAudioId.value = null
        removeAudioListeners?.()
        removeAudioListeners = null
      }
      const handleError = () =>
        handleFailure('音訊播放失敗，請稍後再試。')

      audio.addEventListener('playing', handlePlaying)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
      removeAudioListeners = () => {
        audio?.removeEventListener('playing', handlePlaying)
        audio?.removeEventListener('ended', handleEnded)
        audio?.removeEventListener('error', handleError)
      }

      audio.src = `data:audio/mp3;base64,${response.audioContent}`
      // 同時設定預設與目前速度，避免部分瀏覽器載入音訊後把速度重設為 1。
      audio.defaultPlaybackRate = getPlaybackRate()
      audio.playbackRate = audio.defaultPlaybackRate
      await audio.play()
      return true
    } catch {
      handleFailure('無法產生語音，請稍後再試。')
      return false
    }
  }

  /**
   * 手動播放一個內容。開始播放後函式即可結束，不等待聲音播完；
   * 再次點擊同一內容時停止。
   */
  const togglePlay = async (payload: PlayTtsAudioPayload) => {
    pendingPlayVersion += 1
    await requestAudio(payload, { toggleWhenActive: true })
  }

  /**
   * 等待指定內容離開 loading／playing 狀態。
   * 自然播完、播放失敗、被停止或播放流程失效，都會結束等待。
   */
  const waitForAudioEnd = (audioId: string, currentPendingPlayVersion: number) =>
    new Promise<void>((resolve) => {
      if (
        currentPendingPlayVersion !== pendingPlayVersion ||
        (loadingAudioId.value !== audioId &&
          playingAudioId.value !== audioId)
      ) {
        resolve()
        return
      }

      const stopWatching = watch(
        [loadingAudioId, playingAudioId],
        () => {
          if (
            currentPendingPlayVersion !== pendingPlayVersion ||
            (loadingAudioId.value !== audioId &&
              playingAudioId.value !== audioId)
          ) {
            stopWatching()
            resolve()
          }
        },
      )
    })

  /**
   * 依清單順序連播文章句子或對話台詞。
   *
   *   playAll(sentences.map((sentence) => ({ audioId: sentence.id })))
   *
   * 每次只請求一筆，等這筆結束後才請求下一筆。
   * 使用者停止、切換模式或離開頁面後，版本失效，剩餘清單不再播放。
   */
  const playAll = async (items: PlayTtsAudioPayload[]) => {
    stopAudio()
    const currentPendingPlayVersion = pendingPlayVersion

    for (const item of items) {
      if (currentPendingPlayVersion !== pendingPlayVersion) return

      const started = await requestAudio(item, { toggleWhenActive: false })
      if (!started || currentPendingPlayVersion !== pendingPlayVersion) return

      await waitForAudioEnd(item.audioId, currentPendingPlayVersion)
    }
  }

  /**
   * 播放一筆並等待結束，供對話角色扮演控制下一步。
   *
   *   true   自然唸完 → 練習流程可以前進到下一句
   *   false  被停止、被切換、被手動點播打斷 → 停在原地
   *
   * 一般播放鍵使用 togglePlay，不需要等待結果。
   */
  const playAndWait = async (payload: PlayTtsAudioPayload) => {
    stopAudio()
    const currentPendingPlayVersion = pendingPlayVersion

    const started = await requestAudio(payload, { toggleWhenActive: false })
    if (!started || currentPendingPlayVersion !== pendingPlayVersion) return false

    await waitForAudioEnd(payload.audioId, currentPendingPlayVersion)
    return currentPendingPlayVersion === pendingPlayVersion
  }

  // 頁面或使用此 composable 的元件卸載時，停止聲音與未完成流程。
  onScopeDispose(stopAudio)

  return {
    audioState,
    togglePlay,
    playAll,
    playAndWait,
    stopAudio,
  }
}
