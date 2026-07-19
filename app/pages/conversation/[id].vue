<script setup lang="ts">
import { conversationMaterials } from '~/data/materials/conversation'
import { characterAvatarMap } from '~/types/conversation'
import { LANG_CONFIG_MAP } from '~/types/lang'
import { materialCategoryLabels, type StudyMode } from '~/types/material'

const route = useRoute()
const material = conversationMaterials.find(
  (item) => item.id === route.params.id,
)

if (!material) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇對話' })
}

const mode = ref<StudyMode>('full')
const showRuby = ref(true)
const playbackRate = ref(1)
const activeGrammarId = ref<string | null>(material.grammarNotes[0]?.id ?? null)
const isConversationPlaying = ref(false)
const { audioState, playAudio, playAudioSequence, stopAudio } = useTtsAudio(
  LANG_CONFIG_MAP.ja,
)

const playConversation = async () => {
  if (isConversationPlaying.value) {
    stopAudio()
    isConversationPlaying.value = false
    return
  }

  isConversationPlaying.value = true
  await playAudioSequence(
    material.lines.map((line) => ({
      audioId: line.id,
      text: line.japanese,
    })),
  )
  isConversationPlaying.value = false
}

const participantMap = new Map(
  material.participants.map((participant) => [participant.id, participant]),
)
const isSender = (speakerId: string) =>
  speakerId === material.participants[0]?.id
const toggleGrammar = (grammarId: string) => {
  activeGrammarId.value = activeGrammarId.value === grammarId ? null : grammarId
}
const selectGrammar = async (grammarId: string) => {
  activeGrammarId.value = grammarId
  await nextTick()
  document.getElementById(`grammar-note-${grammarId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
const recommendations = conversationMaterials
  .filter((item) => item.id !== material.id && item.level === material.level)
  .slice(0, 5)

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
          <div>
            <h1 class="text-3xl leading-tight font-bold sm:text-5xl">
              {{ material.title }}
            </h1>
            <p class="mt-4 max-w-3xl leading-7 text-neutral-600">
              {{ material.excerpt }}
            </p>
          </div>
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

      <MaterialsStudyControls
        class="mt-8"
        :mode="mode"
        :show-ruby="showRuby"
        :playback-rate="playbackRate"
        content-label="對話"
        @update:mode="mode = $event"
        @update:show-ruby="showRuby = $event"
        @update:playback-rate="playbackRate = $event"
      />

      <section
        class="border-error/10 bg-error/5 mt-3 w-full space-y-5 rounded-xl border px-3 py-7 shadow-2xs sm:px-4 sm:py-9"
      >
        <div>
          <button
            type="button"
            class="btn btn-outline btn-error btn-sm text-error hover:bg-error/10 hover:text-error bg-white"
            :aria-label="
              isConversationPlaying ? '停止播放對話' : '自動播放對話'
            "
            @click="void playConversation()"
          >
            <span
              :class="
                isConversationPlaying
                  ? 'icon-[tabler--player-stop-filled]'
                  : 'icon-[tabler--player-play-filled]'
              "
              class="size-4"
            />
            {{ isConversationPlaying ? '停止播放對話' : '自動播放對話' }}
          </button>
        </div>
        <article
          v-for="line in material.lines"
          :key="line.id"
          class="chat"
          :class="isSender(line.speakerId) ? 'chat-sender' : 'chat-receiver'"
        >
          <div class="chat-avatar avatar placeholder">
            <div
              class="grid size-10 place-items-center overflow-hidden rounded-full bg-white"
            >
              <img
                :src="
                  characterAvatarMap[
                    participantMap.get(line.speakerId)!.avatarKey
                  ]
                "
                :alt="participantMap.get(line.speakerId)!.name"
                class="size-full object-cover"
              />
            </div>
          </div>
          <div class="chat-header mb-1 text-xs text-neutral-500">
            {{ participantMap.get(line.speakerId)?.name }}・{{
              participantMap.get(line.speakerId)?.role
            }}
          </div>
          <div
            class="chat-bubble border-error/30 !bg-error/5 max-w-[min(38rem,85vw)] !rounded-xl border !text-left !text-neutral-900 shadow before:!hidden"
          >
            <p
              class="text-[15px] leading-7 sm:text-base"
              :class="{
                'pointer-events-none invisible select-none':
                  mode === 'listening',
              }"
              :aria-hidden="mode === 'listening'"
            >
              <MaterialsAnnotatedText
                :segments="line.segments"
                :vocabulary-notes="material.vocabularyNotes"
                :show-ruby="showRuby"
                @select-grammar="selectGrammar"
              />
            </p>
            <p
              class="mt-2 border-t border-neutral-200 pt-2 text-xs leading-5 text-neutral-500"
              :class="{
                'pointer-events-none invisible select-none': mode !== 'full',
              }"
              :aria-hidden="mode !== 'full'"
            >
              {{ line.translation }}
            </p>
          </div>
          <div class="chat-footer mt-3 flex gap-2">
            <AudioButton
              :label="`播放 ${participantMap.get(line.speakerId)?.name} 的對話`"
              :state="audioState(line.id)"
              @play="playAudio({ audioId: line.id, text: line.japanese })"
            />
            <FavoriteButton
              :label="`收藏 ${participantMap.get(line.speakerId)?.name} 的對話`"
            />
          </div>
        </article>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">重點單字</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          <MaterialsVocabularyPopover
            v-for="note in material.vocabularyNotes"
            :key="note.id"
            :note="note"
            variant="badge"
          >
            {{ note.surface }}
          </MaterialsVocabularyPopover>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">常見用法與文法</h2>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          展開查看對話中的用法與另一個例句。
        </p>
        <MaterialsGrammarNotes
          class="mt-5"
          :notes="material.grammarNotes"
          :active-id="activeGrammarId"
          @toggle="toggleGrammar"
        />
      </section>

      <section class="mt-14">
        <h2 class="text-2xl font-bold">
          更多 {{ material.level.toUpperCase() }} 對話
        </h2>
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MaterialsMaterialCard
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
