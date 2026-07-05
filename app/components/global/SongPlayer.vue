<script setup lang="ts">
import { formatTime } from '~/utils/time'
import { throttle } from 'lodash-es'

const route = useRoute()
const store = usePlayerStore()

// UI顯示的暫存時間
const seekingTime = ref(0)

// 節流版本的拖曳更新（每75ms更新一次）
const onSeekInput = throttle((e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  seekingTime.value = value
  store.isSeeking = true
}, 75)




</script>

<template>
  <div class="flex min-h-screen flex-col pt-[56px]">
    <!-- 影片 -->

  </div>
</template>
