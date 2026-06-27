export function useYoutubePlayer(videoId: string | null) {
  const player = ref<YT.Player | null>(null)
  const isPlayerReady = ref(false)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const playbackRate = ref(1)
  const availableRates = ref<number[]>([])

  let rafId: number | null = null

  function loadYoutubeAPI(): Promise<void> {
    return new Promise((resolve) => {
      if (!import.meta.client) return resolve()

      if (window.YT?.Player) {
        resolve()
        return
      }

      const existingScript = document.getElementById('youtube-sdk')
      if (!existingScript) {
        const tag = document.createElement('script')
        tag.id = 'youtube-sdk'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }

      window.onYouTubeIframeAPIReady = () => resolve()
    })
  }

  function startTick() {
    if (rafId !== null) return

    const tick = () => {
      if (player.value && isPlaying.value) {
        const time = player.value.getCurrentTime()

        if (Math.abs(time - currentTime.value) > 0.1) {
          currentTime.value = time
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
  }

  function stopTick() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  async function createPlayer(elementId: string) {
    if (!import.meta.client || player.value || !videoId) return

    await loadYoutubeAPI()

    player.value = new YT.Player(elementId, {
      videoId,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: () => {
          isPlayerReady.value = true
          duration.value = player.value?.getDuration() ?? 0
          availableRates.value = player.value?.getAvailablePlaybackRates() ?? []

          if (playbackRate.value !== 1) {
            player.value?.setPlaybackRate(playbackRate.value)
          }
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            isPlaying.value = true
            duration.value = player.value?.getDuration() ?? duration.value
            startTick()
            return
          }

          isPlaying.value = false
          stopTick()
        },
        onError: () => {
          isPlaying.value = false
          isPlayerReady.value = false
          stopTick()
        },
      },
    })
  }

  function play() {
    if (!isPlayerReady.value) return
    player.value?.playVideo()
  }

  function pause() {
    if (!isPlayerReady.value) return
    player.value?.pauseVideo()
  }

  function seekTo(time: number) {
    if (!isPlayerReady.value) return

    currentTime.value = time
    player.value?.seekTo(time, true)
    player.value?.playVideo()
  }

  function setPlaybackRate(rate: number) {
    playbackRate.value = rate
    player.value?.setPlaybackRate(rate)
  }

  function destroy() {
    stopTick()
    player.value?.destroy()
    player.value = null
    isPlayerReady.value = false
    isPlaying.value = false
  }

  onBeforeUnmount(destroy)

  return {
    isPlayerReady,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    availableRates,
    createPlayer,
    destroy,
    play,
    pause,
    seekTo,
    setPlaybackRate,
  }
}
