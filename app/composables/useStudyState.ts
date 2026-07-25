import type { PlayTtsAudioPayload } from '~/composables/useTtsAudio'
import { LANG_CONFIG_MAP } from '~/types/lang'
import type { StudyMode } from '~/types/material'

/**
 * 閱讀頁與對話頁共用的學習狀態。
 *
 * 兩個頁面的學習操作幾乎一模一樣——開關假名、開關查字模式、調播放速度、
 * 把日文或中文遮起來再逐句掀開、展開文法說明、整篇連續播放。
 * 差別只在內文單位不同（閱讀是句子、對話是台詞），所以這裡一律用中性的 `id` 當鍵。
 *
 *   const { mode, showRuby, isJapaneseVisible, toggleAutoPlay } = useStudyState({
 *     initialGrammarId: grammarNotes[0]?.id ?? null,
 *   })
 *
 * ## 各頁自己留著的東西
 *
 * 只有一邊才有的狀態不放進來：
 * - 閱讀：`articleVisible`（整篇模式的遮罩，對話沒有這個概念）
 * - 對話：選角色、角色扮演逐句練習那一整套
 *
 * ## 遮罩的兩層設計
 *
 * 「看不看得見」由兩件事決定：整體開關（眼睛圖示）＋ 個別掀開紀錄。
 *
 *   眼睛開著            → 全部看得見
 *   眼睛關著            → 全部遮起來
 *   眼睛關著＋點了某句  → 只有那句看得見
 *
 * 掀開紀錄只增不減；眼睛重新關上時整批清空，這樣才能再遮一次。
 * 所以 `japaneseVisible` 被 watch 著，一變動就清掀開紀錄。
 */
export function useStudyState(
  options: { initialGrammarId?: string | null } = {},
) {
  /** 目前的學習模式，對應頁面上方的 Tabs。 */
  const mode = ref<StudyMode>('full')
  /** 漢字上方要不要顯示假名。 */
  const showRuby = ref(true)
  /** 查字模式：開啟後重點單字／文法才會有底色且可點開說明。 */
  const lookupMode = ref(false)
  /** 語音播放速度，會即時傳給 useTtsAudio。 */
  const playbackRate = ref(1)

  /** 日文的整體顯示開關（畫面上的眼睛圖示）。 */
  const japaneseVisible = ref(true)
  /** 中文翻譯的整體顯示開關，跟日文各自獨立。 */
  const translationVisible = ref(true)

  // 眼睛關著時，被個別點開的那幾句。只增不減，重新遮起來是整批清空。
  const revealedJapaneseIds = ref(new Set<string>())
  const revealedTranslationIds = ref(new Set<string>())

  /** 目前展開說明的文法，一次只開一則；null 表示都收起來。 */
  const activeGrammarId = ref<string | null>(options.initialGrammarId ?? null)

  const { audioState, togglePlay, playAll, playAndWait, stopAudio } =
    useTtsAudio(LANG_CONFIG_MAP.ja, { playbackRate })

  /** 是不是正在連續播放整篇／整段（不含單句播放）。 */
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
   * 這一句的日文看不看得見：眼睛開著就看得見，關著時只有已掀開的那句看得見。
   *
   * 對話的角色扮演另有規則（只遮你扮演角色的台詞），那邊不用這個，
   * 改用 `isJapaneseRevealed` 自己組合。
   */
  const isJapaneseVisible = (id: string) =>
    japaneseVisible.value || isJapaneseRevealed(id)
  const isTranslationVisible = (id: string) =>
    translationVisible.value || isTranslationRevealed(id)

  /** 點同一則文法是收合，點別則是換過去。 */
  const toggleGrammar = (grammarId: string) => {
    activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
  }

  const stopAutoPlay = () => {
    stopAudio()
    isAutoPlaying.value = false
  }

  /**
   * 連續播放整篇／整段；播放中再呼叫一次就是停止。
   *
   *   toggleAutoPlay(sentences.map((s) => ({ audioId: s.id, text: toPlainJapanese(s.text) })))
   *
   * 要播哪些句子由呼叫端決定——對話的角色扮演會先濾掉你自己的台詞才傳進來。
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

  // 查字模式或模式切換後，單字 Popover 是新長出來的 DOM，
  // FlyonUI 只在換頁時自動初始化一次，所以得手動再綁一次 click，否則點了沒反應。
  const reinitFlyonui = useFlyonuiReinit()
  watch([lookupMode, mode], () => reinitFlyonui())
  // 眼睛重新關上時清掉掀開紀錄，讓它能重新遮全部。
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
