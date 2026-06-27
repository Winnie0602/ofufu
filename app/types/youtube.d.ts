// module化
export {}

// 幫全域環境補型別
declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }

  // 補充YT 這個全域物件裡的型別
  namespace YT {
    interface PlayerOptions {
      height?: string
      width?: string
      videoId?: string
      playerVars?: PlayerVars
      events?: PlayerEvents
    }

    interface PlayerVars {
      autoplay?: number
      controls?: number
      playsinline?: number
      enablejsapi?: number
      rel?: number
    }

    interface PlayerEvents {
      onReady?: (event: PlayerEvent) => void
      onStateChange?: (event: OnStateChangeEvent) => void
      onError?: (event: OnErrorEvent) => void
    }

    interface PlayerEvent {
      target: Player
    }

    interface OnStateChangeEvent {
      data: number
      target: Player
    }

    interface OnErrorEvent extends YT.PlayerEvent {
      data: number
    }

    class Player {
      constructor(elementId: string | HTMLElement, options: PlayerOptions)
      playVideo(): void
      pauseVideo(): void
      stopVideo(): void
      getCurrentTime(): number
      getPlayerState(): -1 | 0 | 1 | 2 | 3 | 5
      seekTo(seconds: number, allowSeekAhead: boolean): void
      destroy(): void
      getVolume(): number
      setVolume(suggestedRate: number): void
      setPlaybackRate(suggestedRate: number): void
      getPlaybackRate(): number
      getAvailablePlaybackRates(): array
      getDuration(): number
      loadVideoById(videoId: string, startSeconds: number): void
      cueVideoById(videoId: string, startSeconds: number): void
    }

    const PlayerState: {
      UNSTARTED: -1
      ENDED: 0
      PLAYING: 1
      PAUSED: 2
      BUFFERING: 3
      CUED: 5
    }
  }
}
