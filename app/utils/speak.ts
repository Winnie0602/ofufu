export const speak = (
  word: string,
  onEnd?: () => void,
  lang: string = 'ja-JP',
) => {
  const utterThis = new SpeechSynthesisUtterance(word)

  const voiceMap = new Map<string, string>([
    ['en-US', 'Google US English'],
    ['zh-TW', 'Google 國語（臺灣）'],
    ['zh-CN', 'Google 普通话（中国大陆）'],
    ['zh-HK', 'Google 粤語（香港）'],
    ['ja-JP', 'Google 日本語'],
    ['ko-KR', 'Google 한국의'],
    ['th-TH', 'Google हिन्दी'],
    ['fr-FR', 'Google français'],
  ])

  const voiceName = voiceMap.get(lang)

  // 確保語音列表加載完成
  const getVoices = () => {
    return new Promise<SpeechSynthesisVoice[]>((resolve) => {
      const voices = speechSynthesis.getVoices()

      if (voices.length) {
        resolve(voices)
      } else {
        // 如果語音還未加載，等候加載完成
        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices())
        }
      }
    })
  }

  // 設定語音並播放
  const setVoice = async () => {
    const voices = await getVoices() // 等待語音列表加載完成

    const selectedVoice = voices.find((voice) => voice.name === voiceName)

    if (selectedVoice) {
      utterThis.voice = selectedVoice
    } else {
      console.warn(`未找到名為 "${voiceName}" 的語音，使用預設語音`)

      // 如果沒有找到，選擇第一個符合語言的語音
      const defaultVoice = voices.find((voice) => voice.lang === lang)
      if (defaultVoice) utterThis.voice = defaultVoice
    }

    utterThis.lang = lang
    utterThis.rate = 1
    utterThis.pitch = 1 // 可以根據需要調整音高

    // 開始語音播放
    window.speechSynthesis.speak(utterThis)

    console.log(utterThis)

    // 播放結束時的回調
    utterThis.onend = () => {
      if (onEnd) onEnd() // 播放結束時執行回調函數
    }
  }

  setVoice() // 執行語音設置和播放
}
