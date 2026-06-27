<script setup lang="ts">
const emit = defineEmits<{
  (e: 'input', char: string): void
  (e: 'delete'): void
  (e: 'clear'): void
}>()

// 1. 子音區 (Consonants) - 通常排在左側
const consonants = [
  ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
  ['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ'],
  ['ㅈ', 'ㅊ', 'ㅋ', 'ㅌ'],
  ['ㅍ', 'ㅎ', 'ㄲ', 'ㄸ'],
  ['ㅃ', 'ㅆ', 'ㅉ', '', ''], // 補位維持對齊
]

// 2. 母音區 (Vowels) - 排在中間
const vowels = [
  ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ'],
  ['ㅗ', 'ㅛ', 'ㅜ', 'ㅠ'],
  ['ㅡ', 'ㅣ', 'ㅐ', 'ㅒ'],
  ['ㅔ', 'ㅖ', '', ''], // 補位
]
</script>

<template>
  <div
    class="hide-scroll w-full max-w-4xl overflow-x-auto rounded-3xl border border-[#B58C8C]/30 bg-[#F5EFEF]/50 p-4 shadow-sm"
  >
    <div class="flex min-w-max gap-4">
      <div class="flex gap-2">
        <div
          v-for="(group, i) in consonants"
          :key="i"
          class="flex flex-col gap-2"
        >
          <button
            v-for="char in group"
            v-show="char"
            :key="char"
            class="flex h-12 w-12 items-center justify-center rounded-xl border-b-2 border-stone-200 bg-white text-xl font-bold text-[#7A3A3A] shadow-sm transition-all hover:bg-[#FFE5E5] active:scale-90"
            @click="emit('input', char)"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <div class="mx-1 w-px self-stretch bg-[#B58C8C]/20"></div>

      <div class="flex gap-2">
        <div v-for="(group, i) in vowels" :key="i" class="flex flex-col gap-2">
          <button
            v-for="char in group"
            :key="char"
            v-show="char"
            class="flex h-12 w-12 items-center justify-center rounded-xl border-b-2 border-[#B58C8C]/20 bg-[#FFF9F9] text-xl font-bold text-[#F9595F] shadow-sm transition-all hover:bg-[#FFE5E5] active:scale-90"
            @click="emit('input', char)"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <div class="mx-1 w-px self-stretch bg-[#B58C8C]/20"></div>

      <div class="flex min-w-[120px] flex-col gap-3">
        <div class="mt-auto flex flex-col gap-2">
          <button
            class="h-10 rounded-xl bg-[#E4BABA]/30 text-[10px] font-black tracking-widest text-[#A66B6B] uppercase"
            @click="emit('clear')"
          >
            Reset
          </button>
          <button
            class="flex h-24 flex-col items-center justify-center rounded-xl bg-[#F9595F] text-white shadow-md shadow-[#F9595F]/20 transition-transform active:scale-95"
            @click="emit('delete')"
          >
            <i class="fa-solid fa-delete-left text-2xl"></i>
            <span class="mt-2 text-[10px] font-bold tracking-tighter">
              BACKSPACE
            </span>
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
button:active {
  background-color: #ffe5e5;
}
</style>
