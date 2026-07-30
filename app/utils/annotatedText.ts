import type {
  AnnotatedSpan,
  MaterialGrammarNote,
  MaterialVocabularyNote,
  NoteAnchor,
  RubyToken,
} from '~/types/material'
import { parseRuby } from './parseRuby'

/**
 * 教材內文的標註定位。
 *
 * 教材資料不會寫「第 5 到第 10 個字要畫底色」，只會寫「〜ている 這個文法標在『咲いていて』上」。
 * 這支檔案負責把那個詞對回句子裡的實際位置，並且切出來的段落要跟假名對齊，不能把 ruby 切壞。
 *
 *   輸入：'公園[こうえん]の花[はな]が咲[さ]いていて、きれいです。'
 *         文法註解的 anchor 是 '咲いていて'
 *
 *   輸出：公園(こうえん)の花(はな)が ／ 咲(さ)いていて ← 這段掛著文法註解 ／ 、きれいです。
 *
 * 為什麼要繞這一圈：假名是掛在整串漢字上的（「公園」配「こうえん」），
 * 不能拆成 公→こう、園→えん。所以標註範圍碰到這種漢字段時只能整段納入，不能從中間切。
 */

/** 純文字上的一段範圍，含頭不含尾。上例的 '咲いていて' 是 { start: 5, end: 10 }。 */
export type CharRange = {
  start: number
  end: number
}

/**
 * 找 `search` 第 `occurrence` 次出現的位置（從 1 數起），找不到回傳 -1。
 * 純字串工具，不管內容是什麼。
 *
 *   nthIndexOf('花が咲いて、花が散る', '花', 1)  →  0
 *   nthIndexOf('花が咲いて、花が散る', '花', 2)  →  6
 */
function nthIndexOf(text: string, search: string, occurrence: number): number {
  if (!search) return -1
  let from = 0
  let count = 0
  while (true) {
    const index = text.indexOf(search, from)
    if (index === -1) return -1
    count++
    if (count === occurrence) return index
    from = index + 1
  }
}

/**
 * 依 anchor 算出它在純文字上的範圍（純文字＝把讀音和括號都拿掉之後的句子）。
 *
 *   locateAnchor('公園の花が咲いていて、きれいです。', { surface: '咲いていて' })
 *   →  { start: 5, end: 10 }
 *
 * 同一個詞在句中出現兩次時，用 anchor 的 `occurrence` 指定要標第幾個，不寫就是第 1 個。
 * 找不到時回傳 null，那則註解就不標，不會影響整句渲染。
 */
export function locateAnchor(plain: string, anchor: NoteAnchor): CharRange | null {
  const start = nthIndexOf(plain, anchor.surface, anchor.occurrence ?? 1)
  if (start === -1) return null
  return { start, end: start + anchor.surface.length }
}

/**
 * 一個 unit 歸哪則註解管：單字、文法，或誰都不管（純文字）。
 *
 * 包一層物件是為了分辨種類——單字要渲染成紅色 Popover、文法是藍色，型別上得能區分。
 * 存進去的是「同一個」註解物件而不是複本：下面併段時用物件同一性（`!==`）判斷相鄰兩個字
 * 是否屬於同一則註解，複製過就會被當成不同則，一句話被切成一堆碎片。
 */
type UnitNote =
  | { vocabularyNote: MaterialVocabularyNote }
  | { grammarNote: MaterialGrammarNote }
  | null

/**
 * 切段用的最小單位。
 *
 * 沒有讀音的假名可以一個字一個字切；帶讀音的漢字段拆開假名就壞了，所以整段綁在一起。
 */
type Unit = {
  text: string
  ruby?: string
  start: number
  end: number
  /** 帶讀音的漢字段為 true：標註只要碰到它一角，整段都算被標到（寧可多標，不切壞假名）。 */
  atomic: boolean
}

/**
 * 把 token 攤平成 unit，順便記下每個 unit 在純文字上的位置。
 *
 *   [{ text: '公園', ruby: 'こうえん' }, { text: 'の花' }]
 *   →  公園 (0~2，整塊不可切) ／ の (2~3) ／ 花 (3~4)
 */
function toUnits(tokens: RubyToken[]): Unit[] {
  const units: Unit[] = []
  let offset = 0
  for (const token of tokens) {
    if (token.ruby !== undefined) {
      units.push({
        text: token.text,
        ruby: token.ruby,
        start: offset,
        end: offset + token.text.length,
        atomic: true,
      })
      offset += token.text.length
    } else {
      // 純文字段拆成單字元，才能在字界精準切開標註範圍
      for (const char of token.text) {
        units.push({ text: char, start: offset, end: offset + char.length, atomic: false })
        offset += char.length
      }
    }
  }
  return units
}

/**
 * 這個 unit 算不算被標到？
 *
 * 帶讀音的漢字段：碰到一點就算，所以只標「園」實際會連「公園」一起標。
 * 單一假名：要完整落在範圍裡才算。
 */
function isCovered(unit: Unit, range: CharRange): boolean {
  return unit.atomic
    ? unit.start < range.end && unit.end > range.start
    : unit.start >= range.start && unit.end <= range.end
}

/**
 * 主流程：一句內文 ＋ 這句的註解 → 給元件照著渲染的 span 陣列。
 *
 *   輸入：'公園[こうえん]の花[はな]が咲[さ]いていて、きれいです。'
 *         grammarNotes = [{ pattern: '〜ている', anchors: [{ surface: '咲いていて' }] }]
 *
 *   輸出：[ { tokens: 公園(こうえん)/の/花(はな)/が },
 *           { tokens: 咲(さ)/いていて, grammarNote },
 *           { tokens: '、きれいです。' } ]
 *
 * 元件拿到後只要看 span 上掛了什麼：有 vocabularyNote 就包單字 Popover、
 * 有 grammarNote 就包文法 Popover、都沒有就當純文字印出來。
 *
 * 單字和文法搶同一段字時，文法先佔位，單字只填剩下沒被佔走的地方（v1 不做重疊）。
 * 像「〜たり、〜たり」這種被逗號隔開的文法，一則註解可以帶多個 anchor，各自定位、共用同一則說明。
 */
export function createAnnotatedSpans(
  text: string,
  notes: {
    vocabularyNotes?: MaterialVocabularyNote[]
    grammarNotes?: MaterialGrammarNote[]
  } = {},
): AnnotatedSpan[] {
  const tokens = parseRuby(text)
  const plain = tokens.map((token) => token.text).join('')
  const units = toUnits(tokens)
  const unitNotes: UnitNote[] = units.map(() => null)

  // 把一段範圍蓋章成「屬於某則註解」，已經被佔走的 unit 不再更動。
  const claim = (range: CharRange | null, note: UnitNote) => {
    if (!range) return
    units.forEach((unit, index) => {
      if (unitNotes[index] === null && isCovered(unit, range)) unitNotes[index] = note
    })
  }

  // 文法先蓋，所以重疊時文法贏
  for (const grammarNote of notes.grammarNotes ?? []) {
    for (const anchor of grammarNote.anchors) {
      claim(locateAnchor(plain, anchor), { grammarNote })
    }
  }

  // 單字填剩下的空位；單字的 surface 本身就是它的 anchor
  for (const vocabularyNote of notes.vocabularyNotes ?? []) {
    claim(
      locateAnchor(plain, {
        surface: vocabularyNote.surface,
        occurrence: vocabularyNote.occurrence,
      }),
      { vocabularyNote },
    )
  }

  // 最後把「屬於同一則註解」的連續 unit 併成一個 span，
  // 連續的純假名併回同一個 token，帶讀音的漢字段各自獨立成一個 token。
  const spans: AnnotatedSpan[] = []
  units.forEach((unit, index) => {
    const note = unitNotes[index]!
    const previous = spans[spans.length - 1]

    if (!previous || spanNote(previous) !== noteOf(note)) {
      spans.push({
        tokens: [],
        ...(note && 'vocabularyNote' in note ? { vocabularyNote: note.vocabularyNote } : {}),
        ...(note && 'grammarNote' in note ? { grammarNote: note.grammarNote } : {}),
      })
    }

    const span = spans[spans.length - 1]!
    const lastToken = span.tokens[span.tokens.length - 1]
    if (unit.atomic) {
      span.tokens.push({ text: unit.text, ruby: unit.ruby })
    } else if (lastToken && lastToken.ruby === undefined) {
      lastToken.text += unit.text // 併回同一個純文字 token
    } else {
      span.tokens.push({ text: unit.text })
    }
  })
  return spans
}

/** 這個 span 屬於哪一則註解（純文字是 null）；相鄰兩段答案一樣才能併在一起。 */
function spanNote(span: AnnotatedSpan): object | null {
  return span.vocabularyNote ?? span.grammarNote ?? null
}

/** 同上，只是拿的是還沒併段前的 unit。 */
function noteOf(note: UnitNote): object | null {
  if (note === null) return null
  return 'vocabularyNote' in note ? note.vocabularyNote : note.grammarNote
}
