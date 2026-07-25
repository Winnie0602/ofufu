import type { RubyToken } from '~/types/material'

/**
 * 教材內文的假名標記解析。
 *
 * 作者寫教材時，假名是用半形中括號標在漢字後面的：
 *
 *   輸入：'日本[にほん]の四[よっ]つの季節[きせつ]'
 *   輸出：日本(にほん) ／ の ／ 四(よっ) ／ つの ／ 季節(きせつ)
 *
 * 讀音掛在「緊接在前面的那串漢字」上，所以一個詞裡只有部分漢字要標也沒問題：
 *
 *   輸入：'食[た]べ物[もの]'
 *   輸出：食(た) ／ べ ／ 物(もの)
 *
 * 幾個講好的規則：
 * - 只有半形 [ ] 是記法。全形［］和其他括號都當普通文字，原樣顯示。
 * - 想寫字面的中括號就加反斜線：'\[重要\]' 會顯示成 [重要]。
 * - 作者寫錯時不吞掉也不猜，原樣把括號印出來，讓人在畫面上一眼看到哪裡壞了。
 */

// 哪些字算漢字：CJK 統一漢字與擴充 A、相容漢字，再加上 々〆〇ヶヵ 這幾個常跟漢字黏在一起的符號。
const KANJI = /[㐀-䶿一-鿿豈-﫿々〆〇ヶヵ]/

/**
 * 從 `[` 往後找它配對的 `]`，被反斜線跳脫的不算。
 *
 *   findClosingBracket('四[よっ]つ', 1)  →  5
 *   findClosingBracket('四[よっつ', 1)   →  -1（沒收尾）
 */
function findClosingBracket(text: string, openIndex: number): number {
  for (let i = openIndex + 1; i < text.length; i++) {
    if (text[i] === '\\') {
      i++ // 跳過被跳脫的字元
      continue
    }
    if (text[i] === ']') return i
  }
  return -1
}

/**
 * 取字串尾巴那串連續漢字，也就是括號裡的讀音該掛在誰身上。
 *
 *   trailingKanjiRun('日本')      →  '日本'
 *   trailingKanjiRun('のち季節')  →  '季節'
 *   trailingKanjiRun('べ')        →  ''      （沒漢字可掛）
 */
function trailingKanjiRun(text: string): string {
  let start = text.length
  while (start > 0 && KANJI.test(text[start - 1]!)) start--
  return text.slice(start)
}

/**
 * 把括號記法拆成 token 陣列，給 RubyText.vue 渲染成 <ruby>。
 *
 *   parseRuby('朝[あさ]の空気[くうき]')
 *   → [{ text: '朝', ruby: 'あさ' }, { text: 'の' }, { text: '空気', ruby: 'くうき' }]
 *
 * 作法是從頭掃一遍，還沒遇到括號的字先累積在 buffer；一碰到 `[` 就把 buffer 尾巴的
 * 漢字切下來配讀音，前面剩下的部分先送出去成為一個純文字 token。
 */
export function parseRuby(text: string): RubyToken[] {
  const tokens: RubyToken[] = []
  let buffer = ''

  const flushBuffer = () => {
    if (buffer) {
      tokens.push({ text: buffer })
      buffer = ''
    }
  }

  let i = 0
  while (i < text.length) {
    const char = text[i]!

    if (char === '\\' && i + 1 < text.length) {
      buffer += text[i + 1] // 跳脫：下一個字元原樣輸出
      i += 2
      continue
    }

    if (char === '[') {
      const close = findClosingBracket(text, i)
      if (close === -1) {
        buffer += char // 沒有對應的 ]，當成字面括號
        i++
        continue
      }

      const reading = text.slice(i + 1, close)
      const base = trailingKanjiRun(buffer)
      if (base) {
        buffer = buffer.slice(0, buffer.length - base.length)
        flushBuffer()
        tokens.push({ text: base, ruby: reading })
      } else {
        // 前面沒漢字可掛（例：'べ[もの]'）：原樣印出括號，讓作者看到自己寫錯了
        buffer += text.slice(i, close + 1)
      }
      i = close + 1
      continue
    }

    buffer += char
    i++
  }

  flushBuffer()
  return tokens
}

/**
 * 只留看得見的日文，讀音和括號全部丟掉。TTS 與「關掉假名」時用這個。
 *
 *   toPlainJapanese('朝[あさ]の空気[くうき]')  →  '朝の空気'
 */
export function toPlainJapanese(text: string): string {
  return parseRuby(text)
    .map((token) => token.text)
    .join('')
}
