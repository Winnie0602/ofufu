<script setup lang="ts">
import { conversationMaterials } from '~/data/materials/conversation'
import { characterAvatarMap } from '~/types/conversation'
import { materialCategoryLabels } from '~/types/material'
import { toPlainJapanese } from '~/utils/parseRuby'

const route = useRoute()
const material = conversationMaterials.find(
  (item) => item.id === route.params.id,
)

if (!material) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇對話' })
}

// 註解掛在句子層，頁尾「重點單字／常見用法與文法」由各句攤平彙整。
// 內文只標符合該程度的重點單字，故頁尾即列出所有單字註解。
const vocabularyNotes = material.lines.flatMap(
  (line) => line.vocabularyNotes ?? [],
)
const grammarNotes = material.lines.flatMap((line) => line.grammarNotes ?? [])

// 顯示設定、遮罩掀開、文法展開與日文語音與閱讀頁共用，見 useStudyState；
// 角色扮演與逐句引導練習只有對話有，留在本頁。
// 對照模式：日文／中文各自一個獨立的顯示開關（眼睛），彼此正交。
const {
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
  revealJapanese: revealJapaneseLine,
  revealTranslation: revealTranslationLine,
  clearJapaneseReveals,
  clearReveals,
  audioState,
  togglePlay,
  playAndWait,
  stopAudio,
  isAutoPlaying: isConversationPlaying,
  toggleAutoPlay,
  stopAutoPlay,
} = useStudyState({ initialGrammarId: grammarNotes[0]?.id ?? null })

const selectedRoleParticipantId = ref(material.participants[0]?.id ?? '')
// 角色扮演逐句練習游標：null＝自由瀏覽；數字＝目前停在第幾句（0-based）。
const practiceIndex = ref<number | null>(null)

const playConversation = () => {
  // 角色扮演自動播放時跳過你扮演的角色，只播對方台詞。
  const playableLines =
    mode.value === 'roleplay'
      ? material.lines.filter(
          (line) => line.speakerId !== selectedRoleParticipantId.value,
        )
      : material.lines
  return toggleAutoPlay(
    playableLines.map((line) => ({
      audioId: line.id,
      text: toPlainJapanese(line.text),
    })),
  )
}

const participantMap = new Map(
  material.participants.map((participant) => [participant.id, participant]),
)
// 每行預先解析出說話者，template 只讀 line.speaker.*，避免重複 participantMap.get 與 !／?. 混用。
const lines = material.lines.map((line) => ({
  ...line,
  speaker: participantMap.get(line.speakerId)!,
}))
// 目前正在載入或播放的對話行（同時最多一行非 idle）；用於高亮與自動捲動。
const activeLineId = computed(
  () => lines.find((line) => audioState(line.id) !== 'idle')?.id ?? null,
)
const isSender = (speakerId: string) =>
  speakerId === material.participants[0]?.id

// ── 角色扮演逐句練習 ──────────────────────────────
const isPracticing = computed(() => practiceIndex.value !== null)
// 「你的台詞」＝所選扮演角色的台詞（練習時停下換你說）。
const isUserLine = (line: (typeof lines)[number]) =>
  line.speakerId === selectedRoleParticipantId.value
const currentStepLine = computed(() =>
  practiceIndex.value === null ? null : (lines[practiceIndex.value] ?? null),
)
const isLastPracticeStep = computed(
  () => practiceIndex.value !== null && practiceIndex.value === lines.length - 1,
)
// 目前 step 是否停在某句你的台詞上（footer 追加看答案／繼續、遮罩提示由此推導）。
const isPracticeUserStep = (lineId: string) => {
  const line = currentStepLine.value
  return !!line && line.id === lineId && isUserLine(line)
}
const practiceHintFor = (lineId: string) =>
  isPracticeUserStep(lineId) && !isJapaneseRevealed(lineId)
    ? '看中文說日文'
    : undefined

const stopPractice = () => {
  practiceIndex.value = null
  stopAudio()
}
// 依 practiceIndex 推進：別人台詞自動播、播畢自動前進；你的台詞停下不出聲，等掀開後手動繼續。
const runPracticeStep = async () => {
  const index = practiceIndex.value
  if (index === null) return
  if (index >= lines.length) {
    stopPractice()
    return
  }
  const line = lines[index]!
  if (isUserLine(line)) {
    // 你的台詞：停下、不出聲（activeLineId 為 null，捲動改由 focusLineId 驅動）。
    stopAudio()
    return
  }
  const completed = await playAndWait({
    audioId: line.id,
    text: toPlainJapanese(line.text),
  })
  // 單一 <audio> 可能被手動點播或切換中斷；僅在自然播畢且仍停在同句時前進。
  if (!completed || practiceIndex.value !== index) return
  practiceIndex.value = index + 1
  await runPracticeStep()
}
const startPractice = () => {
  clearJapaneseReveals()
  practiceIndex.value = 0
  void runPracticeStep()
}
const togglePractice = () => {
  if (isPracticing.value) stopPractice()
  else startPractice()
}
// 你的回合按鈕：未掀開＝看答案（掀開日文）；已掀開＝繼續對話（前進），最後一句改為結束練習。
const handlePracticeAction = (lineId: string) => {
  if (!isJapaneseRevealed(lineId)) {
    revealJapaneseLine(lineId)
    return
  }
  if (isLastPracticeStep.value) {
    stopPractice()
    return
  }
  practiceIndex.value = (practiceIndex.value ?? 0) + 1
  void runPracticeStep()
}
const practiceActionText = (lineId: string) => {
  if (!isJapaneseRevealed(lineId)) return '看答案'
  return isLastPracticeStep.value ? '結束練習' : '繼續對話'
}
const practiceActionIcon = (lineId: string) => {
  if (!isJapaneseRevealed(lineId)) return 'icon-[tabler--eye]'
  return isLastPracticeStep.value
    ? 'icon-[tabler--player-stop-filled]'
    : 'icon-[tabler--arrow-right]'
}

// 播放鈕：角色扮演＝開始／結束練習；閱讀模式＝自動播放對話。桌面 slot 與手機控制列共用。
const playbackActive = computed(() =>
  mode.value === 'roleplay' ? isPracticing.value : isConversationPlaying.value,
)
const playbackActionLabel = computed(() => {
  if (mode.value === 'roleplay') {
    return isPracticing.value ? '結束練習' : '角色扮演練習'
  }
  return isConversationPlaying.value ? '停止播放對話' : '自動播放對話'
})
const handlePlaybackAction = () => {
  if (mode.value === 'roleplay') togglePractice()
  else void playConversation()
}
// 這句日文是否看得見（未被遮罩）：已掀開的一律看得見；
// 角色扮演＝只遮你扮演角色的日文，對照＝由日文眼睛統一控制。
const isJapaneseVisible = (lineId: string, speakerId: string) =>
  isJapaneseRevealed(lineId) ||
  (mode.value === 'roleplay'
    ? speakerId !== selectedRoleParticipantId.value
    : japaneseVisible.value)
// 這句中文是否看得見：角色扮演一律保留中文；對照由中文眼睛控制。
const isTranslationVisible = (lineId: string) =>
  mode.value === 'roleplay' ||
  isTranslationRevealed(lineId) ||
  translationVisible.value

const recommendations = conversationMaterials
  .filter((item) => item.id !== material.id && item.level === material.level)
  .slice(0, 5)

watch(mode, () => {
  // 切模式：停止序列播放與逐句練習，避免控制狀態與語音、遮罩錯位。
  stopAutoPlay()
  practiceIndex.value = null
  clearReveals()
})
watch(selectedRoleParticipantId, () => {
  // 切角色：練習作廢並清掉掀開紀錄，讓新角色的台詞重新遮起。
  stopPractice()
  clearJapaneseReveals()
})
// 捲動焦點：練習中由目前 step 句驅動（你的台詞停下時 activeLineId 為 null，不能只靠它）；
// 一般自動播放沿用 activeLineId；手動逐句播放不強制捲動。
const focusLineId = computed(() => {
  if (isPracticing.value) return currentStepLine.value?.id ?? null
  return isConversationPlaying.value ? activeLineId.value : null
})
watch(focusLineId, (lineId) => {
  if (!import.meta.client || !lineId) return
  void nextTick(() => {
    document
      .getElementById(`conversation-line-${lineId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

useSeoMeta({ title: material.title, description: material.excerpt })
</script>

<template>
  <div class="w-full overflow-x-clip bg-white text-neutral-950">
    <main class="mx-auto w-full max-w-[1080px] px-4 py-10 sm:px-6 lg:py-14">
      <NuxtLink
        to="/conversation"
        class="text-primary hover:text-error inline-flex items-center gap-1 text-sm font-medium"
      >
        <span class="icon-[tabler--arrow-left] size-4" />
        返回對話列表
      </NuxtLink>

      <header class="mt-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge badge-outline badge-primary rounded-full">
            對話
          </span>
          <span class="badge badge-outline badge-error rounded-full">
            {{ material.level.toUpperCase() }}
          </span>
          <span
            v-for="category in material.categories"
            :key="category"
            class="badge badge-soft badge-neutral rounded-full"
          >
            {{ materialCategoryLabels[category] ?? category }}
          </span>
        </div>
        <div class="mt-4 flex items-start justify-between gap-4">
          <h1 class="text-3xl leading-tight font-bold sm:text-5xl">
            {{ material.title }}
          </h1>
          <FavoriteButton :label="`收藏 ${material.title}`" size="md" />
        </div>
      </header>

      <div
        class="mt-8 grid overflow-hidden rounded-xl bg-white"
        :class="{ 'md:grid-cols-[1.1fr_0.9fr]': material.coverImage }"
      >
        <div v-if="material.coverImage" class="aspect-video md:aspect-auto">
          <img
            :src="material.coverImage"
            :alt="material.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="bg-error/5 p-6 text-neutral-900">
          <h2 class="font-bold">場景</h2>
          <p class="mt-2 text-sm leading-6 text-neutral-600">
            {{ material.sceneDescription }}
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <div
              v-for="participant in material.participants"
              :key="participant.id"
              class="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pr-3 pl-1.5"
            >
              <span
                class="grid size-8 place-items-center overflow-hidden rounded-full bg-white"
              >
                <img
                  :src="characterAvatarMap[participant.avatarKey]"
                  :alt="participant.name"
                  class="size-full object-cover"
                />
              </span>
              <span class="text-sm">
                <span class="font-bold">{{ participant.name }}</span>
                <span class="ml-1 text-xs text-neutral-500">
                  {{ participant.role }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <ContentControls
        class="mt-8"
        :mode="mode"
        :playback-rate="playbackRate"
        content-label="對話"
        @update:mode="mode = $event"
        @update:playback-rate="playbackRate = $event"
      >
        <template #playback-actions>
          <button
            type="button"
            class="btn btn-outline btn-error btn-sm text-error hover:bg-error/10 hover:text-error min-h-11 bg-white sm:min-h-8"
            :aria-label="playbackActionLabel"
            @click="handlePlaybackAction"
          >
            <span
              :class="
                playbackActive
                  ? 'icon-[tabler--player-stop-filled]'
                  : 'icon-[tabler--player-play-filled]'
              "
              class="size-4"
            />
            {{ playbackActionLabel }}
          </button>
        </template>
        <template #mode-actions>
          <template v-if="mode === 'roleplay'">
            <span class="ml-1 text-xs text-neutral-700 sm:text-sm">你扮演</span>
            <button
              v-for="participant in material.participants"
              :key="participant.id"
              type="button"
              class="border-error/30 hover:bg-error/10 inline-flex min-h-9 items-center gap-1.5 rounded-full border py-0.5 pr-3 pl-1 text-sm transition-colors sm:min-h-8"
              :class="
                selectedRoleParticipantId === participant.id
                  ? 'bg-error/10 text-error font-bold'
                  : 'bg-white text-neutral-600'
              "
              :aria-pressed="selectedRoleParticipantId === participant.id"
              @click="selectedRoleParticipantId = participant.id"
            >
              <span
                class="grid size-6 place-items-center overflow-hidden rounded-full bg-white"
              >
                <img
                  :src="characterAvatarMap[participant.avatarKey]"
                  :alt="participant.name"
                  class="size-full object-cover"
                />
              </span>
              {{ participant.name }}
            </button>
          </template>
          <template v-else>
            <ContentVisibilityToggle
              :visible="japaneseVisible"
              label="隱藏日文"
              @update:visible="japaneseVisible = $event"
            />
            <ContentVisibilityToggle
              :visible="translationVisible"
              label="隱藏中文"
              @update:visible="translationVisible = $event"
            />
          </template>
        </template>
        <template #display-settings>
          <ContentDisplayToggles
            :lookup-mode="lookupMode"
            :show-ruby="showRuby"
            @update:lookup-mode="lookupMode = $event"
            @update:show-ruby="showRuby = $event"
          />
        </template>
      </ContentControls>

      <section
        class="border-error/10 bg-error/5 mt-3 w-full space-y-5 rounded-xl border px-3 py-7 shadow-2xs sm:px-4 sm:py-5"
      >
        <div class="pb-6 sm:hidden">
          <ContentMobileControls
            content-label="對話"
            :playback-rate="playbackRate"
            :is-playing="playbackActive"
            :playback-label="playbackActionLabel"
            :lookup-mode="lookupMode"
            :show-ruby="showRuby"
            @toggle-playback="handlePlaybackAction"
            @update:playback-rate="playbackRate = $event"
            @update:lookup-mode="lookupMode = $event"
            @update:show-ruby="showRuby = $event"
          />
        </div>

        <div
          v-if="isPracticing"
          class="sticky top-[60px] z-20 -mx-1 flex items-center justify-between gap-3 rounded-lg border border-error/20 bg-white/95 px-3 py-2 shadow-sm backdrop-blur"
        >
          <span class="text-sm font-bold text-neutral-800">
            第 {{ (practiceIndex ?? 0) + 1 }}／{{ lines.length }} 句
          </span>
          <button
            type="button"
            class="text-error hover:text-error focus-visible:outline-error inline-flex min-h-9 items-center gap-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
            @click="stopPractice"
          >
            <span class="icon-[tabler--player-stop-filled] size-4" />
            結束練習
          </button>
        </div>

        <article
          v-for="line in lines"
          :id="`conversation-line-${line.id}`"
          :key="line.id"
          class="chat !gap-x-2 sm:!gap-x-4"
          :class="[
            isSender(line.speakerId) ? 'chat-sender' : 'chat-receiver',
            isPracticing ? 'scroll-mt-[128px]' : 'scroll-mt-20',
          ]"
        >
          <div class="chat-avatar avatar placeholder">
            <div
              class="grid size-10 place-items-center overflow-hidden rounded-full bg-white"
            >
              <img
                :src="characterAvatarMap[line.speaker.avatarKey]"
                :alt="line.speaker.name"
                class="size-full object-cover"
              />
            </div>
          </div>
          <div
            class="chat-header mb-1 flex w-full items-center gap-1.5 text-xs text-neutral-500"
            :class="isSender(line.speakerId) ? 'flex-row-reverse' : ''"
          >
            <span>{{ line.speaker.name }}・{{ line.speaker.role }}</span>
            <span
              v-if="line.id === activeLineId"
              class="text-error text-[11px] font-medium"
            >
              NOW SPEAK
            </span>
          </div>
          <div
            class="chat-bubble border-error/30 !max-w-full !rounded-xl border !text-left !text-neutral-900 shadow transition-colors duration-300 before:!hidden sm:!max-w-[min(38rem,85vw)]"
            :class="line.id === activeLineId ? '!bg-error/5' : '!bg-white'"
          >
            <ContentMaskable
              :visible="isJapaneseVisible(line.id, line.speakerId)"
              :overlay-hint="practiceHintFor(line.id)"
              :reveal-label="`顯示 ${line.speaker.name} 的日文對話`"
              @reveal="revealJapaneseLine(line.id)"
            >
              <p class="text-[15px] leading-7 sm:text-base">
                <ContentAnnotatedText
                  :text="line.text"
                  :vocabulary-notes="line.vocabularyNotes"
                  :grammar-notes="line.grammarNotes"
                  :show-ruby="showRuby"
                  :lookup-mode="lookupMode"
                />
              </p>
            </ContentMaskable>
            <ContentMaskable
              class="mt-2 border-t border-neutral-200 pt-2"
              :visible="isTranslationVisible(line.id)"
              :reveal-label="`顯示 ${line.speaker.name} 的中文翻譯`"
              @reveal="revealTranslationLine(line.id)"
            >
              <p class="text-xs leading-5 text-neutral-500">
                {{ line.translation }}
              </p>
            </ContentMaskable>
          </div>
          <div class="chat-footer mt-3 flex gap-2">
            <AudioButton
              :label="`播放 ${line.speaker.name} 的對話`"
              :state="audioState(line.id)"
              @play="
                togglePlay({
                  audioId: line.id,
                  text: toPlainJapanese(line.text),
                })
              "
            />
            <FavoriteButton :label="`收藏 ${line.speaker.name} 的對話`" />
            <button
              v-if="isPracticeUserStep(line.id)"
              type="button"
              class="btn btn-error btn-sm min-h-8 gap-1 px-3 text-[13px] text-white"
              @click="handlePracticeAction(line.id)"
            >
              <span :class="practiceActionIcon(line.id)" class="size-4" />
              {{ practiceActionText(line.id) }}
            </button>
          </div>
        </article>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">重點單字</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          <ContentVocabularyPopover
            v-for="note in vocabularyNotes"
            :key="note.id"
            :note="note"
            variant="badge"
          >
            {{ note.surface }}
          </ContentVocabularyPopover>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">常見用法與文法</h2>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          展開查看對話中的用法與另一個例句。
        </p>
        <ContentGrammarNotes
          class="mt-5"
          :notes="grammarNotes"
          :active-id="activeGrammarId"
          @toggle="toggleGrammar"
        />
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">
          更多 {{ material.level.toUpperCase() }} 對話
        </h2>
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MaterialCard
            v-for="item in recommendations"
            :key="item.id"
            :material="item"
            :show-type="false"
            :show-level="false"
          />
        </div>
      </section>
    </main>
  </div>
</template>
