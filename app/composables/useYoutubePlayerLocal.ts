export function useYoutubePlayerLocal(videoId: string) {
  const player = ref<YT.Player | null>(null)
  const currentTime = ref(0)
  let rafId: number | null = null

  /* ---------------- YouTube API 載入 ---------------- */
  function loadYoutubeAPI(): Promise<void> {
    return new Promise((resolve) => {
      if (!import.meta.client) return resolve()
      if (window.YT && window.YT.Player) return resolve()

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)

      window.onYouTubeIframeAPIReady = () => resolve()
    })
  }

  function startTick() {
    if (rafId !== null) return

    const tick = () => {
      // 只有當 player 準備好且正在播放時才抓取時間
      // 這裡可以根據你的 store 狀態調整，目前先以 player 狀態為主
      if (player.value && typeof player.value.getCurrentTime === 'function') {
        const time = player.value.getCurrentTime()
        if (currentTime.value !== time) {
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

  /* ---------------- 建立 Player ---------------- */
  async function createPlayer(elementId: string) {
    if (!import.meta.client || !videoId || player.value) return

    await loadYoutubeAPI()

    player.value = new YT.Player(elementId, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        playsinline: 1,
      },
      events: {
        // 每當播放器狀態變更時，就會觸發此事件
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            startTick()
          } else {
            stopTick()
          }
        },
      },
    })
  }

  function destroy() {
    stopTick()
    if (player.value) {
      player.value.destroy()
      player.value = null
    }
  }

  return {
    currentTime,
    createPlayer,
    destroy,
  }
}
