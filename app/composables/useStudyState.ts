import type { PlayTtsAudioPayload } from '~/composables/useTtsAudio'
import type { CurrentMaterial, StudyMode } from '~/types/material'

/**
 * 閱讀與對話詳情頁共用的「學習操作狀態」。
 *
 * 頁面負責決定這是哪篇教材、畫出內容，以及哪些句子／台詞要播放；
 * 這裡集中管理兩頁重複的操作：
 *
 * - 學習模式、Ruby 與重點標記
 * - 日文／中文遮罩與個別掀開紀錄
 * - 目前展開的文法
 * - 播放速度、單句播放與整篇／整段連播
 *
 * 語音實際交給 `useTtsAudio`。閱讀的句子 ID 或對話的台詞 ID 在前端稱為
 * `audioId`，送到 `/api/tts` 時會成為 `unitId`；後端再配合教材種類與教材 ID，
 * 找出真正要朗讀的文字與聲音。
 *
 * 只屬於單一頁面的流程仍留在頁面：閱讀的整篇遮罩，以及對話的選角與角色扮演。
 */
export function useStudyState(options: {
  /** 教材種類與教材 ID，供語音組成後端可查找的內容座標。 */
  material: CurrentMaterial
  /** 頁面第一次顯示時預先展開的文法；沒有就傳 null 或省略。 */
  initialGrammarId?: string | null
}) {
  /** 頁面 Tabs 選中的學習模式。 */
  const mode = ref<StudyMode>('full')
  /** 是否顯示漢字上方的 Ruby 假名。 */
  const showRuby = ref(true)
  /** 是否顯示重點標記並允許點開單字／文法說明。 */
  const lookupMode = ref(false)
  /** 語音速度；播放途中變更也會立即傳給 useTtsAudio。 */
  const playbackRate = ref(1)

  /** 日文與中文各自的整體顯示開關。 */
  const japaneseVisible = ref(true)
  const translationVisible = ref(true)

  // 整體遮住後，使用者仍可單獨掀開某一句；Set 記錄已掀開的內容 ID。
  const revealedJapaneseIds = ref(new Set<string>())
  const revealedTranslationIds = ref(new Set<string>())

  /** 目前展開的文法；一次只開一則，null 表示全部收合。 */
  const activeGrammarId = ref<string | null>(options.initialGrammarId ?? null)

  // useStudyState 管操作狀態；真正的請求、播放、停止與音訊生命週期由 useTtsAudio 處理。
  const { audioState, togglePlay, playAll, playAndWait, stopAudio } =
    useTtsAudio(options.material, { playbackRate })

  /** 是否正在連播整篇文章或整段對話；不包含手動播放單句。 */
  const isAutoPlaying = ref(false)

  const isJapaneseRevealed = (id: string) => revealedJapaneseIds.value.has(id)
  const isTranslationRevealed = (id: string) =>
    revealedTranslationIds.value.has(id)
  const revealJapanese = (id: string) => {
    revealedJapaneseIds.value.add(id)
  }
  const revealTranslation = (id: string) => {
    revealedTranslationIds.value.add(id)
  }
  const clearJapaneseReveals = () => {
    revealedJapaneseIds.value.clear()
  }
  const clearTranslationReveals = () => {
    revealedTranslationIds.value.clear()
  }
  const clearReveals = () => {
    clearJapaneseReveals()
    clearTranslationReveals()
  }

  /**
   * 判斷某句是否可見：
   * 整體開關打開時全部可見；關閉時只有使用者個別掀開的內容可見。
   *
   * 對話角色扮演有自己的遮罩規則，由頁面搭配 `isJapaneseRevealed` 判斷。
   */
  const isJapaneseVisible = (id: string) =>
    japaneseVisible.value || isJapaneseRevealed(id)
  const isTranslationVisible = (id: string) =>
    translationVisible.value || isTranslationRevealed(id)

  /** 點目前的文法就收合；點另一則就切換過去。 */
  const toggleGrammar = (grammarId: string) => {
    activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
  }

  const stopAutoPlay = () => {
    stopAudio()
    isAutoPlaying.value = false
  }

  /**
   * 開始或停止連播。
   * 頁面先決定要播哪些內容，再傳入句子／台詞的 audioId；
   * 對話角色扮演會先排除使用者所扮演角色的台詞。
   */
  const toggleAutoPlay = async (items: PlayTtsAudioPayload[]) => {
    if (isAutoPlaying.value) {
      stopAutoPlay()
      return
    }
    isAutoPlaying.value = true
    await playAll(items)
    isAutoPlaying.value = false
  }

  // 切換模式會重新產生 Popover DOM，需請 FlyonUI 重新綁定互動。
  const reinitFlyonui = useFlyonuiReinit()
  watch([lookupMode, mode], () => reinitFlyonui())
  // 整體顯示狀態改變時清除個別掀開紀錄，避免下次遮罩沿用舊狀態。
  watch(japaneseVisible, clearJapaneseReveals)
  watch(translationVisible, clearTranslationReveals)

  return {
    mode,
    showRuby,
    lookupMode,
    playbackRate,
    japaneseVisible,
    translationVisible,
    activeGrammarId,
    toggleGrammar,
    isJapaneseRevealed,
    isTranslationRevealed,
    revealJapanese,
    revealTranslation,
    clearJapaneseReveals,
    clearTranslationReveals,
    clearReveals,
    isJapaneseVisible,
    isTranslationVisible,
    audioState,
    togglePlay,
    playAndWait,
    stopAudio,
    isAutoPlaying,
    toggleAutoPlay,
    stopAutoPlay,
  }
}
