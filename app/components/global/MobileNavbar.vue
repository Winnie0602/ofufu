<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <!-- 背景遮罩 -->
  <div
    class="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300"
    :class="open ? 'opacity-100' : 'pointer-events-none opacity-0'"
    @click="emit('close')"
  />

  <!-- Drawer -->
  <aside
    class="fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-64 rounded-r-xl bg-white p-6 shadow-lg transition-transform duration-300 ease-out"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <nav class="space-y-6">
      <a
        href="#"
        class="block rounded px-2 py-1 text-gray-800 transition hover:bg-[#F9595F]/10 hover:text-[#F9595F]"
        @click="emit('close')"
      >
        Songs
      </a>
      <a
        href="#"
        class="block rounded px-2 py-1 text-gray-800 transition hover:bg-[#F9595F]/10 hover:text-[#F9595F]"
        @click="emit('close')"
      >
        About
      </a>
    </nav>
  </aside>
</template>
