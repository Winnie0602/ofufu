import type { LANG_CONFIG_MAP } from '~/types/lang'
import type { AudioPlaybackState } from '~/types/audio'

type TtsLanguageConfig = (typeof LANG_CONFIG_MAP)[keyof typeof LANG_CONFIG_MAP]

interface PlayTtsAudioPayload {
  audioId: string
  text: string
}

type PlayAudioOptions = {
  toggleWhenActive: boolean
}

export const useTtsAudio = (
  lang: TtsLanguageConfig | (() => TtsLanguageConfig),
) => {
  const loadingAudioId = ref<string | null>(null)
  const playingAudioId = ref<string | null>(null)
  const { show: showToast } = useToast()
  let audio: HTMLAudioElement | null = null
  // 每次停止或切換播放都遞增，讓較早完成的 TTS response 自動失效。
  let requestVersion = 0
  let sequenceVersion = 0
  let removeAudioListeners: (() => void) | null = null

  const audioState = (audioId: string): AudioPlaybackState => {
    if (loadingAudioId.value === audioId) return 'loading'
    if (playingAudioId.value === audioId) return 'playing'
    return 'idle'
  }

  const stopCurrentAudio = () => {
    requestVersion += 1

    // 移除上一段音訊的事件，避免它回頭修改目前按鈕的狀態。
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

  const stopAudio = () => {
    sequenceVersion += 1
    stopCurrentAudio()
  }

  const requestAudio = async (
    { audioId, text }: PlayTtsAudioPayload,
    { toggleWhenActive }: PlayAudioOptions,
  ) => {
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
          text,
          lang: toValue(lang),
        },
      })

      // 使用者可能已經切換或停止播放，此時忽略舊 request 的結果。
      if (currentRequestVersion !== requestVersion) return

      // 同一個 composable 只保留一個 Audio，確保同時最多播放一段。
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
      await audio.play()
      return true
    } catch {
      handleFailure('無法產生語音，請稍後再試。')
      return false
    }
  }

  const playAudio = async (payload: PlayTtsAudioPayload) => {
    sequenceVersion += 1
    await requestAudio(payload, { toggleWhenActive: true })
  }

  const waitForAudioEnd = (audioId: string, currentSequenceVersion: number) =>
    new Promise<void>((resolve) => {
      if (
        currentSequenceVersion !== sequenceVersion ||
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
            currentSequenceVersion !== sequenceVersion ||
            (loadingAudioId.value !== audioId &&
              playingAudioId.value !== audioId)
          ) {
            stopWatching()
            resolve()
          }
        },
      )
    })

  const playAudioSequence = async (items: PlayTtsAudioPayload[]) => {
    stopAudio()
    const currentSequenceVersion = sequenceVersion

    for (const item of items) {
      if (currentSequenceVersion !== sequenceVersion) return

      const started = await requestAudio(item, { toggleWhenActive: false })
      if (!started || currentSequenceVersion !== sequenceVersion) return

      await waitForAudioEnd(item.audioId, currentSequenceVersion)
    }
  }

  // 頁面或使用此 composable 的元件卸載時停止背景音訊並清除事件。
  onScopeDispose(stopAudio)

  return {
    audioState,
    playAudio,
    playAudioSequence,
    stopAudio,
  }
}
