import type { RubyToken } from '~/types/material'

/**
 * Ruby 括號記法 parser。
 *
 * 記法（authoring 格式）：純文字，furigana 以「半形中括號」標在緊接在前的漢字連續段之後。
 *   例：`日本[にほん]には四[よっ]つの季節[きせつ]があり、楽[たの]しめます。`
 *   混合：`食[た]べ物[もの]` → 食(た)・べ・物(もの)。
 *
 * 規則：
 * - 只有「半形 `[` `]`」是記法；全形「［］」及其他括號一律當普通文字，原樣保留。
 * - 讀音掛在「緊接在前的漢字連續段」（trailing 漢字 run）；其餘為純文字段。
 * - 反斜線跳脫下一個字元：`\[`、`\]` 得到字面括號，`\\` 得到字面反斜線。
 * - 容錯：`[` 找不到對應 `]`，或 `[...]` 前沒有漢字可掛，皆原樣保留字面括號，讓作者一眼看出寫錯。
 */

// 漢字連續段判定：CJK 統一漢字（含擴充 A）、相容漢字，及疊字／記號 々〆〇ヶヵ。
const KANJI = /[㐀-䶿一-鿿豈-﫿々〆〇ヶヵ]/

/** 從 `openIndex`（指向 `[`）起，找到第一個未被跳脫的 `]`；找不到回傳 -1。 */
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

/** 取字串尾端「連續漢字」的最長後綴；無漢字回傳空字串。 */
function trailingKanjiRun(text: string): string {
  let start = text.length
  while (start > 0 && KANJI.test(text[start - 1]!)) start--
  return text.slice(start)
}

/** 把括號記法解析成顯示用的 ruby token 陣列。 */
export function parseRuby(text: string): RubyToken[] {
  const tokens: RubyToken[] = []
  let plain = ''

  const flushPlain = () => {
    if (plain) {
      tokens.push({ text: plain })
      plain = ''
    }
  }

  let i = 0
  while (i < text.length) {
    const char = text[i]!

    if (char === '\\' && i + 1 < text.length) {
      plain += text[i + 1] // 跳脫：下一個字元原樣輸出
      i += 2
      continue
    }

    if (char === '[') {
      const close = findClosingBracket(text, i)
      if (close === -1) {
        plain += char // 無對應 ]，當字面括號
        i++
        continue
      }

      const reading = text.slice(i + 1, close)
      const base = trailingKanjiRun(plain)
      if (base) {
        plain = plain.slice(0, plain.length - base.length)
        flushPlain()
        tokens.push({ text: base, ruby: reading })
      } else {
        // 前面沒有漢字可掛：原樣保留字面括號，提示作者記法有誤
        plain += text.slice(i, close + 1)
      }
      i = close + 1
      continue
    }

    plain += char
    i++
  }

  flushPlain()
  return tokens
}

/**
 * 剝除括號記法，得到純日文（無 furigana、無括號），供 TTS 與「純日文顯示」使用。
 */
export function toPlainJapanese(text: string): string {
  return parseRuby(text)
    .map((token) => token.text)
    .join('')
}
