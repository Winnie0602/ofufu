<script setup lang="ts">
const emit = defineEmits<{
  (e: 'input', char: string): void
  (e: 'delete'): void
}>()

// 五十音直列數據
const groups = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '（', 'ゆ', '）', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', 'を', 'ん', 'ー', '～'],
]

const subChars = ['が', 'ざ', 'だ', 'ば', 'ぱ', 'っ', 'ゃ', 'ゅ', 'ょ']
</script>

<template>
  <div
    class="w-[70%] rounded-3xl border border-[#B58C8C]/30 bg-[#F5EFEF]/50 p-4 shadow-sm"
  >
    <div class="hide-scroll flex gap-2 overflow-x-auto pb-4">
      <div class="flex gap-2">
        <div v-for="(group, i) in groups" :key="i" class="flex flex-col gap-2">
          <button
            v-for="char in group"
            :key="char"
            class="flex h-12 w-12 items-center justify-center rounded-xl border-b-2 border-stone-200 bg-white text-lg font-bold text-[#7A3A3A] shadow-sm transition-all hover:bg-[#FFE5E5] active:scale-90"
            @click="emit('input', char)"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <div class="mx-2 w-px self-stretch bg-[#B58C8C]/20"></div>

      <div class="flex min-w-[140px] flex-col gap-3">
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="char in subChars"
            :key="char"
            class="h-10 rounded-lg border border-[#FFE5E5] bg-[#FFF9F9] text-xs font-bold text-[#A66B6B] shadow-sm active:scale-95"
            @input="emit('input', char)"
            @click="emit('input', char)"
          >
            {{ char }}
          </button>
        </div>

        <div class="mt-auto flex flex-col gap-2">
          <button
            class="h-10 rounded-xl bg-[#E4BABA]/30 text-[10px] font-black tracking-widest text-[#A66B6B] uppercase"
            @click="emit('clear')"
          >
            Reset
          </button>
          <button
            class="flex h-14 flex-col items-center justify-center rounded-xl bg-[#F9595F] text-white shadow-md shadow-[#F9595F]/20 transition-transform active:scale-95"
            @click="emit('delete')"
          >
            <i class="fa-solid fa-delete-left text-xl"></i>
            <span class="mt-1 text-[10px] font-bold">BACKSPACE</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 點擊時的小動畫 */
button:active {
  background-color: #ffe5e5;
}
</style>
