import type { PlayTtsAudioPayload } from '~/composables/useTtsAudio'
import { LANG_CONFIG_MAP } from '~/types/lang'
import type { StudyMode } from '~/types/material'

/**
 * 閱讀與對話教材頁共用的學習狀態。
 *
 * 兩種教材的顯示設定、遮罩掀開紀錄、文法展開與日文語音邏輯完全相同，
 * 只有內文單位不同（閱讀是 sentence、對話是 line），故一律以中性的 `id` 為鍵。
 * 各教材專屬的狀態（閱讀的整篇遮罩、對話的角色扮演練習）留在各自頁面。
 */
export function useStudyState(
  options: { initialGrammarId?: string | null } = {},
) {
  const mode = ref<StudyMode>('full')
  const showRuby = ref(true)
  const lookupMode = ref(false)
  const playbackRate = ref(1)

  const japaneseVisible = ref(true)
  const translationVisible = ref(true)

  // 眼睛關閉時個別掀開的內文；只增不減，重新遮起是整批清空。
  const revealedJapaneseIds = ref(new Set<string>())
  const revealedTranslationIds = ref(new Set<string>())

  const activeGrammarId = ref<string | null>(options.initialGrammarId ?? null)

  const { audioState, playAudio, playAudioSequence, playLine, stopAudio } =
    useTtsAudio(LANG_CONFIG_MAP.ja, { playbackRate })

  const isSequencePlaying = ref(false)

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

  // 一般可見判斷：眼睛開著全部看得見，關著時只有已掀開的那句看得見。
  // 對話的角色扮演另有規則，由該頁自行以 isJapaneseRevealed 組合。
  const isJapaneseVisible = (id: string) =>
    japaneseVisible.value || isJapaneseRevealed(id)
  const isTranslationVisible = (id: string) =>
    translationVisible.value || isTranslationRevealed(id)

  const toggleGrammar = (grammarId: string) => {
    activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
  }

  const stopSequence = () => {
    stopAudio()
    isSequencePlaying.value = false
  }
  // 整篇／整段序列播放：播放中再按一次即停止。
  const toggleSequence = async (items: PlayTtsAudioPayload[]) => {
    if (isSequencePlaying.value) {
      stopSequence()
      return
    }
    isSequencePlaying.value = true
    await playAudioSequence(items)
    isSequencePlaying.value = false
  }

  // 查字模式或版面切換後，內文單字 Popover 是新長出的 DOM，需重新綁定 FlyonUI click trigger。
  const reinitFlyonui = useFlyonuiReinit()
  watch([lookupMode, mode], () => reinitFlyonui())
  // 重新遮起日文／中文時清掉掀開紀錄，讓眼睛再次關閉能重新遮全部。
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
    playAudio,
    playLine,
    stopAudio,
    isSequencePlaying,
    toggleSequence,
    stopSequence,
  }
}
