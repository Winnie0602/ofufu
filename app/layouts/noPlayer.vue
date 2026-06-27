<script setup lang="ts">
onBeforeUnmount(async () => {
  window.location.reload()
})
</script>

<template>
  <div class="min-h-screen bg-[#A66B6B]/40">
    <Header />

    <div class="mx-auto w-full">
      <slot />
    </div>
  </div>
</template>
