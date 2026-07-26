import type { AudioPlaybackState } from '~/types/audio'
import type { SpeechMaterialType } from '~/types/material'

/**
 * 這個 composable 負責唸「哪一篇教材」。
 *
 * `materialId` 之所以可以不填，是因為單字列表頁的一顆顆播放鍵屬於不同的單字，
 * 而單字表裡**一筆單字就是一篇教材**（見 task-011 定案一）。那一頁只建立一個
 * composable（才能維持「同時只播一段」），所以改由每次 payload 指定是哪一筆。
 * 閱讀與對話詳情頁整頁就是一篇教材，在這裡填好，呼叫端只要給 `audioId`。
 */
export type TtsMaterialSource = {
  materialType: SpeechMaterialType
  materialId?: string
}

/**
 * 要唸的一個單位。
 *
 * `audioId` 就是教材裡那個單位的 id（句子、台詞、單字、例句、單字註解），
 * 送到 `/api/tts` 當 `unitId`，同時讓畫面知道「現在正在唸的是哪一句」，
 * 好把那顆按鈕變成播放中的樣子。
 *
 * **要唸的文字不由前端決定**——伺服器依座標自己去教材裡查，所以這裡沒有 `text`。
 */
export interface PlayTtsAudioPayload {
  audioId: string
  /** 只有單字頁需要：指定這顆按鈕屬於哪一筆單字。其餘教材在建立 composable 時就填好了。 */
  materialId?: string
}

type PlayAudioOptions = {
  toggleWhenActive: boolean
}

/**
 * 教材語音播放。
 *
 * 教材沒有預先錄好的音檔，是即時送到 `/api/tts` 換一段 base64 音訊回來播。
 * 送過去的只有「要唸教材裡的哪個位置」，文字與聲音都由伺服器決定，
 * 前端沒有辦法讓它唸任意文字。
 *
 *   const { audioState, togglePlay } = useTtsAudio({
 *     materialType: 'reading',
 *     materialId: material.id,
 *   })
 *
 *   togglePlay({ audioId: sentence.id })
 *   audioState(sentence.id)   →  'loading' → 'playing' → 'idle'
 *
 * ## 一次只播一段
 *
 * 整個 composable 只有一個 `Audio` 物件。點了 B 句，A 句就會被停掉，
 * 不會兩句疊在一起唸。所以頁面上再多顆播放鈕，同時最多只有一顆在動。
 *
 * ## 三個播放入口，差在「要不要等它唸完」
 *
 * | 函式 | 用在哪 | 行為 |
 * | --- | --- | --- |
 * | `togglePlay` | 每句旁邊的小喇叭 | 播下去就回來，不等；同一句再按一次是停止 |
 * | `playAll` | 整篇／整段自動播放 | 一句唸完才接下一句 |
 * | `playAndWait` | 對話角色扮演逐句練習 | 播一句並等到唸完，回傳「是不是自然唸完的」 |
 *
 * `playAndWait` 之所以要回傳結果，是因為練習流程要靠它決定「可以前進到下一句了嗎」——
 * 如果是被使用者中途按停的，就不該自動往下跑。
 *
 * ## 為什麼有一堆版本號
 *
 * 語音是非同步拿回來的，使用者卻可以隨時亂點。想像這個順序：
 *
 *   1. 點 A 句 → 送出請求，等 API
 *   2. 不耐煩，改點 B 句 → 送出另一個請求
 *   3. A 的回應才姍姍來遲
 *
 * 沒有防護的話，A 的回應會覆蓋掉 B 的播放狀態，畫面就錯亂了。
 *
 * `requestVersion`／`pendingPlayVersion` 是流水號，像餐廳叫號：每次停止或切換就換一批新號碼。
 * 非同步工作開始前先記下「我拿的是 3 號」，回來時看看現在叫到幾號——
 * 已經 5 號了就代表使用者早就換去別的，這輪安靜退場，不要去動畫面。
 *
 * @param source       這個 composable 唸的是哪一篇教材。
 * @param options.playbackRate 播放速度。傳 ref 進來的話，播放中調整會即時生效。
 */
export const useTtsAudio = (
  source: TtsMaterialSource,
  options: { playbackRate?: MaybeRefOrGetter<number> } = {},
) => {
  const loadingAudioId = ref<string | null>(null)
  const playingAudioId = ref<string | null>(null)
  const { show: showToast } = useToast()
  let audio: HTMLAudioElement | null = null
  // 守「一次請求」：每次停止或切換播放都 +1，讓比較晚回來的 TTS 回應自動作廢。
  let requestVersion = 0
  // 守「還在等的播放」：playAll 的迴圈與 playAndWait 的等待都靠它知道自己是不是已經過期。
  let pendingPlayVersion = 0
  let removeAudioListeners: (() => void) | null = null

  // 速度收斂成合法正數。沒給或給了怪東西一律當 1，免得把 playbackRate 設成 0 或 NaN 讓音訊卡住。
  const getPlaybackRate = () => {
    const rate = toValue(options.playbackRate) ?? 1
    return Number.isFinite(rate) && rate > 0 ? rate : 1
  }

  // 播到一半改速度：使用者拉了速度選單，正在唸的這句立刻變速，不用等下一句。
  if (options.playbackRate !== undefined) {
    watch(getPlaybackRate, (rate) => {
      if (audio) audio.playbackRate = rate
    })
  }

  /**
   * 這句現在是什麼狀態，給按鈕決定要顯示轉圈、停止還是播放圖示。
   *
   *   audioState('sV7cL3pT1wF')  →  'idle' | 'loading' | 'playing'
   */
  const audioState = (audioId: string): AudioPlaybackState => {
    if (loadingAudioId.value === audioId) return 'loading'
    if (playingAudioId.value === audioId) return 'playing'
    return 'idle'
  }

  /** 停掉目前這一段（不影響連播迴圈）。 */
  const stopCurrentAudio = () => {
    requestVersion += 1

    // 先拆掉上一段的事件，否則它結束時會回頭把現在這顆按鈕的狀態改掉。
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

  /** 全部停掉，包含還在跑的連播。 */
  const stopAudio = () => {
    pendingPlayVersion += 1
    stopCurrentAudio()
  }

  /**
   * 實際去要音訊並播放。回傳「有沒有真的開始播」。
   *
   * `toggleWhenActive` 決定「對著正在播的那句再呼叫一次」會怎樣：
   * - true（逐句按鈕）：停止，當作使用者要關掉
   * - false（連播中）：照播，因為那是流程推進不是使用者在按
   */
  const requestAudio = async (
    { audioId, materialId }: PlayTtsAudioPayload,
    { toggleWhenActive }: PlayAudioOptions,
  ) => {
    // 兩邊都沒填是呼叫端寫錯，直接吵出來；靜默失敗只會變成「按了沒反應」很難查。
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

      // 等待期間使用者可能已經切走或按停，這時舊回應直接丟掉。
      if (currentRequestVersion !== requestVersion) return

      // 整個 composable 共用一顆 Audio，這是「同時只播一段」的實作方式。
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
      // 兩個都設：defaultPlaybackRate 讓載入完成後仍套用，playbackRate 讓它立刻生效。
      // 只設一個的話，部分瀏覽器會在載入音訊時把速度重設回 1。
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
   * 播一句，不等它唸完就回來。給每句旁邊的小喇叭用。
   * 對著正在播的那句再按一次＝停止。
   */
  const togglePlay = async (payload: PlayTtsAudioPayload) => {
    pendingPlayVersion += 1
    await requestAudio(payload, { toggleWhenActive: true })
  }

  /**
   * 等某一句唸完（或被打斷）。
   *
   * `<audio>` 的 ended 事件已經被 `requestAudio` 用掉了，所以這裡改成監看
   * loading／playing 兩個 ref：只要這句不再是它們其中之一，就代表結束了。
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
   * 一句接一句連播，給「播放整篇文章」「自動播放對話」用。
   *
   *   playAll(sentences.map((sentence) => ({ audioId: sentence.id })))
   *
   * 中途被停掉（使用者按停、切換模式、離開頁面）就直接結束，不會硬把剩下的唸完。
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
   * 播一句並等到唸完，回傳「是不是好好唸完的」。
   *
   *   true   自然唸完 → 練習流程可以前進到下一句
   *   false  被停止、被切換、被手動點播打斷 → 停在原地
   *
   * 對話的角色扮演逐句練習用這個：對方的台詞自動唸完才輪到你。
   * 一般逐句小喇叭不走這裡（那個不該卡住畫面）。
   */
  const playAndWait = async (payload: PlayTtsAudioPayload) => {
    stopAudio()
    const currentPendingPlayVersion = pendingPlayVersion

    const started = await requestAudio(payload, { toggleWhenActive: false })
    if (!started || currentPendingPlayVersion !== pendingPlayVersion) return false

    await waitForAudioEnd(payload.audioId, currentPendingPlayVersion)
    return currentPendingPlayVersion === pendingPlayVersion
  }

  // 離開頁面就停掉，不然聲音會在背景繼續唸。
  onScopeDispose(stopAudio)

  return {
    audioState,
    togglePlay,
    playAll,
    playAndWait,
    stopAudio,
  }
}
