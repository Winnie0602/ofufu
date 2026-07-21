import type {
  AnnotatedSpan,
  MaterialGrammarNote,
  MaterialVocabularyNote,
  NoteAnchor,
  RubyToken,
} from '~/types/material'
import { parseRuby } from './parseRuby'

/** 一段以純文字字元計的起訖範圍 [start, end)（end 為 exclusive）。 */
export type CharRange = {
  start: number
  end: number
}

/** 找 `surface` 在 `plain` 中第 `occurrence`（1-based）次出現的起始索引；找不到回傳 -1。 */
function nthIndexOf(plain: string, surface: string, occurrence: number): number {
  if (!surface) return -1
  let from = 0
  let count = 0
  while (true) {
    const index = plain.indexOf(surface, from)
    if (index === -1) return -1
    count++
    if (count === occurrence) return index
    from = index + 1
  }
}

/**
 * 依 anchor（surface ＋ occurrence）在純文字中定位，回傳字元範圍；找不到回傳 null。
 * 純文字＝各 token.text 串接（不含 ruby 讀音與括號）。
 */
export function locateAnchor(plain: string, anchor: NoteAnchor): CharRange | null {
  const start = nthIndexOf(plain, anchor.surface, anchor.occurrence ?? 1)
  if (start === -1) return null
  return { start, end: start + anchor.surface.length }
}

type NoteRef =
  | { vocabularyNote: MaterialVocabularyNote }
  | { grammarNote: MaterialGrammarNote }
  | null

/**
 * 渲染單元：純文字段拆到「單一字元」可精準切；ruby token（漢字連續段＋單一讀音）
 * 維持不可分割，避免拆壞 furigana。標註以字元範圍疊在其上。
 */
type Unit = {
  text: string
  ruby?: string
  start: number
  end: number
  /** ruby token 為 true：只要 anchor 與它相交就整段納入（外擴，不切斷）。 */
  atomic: boolean
}

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
      // 純文字段拆成單字元 unit，才能在字界精準切開標註範圍
      for (const char of token.text) {
        units.push({ text: char, start: offset, end: offset + char.length, atomic: false })
        offset += char.length
      }
    }
  }
  return units
}

/** unit 是否落在標註範圍內：atomic 只要相交即納入；純字元需被完整涵蓋。 */
function isCovered(unit: Unit, range: CharRange): boolean {
  return unit.atomic
    ? unit.start < range.end && unit.end > range.start
    : unit.start >= range.start && unit.end <= range.end
}

/**
 * 把一句（含 ruby 括號的純文字）＋ 本句註解，組成渲染計畫（span 陣列）。
 *
 * 流程：解析 ruby token → 拆成 unit → 依註解 anchor 的字元範圍標記每個 unit →
 * 把「所屬相同」的連續 unit 併成 span（純文字段沿字界精準切、ruby token 維持完整）。
 *
 * 取捨（v1）：不支援單字／文法重疊。先標文法、再讓單字填入尚未被占用的 unit；
 * 因此若真的重疊，文法優先、其內單字不另標（與已定案的取捨一致）。
 */
export function buildAnnotatedSegments(
  text: string,
  notes: {
    vocabularyNotes?: MaterialVocabularyNote[]
    grammarNotes?: MaterialGrammarNote[]
  } = {},
): AnnotatedSpan[] {
  const tokens = parseRuby(text)
  const plain = tokens.map((token) => token.text).join('')
  const units = toUnits(tokens)
  const refs: NoteRef[] = units.map(() => null)

  const claim = (range: CharRange | null, ref: NoteRef) => {
    if (!range) return
    units.forEach((unit, index) => {
      if (refs[index] === null && isCovered(unit, range)) refs[index] = ref
    })
  }

  // 文法先占（重疊時優先）；多 anchor 的不連續文法各自定位、共用同一 note。
  for (const grammarNote of notes.grammarNotes ?? []) {
    for (const anchor of grammarNote.anchors) {
      claim(locateAnchor(plain, anchor), { grammarNote })
    }
  }

  // 單字填入尚未被占用的 unit；surface 本身即 anchor。
  for (const vocabularyNote of notes.vocabularyNotes ?? []) {
    claim(
      locateAnchor(plain, {
        surface: vocabularyNote.surface,
        occurrence: vocabularyNote.occurrence,
      }),
      { vocabularyNote },
    )
  }

  // 併合：所屬註解相同（同一 note 物件，或同為純文字 null）的連續 unit 併成一個 span；
  // 純字元累積成一個 token、ruby token 各自成一個 token。
  const spans: AnnotatedSpan[] = []
  units.forEach((unit, index) => {
    const ref = refs[index]!
    const previous = spans[spans.length - 1]

    if (!previous || spanNote(previous) !== refNote(ref)) {
      spans.push({
        tokens: [],
        ...(ref && 'vocabularyNote' in ref ? { vocabularyNote: ref.vocabularyNote } : {}),
        ...(ref && 'grammarNote' in ref ? { grammarNote: ref.grammarNote } : {}),
      })
    }

    const span = spans[spans.length - 1]!
    const lastToken = span.tokens[span.tokens.length - 1]
    if (unit.atomic) {
      span.tokens.push({ text: unit.text, ruby: unit.ruby })
    } else if (lastToken && lastToken.ruby === undefined) {
      lastToken.text += unit.text // 併回同一純文字 token
    } else {
      span.tokens.push({ text: unit.text })
    }
  })
  return spans
}

/** 取 span 所屬的註解物件（純文字為 null），用於併合判斷。 */
function spanNote(span: AnnotatedSpan): object | null {
  return span.vocabularyNote ?? span.grammarNote ?? null
}

/** 取 ref 所屬的註解物件（純文字為 null），用於併合判斷。 */
function refNote(ref: NoteRef): object | null {
  if (ref === null) return null
  return 'vocabularyNote' in ref ? ref.vocabularyNote : ref.grammarNote
}
