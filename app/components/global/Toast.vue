<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-24 z-50 flex flex-col items-center gap-3">
      <TransitionGroup
        name="toast-list"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="w-[320px] overflow-hidden rounded-xl bg-[#B58C8C]/70 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm"
        >
          <!-- 內容 -->
          <div class="px-4 py-3 text-center text-sm font-medium text-white/95">
            {{ toast.message }}
          </div>

          <!-- 進度條底 -->
          <div class="h-1 w-full bg-[#B58C8C]/60">
            <!-- 跑馬燈 -->
            <div
              class="h-full bg-[#F9595F]"
              :style="{
                animation: `toast-progress ${toast.duration}ms linear forwards`,
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
