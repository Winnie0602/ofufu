<template>
  <div>
    <Header class="fixed top-0 z-50" />

    <SongPlayer>
      <!-- 頁面內容插進 SongPlayer 中間 -->
      <div class="flex flex-col items-center">
        <slot />
      </div>
    </SongPlayer>
  </div>
</template>
