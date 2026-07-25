<script setup lang="ts">
const props = defineProps<{
  contentLabel: '文章' | '對話'
  playbackRate: number
  isPlaying: boolean
  lookupMode: boolean
  showRuby: boolean
  // 角色扮演逐句練習時覆寫播放鈕文案（開始練習／結束練習）；未傳則沿用自動播放文案。
  playbackLabel?: string
}>()

defineEmits<{
  (event: 'togglePlayback'): void
  (event: 'update:playbackRate', playbackRate: number): void
  (event: 'update:lookupMode', lookupMode: boolean): void
  // 與 update:lookupMode 同為 boolean payload，但語意不同（顯示假名），保留獨立 overload
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (event: 'update:showRuby', showRuby: boolean): void
}>()

const playbackLabel = computed(
  () =>
    props.playbackLabel ??
    (props.isPlaying
      ? `停止播放${props.contentLabel}`
      : `自動播放${props.contentLabel}`),
)
</script>

<template>
  <div class="space-y-3">
    <div class="flex w-full items-center justify-end gap-2">
      <label
        class="flex min-h-9 items-center gap-2 text-xs whitespace-nowrap text-neutral-700"
      >
        <span>播放速度</span>
        <select
          class="select select-sm h-9 w-20 bg-white px-2.5 text-sm text-neutral-900 focus:[--input-color:var(--color-error)]!"
          :value="playbackRate"
          @change="$emit('update:playbackRate', Number(($event.target as HTMLSelectElement).value))"
        >
<!-- SSR 下 <select> 的 :value 不會產生 selected 屬性，需在 option 上綁 :selected 才能正確反映預設值（如 1x） -->
          <option :value="0.75" :selected="playbackRate === 0.75">0.75x</option>
          <option :value="1" :selected="playbackRate === 1">1x</option>
          <option :value="1.25" :selected="playbackRate === 1.25">1.25x</option>
          <option :value="1.5" :selected="playbackRate === 1.5">1.5x</option>
        </select>
      </label>
      <button
        type="button"
        class="btn btn-outline btn-error btn-sm min-h-9 gap-1.5 bg-white px-3 text-[13px] text-error hover:bg-error/10 hover:text-error"
        :aria-label="playbackLabel"
        @click="$emit('togglePlayback')"
      >
        <span
          :class="
            isPlaying
              ? 'icon-[tabler--player-stop-filled]'
              : 'icon-[tabler--player-play-filled]'
          "
          class="size-4"
        />
        {{ playbackLabel }}
      </button>
    </div>

    <div class="flex items-center justify-end">
      <ContentDisplayToggles
        compact
        :lookup-mode="lookupMode"
        :show-ruby="showRuby"
        @update:lookup-mode="$emit('update:lookupMode', $event)"
        @update:show-ruby="$emit('update:showRuby', $event)"
      />
    </div>
  </div>
</template>
