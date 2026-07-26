<script setup lang="ts">
import type { DisplayAPIResult } from '~/types/tatoeba'
import type { LangCode } from '~/types/lang'

const { open, word, sentense, loading, lang } = defineProps<{
  open: boolean
  word: string
  sentense: DisplayAPIResult[] | undefined
  loading: boolean
  lang: LangCode
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

// 語音在 v1 停用（見 task-011 定案七）。這裡的例句來自 Tatoeba，是**任意外部句子**，
// 沒有 materialId 可指，無法套用「只能唸既有教材」的保護；而 /api/tts 現在只接受
// 內容座標，所以不是「一併遷移就好」，是設計上的衝突。
// 這個功能今天本來就是壞的（原本整站 TTS 都回 503），停用不是退步。
// 日後恢復的方向：改成已登入使用者才能對任意文字合成，或把常用例句先收成教材。
const handleClose = () => emit('close')
</script>

<template>
  <div>
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/30"
        @click="handleClose"
      />
    </transition>

    <transition name="slide-up">
      <div
        v-if="open"
        class="fixed right-0 bottom-0 left-0 z-50 mx-auto w-full"
      >
        <div
          class="bg-[#7A3A3A]/70 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md"
        >
          <div class="flex justify-center py-2">
            <div class="h-1.5 w-10 rounded-full bg-white/20" />
          </div>

          <div
            class="mt-1 flex items-center justify-center px-5 md:justify-between md:pb-3"
          >
            <div
              class="flex flex-col justify-center text-sm tracking-[0.2em] text-white/50 uppercase md:flex-row md:items-end md:space-x-3 md:text-xl"
            >
              <div
                class="flex justify-center rounded-xl bg-gray-300/20 px-3 py-1 font-bold"
              >
                「 {{ word }} 」
              </div>
              <div class="font-medium">{{ $t('example_sentenses') }}</div>
            </div>

            <button
              class="hidden p-1 text-white/40 hover:text-white md:block"
              @click="handleClose"
            >
              ✕
            </button>
          </div>

          <div
            class="drawer-scroll max-h-[55vh] overflow-y-auto px-3 pb-8 md:max-h-[35vh] md:px-10"
          >
            <div v-if="!loading" class="space-y-3">
              <div
                v-if="sentense?.length === 0"
                class="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center"
              >
                <div class="text-sm text-white/60 md:text-base">
                  No example sentences found
                </div>
                <div class="mt-1 text-xs text-white/40">Try another word</div>
              </div>

              <div v-else>
                <div
                  v-for="(s, i) in sentense"
                  :key="i"
                  class="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10 md:gap-4 md:p-4"
                >
                  <AudioButton
                    class="flex-none md:mt-1"
                    label="這裡的例句目前沒有語音"
                    size="md"
                    disabled
                  />

                  <div class="w-full flex-1 space-y-1">
                    <div
                      v-if="lang === 'ja'"
                      class="text-base leading-relaxed font-medium text-white md:text-lg"
                      v-html="s.html"
                    />

                    <div
                      v-else
                      class="text-base leading-relaxed font-medium text-white md:text-lg"
                    >
                      {{ s.text }}
                    </div>

                    <div class="text-sm leading-snug text-white/60">
                      {{ s.translations }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex animate-pulse gap-4">
                <div class="h-10 w-10 flex-none rounded-full bg-white/10"></div>
                <div class="flex-1 space-y-2 py-1">
                  <div class="h-4 w-full rounded bg-white/10"></div>
                  <div class="h-3 w-2/3 rounded bg-white/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.28s ease,
    opacity 0.28s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.drawer-scroll::-webkit-scrollbar {
  width: 8px;
}
.drawer-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.drawer-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
.drawer-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
