export const usePlayerStore = defineStore(
  'player',
  () => {
    const storeMode = ref<'test' | 'normal' | 'admin'>('normal')

    const test_videoId = ref<string | null>(null) // 考試頁面音樂
    const videoId = ref<string | null>(null) // 一般頁面音樂

    const currentTime = ref(0) // 一般

    const duration = ref(0) // 一般

    const isPlaying = ref(false)

    // 播放速度
    const playbackRate = ref(1) // 影片播放速度
    const test_playbackRate = ref(1) // 考試頁面影片播放速度

    const finalPlaybackRate = computed(() => {
      return storeMode.value === 'test'
        ? test_playbackRate.value
        : playbackRate.value
    })

    const availableRates = ref<number[]>([]) //可用的播放速度

    const seekToTime = ref<number | null>(null) // 由實體所在compasable監聽，有變動的話影片跳到該段落
    const isSeeking = ref(false) //拖拉bar是否在把拖拉

    const songTitle = ref('')
    const songArtist = ref('')

    function setMode(mode: 'test' | 'normal' | 'admin') {
      storeMode.value = mode
    }

    function setTestVideoId(id: string) {
      test_videoId.value = id
    }

    function loadVideo(id: string) {
      if (videoId.value && videoId.value !== id) {
        // 換新歌，時間重置
        currentTime.value = 0
      }
      videoId.value = id
    }

    function setTime(time: number) {
      if (storeMode.value === 'normal') {
        currentTime.value = time
      }
    }

    function setDuration(time: number) {
      duration.value = time
    }

    function setSongInfo(title: string, artist: string) {
      songTitle.value = title
      songArtist.value = artist
    }

    function setPlaybackRate(rate: number) {
      if (storeMode.value === 'test') {
        test_playbackRate.value = rate
      } else {
        playbackRate.value = rate
      }
    }

    function setAvailableRates(rates: number[]) {
      availableRates.value = rates
    }

    // 由歌詞組件呼叫，使影片跳到該段
    function seekToRequest(time: number) {
      seekToTime.value = time
    }

    // 播放某段時間區間
    const segmentRequest = ref<{
      start: number
      end: number
      id: number
    } | null>(null)

    let segmentRequestId = 0

    function playSegmentRequest(start: number, end: number) {
      segmentRequestId++
      segmentRequest.value = {
        start,
        end,
        id: segmentRequestId,
      }
    }

    return {
      // state
      storeMode,
      test_videoId,
      videoId,
      currentTime,
      duration,
      isPlaying,
      playbackRate,
      test_playbackRate,
      finalPlaybackRate,
      availableRates,
      songTitle,
      songArtist,
      seekToTime,
      isSeeking,
      segmentRequest,

      // actions
      setMode,
      setTestVideoId,
      loadVideo,
      play: () => (isPlaying.value = true),
      pause: () => (isPlaying.value = false),
      setTime,
      setDuration,
      setSongInfo,
      seekToRequest,
      setPlaybackRate,
      setAvailableRates,
      playSegmentRequest,
    }
  },
  {
    persist: {
      pick: [
        'videoId',
        'currentTime',
        'playbackRate',
        'test_playbackRate',
        'songTitle',
        'songArtist',
      ],
    },
  },
)
