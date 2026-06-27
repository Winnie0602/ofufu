import type { LangCode } from '~/types/lang'
import type { LyricData } from '~/types/song'

interface UseTypingModeOptions {
  lyricData: LyricData
  mode: 'allBlank' | 'partial' | 'translation'
  blankCountPercent?: number // 只給 partialBlank 用
  language: LangCode
}

export function useTypingMode(options: UseTypingModeOptions) {
  const { mode, blankCountPercent = 50, language, lyricData } = options

  const answer = lyricData[language] || ''

  const chars = Array.from(answer) // 正確答案陣列
  const length = chars.length

  const blankCount = blankCountPercent * 0.01 * length

  // 只記錄「可輸入字」；符號/空白/預設顯示字會由 mergedInput 自動補上
  const userInput = ref<string>('')
  const resultStates = ref<('correct' | 'wrong')[] | null>(null)

  // 哪些index要顯示答案
  const revealedIndexes = ref<number[]>([])

  const isAutoFillChar = (char: string) => {
    // 只把空白與標點視為自動填入，避免一般文字被誤判
    return /\s/u.test(char) || /[\p{P}]/u.test(char)
  }

  const generateRevealedIndexes = () => {
    if (mode === 'allBlank') {
      revealedIndexes.value = []
      return
    }

    // 只取「可作答」index（排除空白及符號）
    const letterIndexes = chars
      .map((char, i) => (isAutoFillChar(char) ? null : i))
      .filter((i): i is number => i !== null)

    if (letterIndexes.length === 0) {
      revealedIndexes.value = []
      return
    }

    // 要被挖空的 index
    const blanks = new Set<number>()

    while (blanks.size < Math.min(blankCount, letterIndexes.length)) {
      const r = letterIndexes[Math.floor(Math.random() * letterIndexes.length)]!
      blanks.add(r)
    }

    // 要顯示的字母 index
    revealedIndexes.value = letterIndexes.filter((i) => !blanks.has(i))
  }

  generateRevealedIndexes()

  const isAutoFillIndex = (i: number) => {
    return isAutoFillChar(chars[i] || '')
  }

  const isHintIndex = (i: number) => {
    return revealedIndexes.value.includes(i)
  }

  // 顯示在畫面的字
  const editableIndexes = computed(() => {
    const arr: number[] = []
    for (let i = 0; i < length; i++) {
      if (!isAutoFillIndex(i)) {
        arr.push(i)
      }
    }
    return arr
  })

  const editableLength = computed(() => editableIndexes.value.length)

  const mergedInputChars = computed(() => {
    const typedChars = Array.from(userInput.value)
    let typedIndex = 0

    return chars.map((char, i) => {
      if (isAutoFillIndex(i)) {
        return char
      }

      const typed = typedChars[typedIndex] || ''
      typedIndex++
      // partial 題型下，沒輸入時顯示淺色提示字
      if (!typed && isHintIndex(i)) {
        return char
      }
      return typed
    })
  })

  const mergedInput = computed(() => mergedInputChars.value.join(''))

  const typedIndexMap = computed(() => {
    const typedLength = Array.from(userInput.value).length
    const map = Array.from({ length }, () => false)
    let editablePos = 0

    for (let i = 0; i < length; i++) {
      if (isAutoFillIndex(i)) {
        continue
      }

      map[i] = editablePos < typedLength
      editablePos++
    }

    return map
  })

  const isTypedIndex = (i: number) => {
    return typedIndexMap.value[i] || false
  }

  const currentInputIndex = computed(() => {
    return editableIndexes.value[userInput.value.length] ?? length
  })

  const displayChars = computed(() => mergedInputChars.value)

  // 這格可不可以輸入
  // 這格是不是單字與單字間的空白
  const isOriBlank = (i: number) => {
    return chars[i] === ' '
  }

  // 判斷答案
  const checkAnswer = () => {
    resultStates.value = chars.map((_, i) => {
      return mergedInputChars.value[i] === chars[i] ? 'correct' : 'wrong'
    })
  }

  // 外部傳入輸入
  const handleInput = (target: HTMLInputElement) => {
    userInput.value = Array.from(target.value).slice(0, editableLength.value).join('')
    target.value = userInput.value

    if (userInput.value.length === editableLength.value) {
      checkAnswer()
    } else {
      resultStates.value = null
    }
  }

  return {
    length, // 答案長度
    displayChars, // 顯示在畫面上 [_,_,A,_,B]
    resultStates, // 檢查答案結果 [correct,correct,wrong,correct]
    handleInput,
    isAutoFillIndex, // 這格是否為空白/符號等自動帶入
    isHintIndex, // 這格是否為提示字（可輸入覆蓋）
    isOriBlank, // 這格是不是單字與單字間的空白
    userInput, // 使用者實際輸入（僅可作答字元）
    editableLength, // 可輸入字元數量
    currentInputIndex, // 下一個可輸入位置index（超過則為答案長度）
    mergedInput, // 顯示在畫面上的字串
    isTypedIndex, // 這格是否已經輸入
    answer, // 正確答案
  }
}
