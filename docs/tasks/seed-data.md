# 教材資料產生規範（給 ChatGPT）

> 這份文件貼給 ChatGPT，請它依此格式產生 Ofufu 的**閱讀（reading）／對話（conversation）**教材假資料。
> ChatGPT 不需要懂本專案，只要照本文欄位、括號記法與規則輸出即可。
> 產出後由使用者貼進 `app/data/materials/reading.ts`、`conversation.ts`。

---

## 0. 你的角色與任務

你要產生「給日文初學者（繁體中文使用者）」的閱讀短文或情境對話假資料，並替內文的**漢字標讀音**、標出**可查單字**與**文法點**。輸出**TypeScript 物件**，直接可貼進資料陣列。所有翻譯與說明用**繁體中文**（教材內的日文保留原文）。

---

## 1. 你要產出的結構

### 1-1. 閱讀教材（reading）

```ts
{
  id: 'V1StGXR8Z5jd',          // 模擬 id，見 §2
  type: 'reading',
  title: '日本の四季を楽しもう', // 日文標題
  excerpt: '桜、夏祭り…を読みます。', // 一句日文簡介
  level: 'n5',                  // n5 | n4 | n3 | n2 | n1，見 §7
  categories: ['culture', 'travel'], // 見 §7 合法值
  coverImage: null,             // 一律填 null（不提供圖片）
  paragraphs: [
    {
      id: 'RdP8kM2xQ5aN',
      sentences: [
        {
          id: 'RdS1wF7cL3pT',
          text: '日本[にほん]には四[よっ]つの季節[きせつ]があります。', // §3 括號記法
          translation: '日本有四個季節。', // 這一句的繁中翻譯
          vocabularyNotes: [ /* §5，可省略 */ ],
          grammarNotes: [ /* §6，可省略 */ ],
        },
        // …更多句子
      ],
    },
    // …更多段落
  ],
  translation: [
    '第一段的繁體中文翻譯…',
    '第二段的繁體中文翻譯…',
    // paragraphs 有幾段，這裡就有幾個字串（整段層級翻譯）
  ],
}
```

### 1-2. 對話教材（conversation）

```ts
{
  id: 'C7Km3pQx92Ab',
  type: 'conversation',
  title: '電話で席を予約する',
  excerpt: 'レストラン予約の会話です。',
  level: 'n4',
  categories: ['restaurant', 'reservation'],
  coverImage: null,
  sceneDescription: 'レストランに電話して席を予約する場面です。', // 日文情境說明
  participants: [
    { id: 'CvCh1mP8qR4tN', name: 'ふふ', role: '客人', avatarKey: 'fufu' },
    { id: 'CvCh2xK6vD9sL', name: 'シロ', role: '店員', avatarKey: 'shiro' },
  ],
  lines: [
    {
      id: 'CvLn1qT7mN3pH',
      speakerId: 'CvCh2xK6vD9sL', // 必須等於某個 participant 的 id
      text: 'お電話[でんわ]ありがとうございます。',
      translation: '感謝您的來電。',
      vocabularyNotes: [ /* §5，可省略 */ ],
      grammarNotes: [ /* §6，可省略 */ ],
    },
    // …更多對話行
  ],
}
```

**對話固定角色**（只能用這三個，`name` 與 `avatarKey` 要配對）：
`ふふ`→`fufu`、`シロ`→`shiro`、`クロ`→`kuro`。`role` 是繁中身分（如「客人」「店員」）。

---

## 2. 模擬 id 規則

- 每個 `id`（教材、段落、句子、單字註解、文法註解、例句、角色）都是 **8～12 碼英數字**（`A–Z a–z 0–9`）的**無語意**字串，例：`RdS1wF7cL3pT`。
- **本次輸出內不可重複**。不要用有意義的字（不要 `sakura01`），不要用純數字流水號。
- 你只需保證「這一次輸出」內部不重複即可；**跨批次、與現有檔案的 id 撞號由專案方在貼回時自動處理**，你不必也無法顧到。
- `vocabularyItemId`、`grammarPointId` 等「連結 id」**你不要填**（見 §5／§6）。

---

## 3. Ruby 括號記法（最重要，務必照做）

內文（`text`）是**純文字**，漢字讀音用**半形中括號** `[ ]` 標在「緊接在前的連續漢字」後面。

### 規則
1. **只有半形 `[` `]` 是記法**。全形「［］」或其他括號會被當普通文字。
2. 括號內是**假名讀音**，掛在**它前面那段連續漢字**上。
3. **所有漢字都要標讀音**（初學者導向）；純假名不用標。
4. **送假名／夾在中間的假名要留在括號外**：
   - 動詞活用：`楽[たの]しむ`、`楽[たの]しめる`、`食[た]べる`
   - 夾假名複合詞：`食[た]べ物[もの]`
   - 訓讀數量詞：`四[よっ]つ`、`一[ひと]つ`
5. **純漢字詞可整組一個括號**：`季節[きせつ]`、`雪景色[ゆきげしき]`、`予約[よやく]`。
6. 若真的需要在文中打出半形 `[`，用反斜線跳脫：`\[`。

### 對照範例
| 想呈現 | 正確寫法 | 錯誤寫法 |
| --- | --- | --- |
| 日本（にほん） | `日本[にほん]` | `[にほん]日本` |
| 食べ物（たべもの） | `食[た]べ物[もの]` | `食べ物[たべもの]`（讀音不能蓋到假名） |
| 四つ（よっつ） | `四[よっ]つ` | `四つ[よっつ]` |
| 楽しめる | `楽[たの]しめる` | `楽しめる[たのしめる]` |

> **純日文** = 把每個 `[...]` 刪掉。系統用它做語音朗讀，所以 `text` 刪掉括號後必須是通順、正確的日文。

---

## 4. 句子／行結構

- `text`：帶括號記法的日文（§3）。
- `translation`：**這一句**的繁體中文翻譯。
- `vocabularyNotes?`／`grammarNotes?`：可省略；沒有可查單字或文法就不寫。

---

## 5. 單字註解 `vocabularyNotes`

標出句中「實詞」讓使用者可查、可收藏。**助詞、標點不標**。

### 欄位

```ts
{
  id: 'RdVw8Tn3Lm2K',
  surface: '楽しめる',        // 句中實際出現的樣子（活用形）；見「anchor 規則」
  surfaceReading: 'たのしめる', // 「表層形」的讀音（全假名），對應畫面顯示
  dictionaryForm: '楽しむ',    // 辭書形（原形）
  reading: 'たのしむ',         // 辭書形讀音（全假名）
  partOfSpeech: 'verb',       // 見 §7 合法值
  contextualMeaning: '享受；此處為可能形，意為「能夠享受」', // 此字在本句的意思／用法（繁中）
  featured: true,             // 是否主打，見下方規則
  // occurrence: 2,           // 同一 surface 在本句出現多次時才寫（第幾個，1 起算）
  examples: [                 // 可省略；備用例句（若省略畫面就不顯示例句）
    { id: 'RdVe5tK8mP2qL', japanese: '春には桜を楽しめる。', translation: '春天能享受櫻花。' },
  ],
}
```

### `featured` 規則（重要）
- `featured: true`＝本句**主打字**：一句**最多 1～2 個**（對話的短句常常 0 個），畫面會標記。
- `featured: false`＝一般實詞：**仍要標出**（未來可查可收藏），但畫面預設不標記。
- 請**廣泛**標出句中實詞並多數設 `false`，只把最有教學價值的 1～2 個設 `true`。**不要每個都 true**（會整片螢光筆）。

### anchor 規則（務必遵守，否則系統定位不到）
- `surface` 必須是「**把 `text` 的括號刪掉後的純日文**」裡**逐字存在的子字串**。
  - 例：`text: '楽[たの]しめるようになります。'` → 純日文 `楽しめるようになります。` → `surface` 可以是 `楽しめる`（存在），不可是 `楽しむ`（不在句中）。
- `surface` **本身不含括號**（是純日文），讀音改放在 `surfaceReading`。
- 同一 `surface` 在同一句出現多次時，用 `occurrence` 指定第幾個（1 起算）；只出現一次就省略。

### 表層形 vs 辭書形
- `surface`／`surfaceReading`：句中**實際樣子**與其讀音（初學者看到的）。
- `dictionaryForm`／`reading`／`partOfSpeech`：**辭書形自然鍵**，系統用來配對單字表、收藏去重。
- 名詞等原形＝表層形時，`surface` 與 `dictionaryForm` 可相同。

---

## 6. 文法註解 `grammarNotes`

標出句中的文法句型。

```ts
{
  id: 'RdGr7Yp2Lm9Q',
  grammarPointId: null,        // 一律 null（系統之後自動連結，你不要填）
  pattern: '〜ようになる',       // 文法句型（前面加「〜」表接續）
  shortExplanation: '表示能力或狀態的變化，中文近似「變得會…」。', // 繁中短解釋
  anchors: [                   // 句中要框起來的關鍵字，見規則
    { surface: 'ようになります' },
  ],
  sourceExample: {             // 取自本句的代表例句（japanese 用純日文，不加括號）
    id: 'RdGe1qM6xP4nH',
    japanese: '景色や食べ物を楽しめるようになります。',
    translation: '變得能享受景色與食物。',
  },
  extraExample: {              // 另一個同句型例句
    id: 'RdGe2kV9tC5sL',
    japanese: '日本語が話せるようになりました。',
    translation: '變得會說日文了。',
  },
}
```

### anchors 規則
- 每個 `anchor.surface` 同樣必須是「`text` 刪括號後純日文」裡的**子字串**（同 §5 anchor 規則），且**不含括號**。
- **只框關鍵字**，不要把整句都框起來。
- **不連續文法**（關鍵字被逗號或其他字隔開，如 `〜たり、〜たりする`）：用**多個 anchor**，例：
  ```ts
  anchors: [{ surface: '眺めたり' }, { surface: '温めたり' }]
  ```
- `sourceExample.japanese`、`extraExample.japanese` 用**純日文**（不加括號記法）。

---

## 7. 合法列舉值（只能用這些）

- `level`：`'n5' | 'n4' | 'n3' | 'n2' | 'n1'`
- `partOfSpeech`：`'noun'`（名）、`'verb'`（動）、`'i_adjective'`（い形）、`'na_adjective'`（な形）、`'adverb'`（副）、`'particle'`（助）。
  - 標註以**實詞**為主，`particle` 幾乎用不到。
- `categories`（可多選，用這些 key）：
  `news, science, culture, food, travel, life, restaurant, reservation, airport, work, schedule, hotel, shopping, service, daily, friends`
- `avatarKey`（對話角色）：`'fufu' | 'shiro' | 'kuro'`，對應 `name`：`ふふ / シロ / クロ`。

---

## 8. 禁止事項

1. **不要**用全形括號當讀音記法；讀音只用半形 `[ ]`。
2. **不要**把讀音蓋到假名上（`食べ物[たべもの]` 錯，要 `食[た]べ物[もの]`）。
3. `surface`／`anchor.surface`／各 `examples.japanese`／`sourceExample.japanese` **不含括號記法**（純日文）。
4. `surface`／`anchor.surface` 必須是該句純日文的**真實子字串**，否則系統定位失敗。
5. **不要**填 `vocabularyItemId`；`grammarPointId` 一律 `null`。
6. `partOfSpeech`、`level`、`categories`、`avatarKey` 只能用 §7 列的值。
7. **不要**每個單字都 `featured: true`（一句最多 1～2 個 true）。
8. `id` 不重複、無語意、8～12 碼英數。
9. **不要**輸出 HTML／`<ruby>` 標籤；ruby 只用括號記法。
10. `text` 刪掉括號後必須是**通順正確的日文**（供朗讀）。

---

## 9. 完整範例（可照抄結構）

```ts
// 閱讀，一段兩句
{
  id: 'RxN7aM2kP9qd',
  type: 'reading',
  title: '朝の公園',
  excerpt: '朝[あさ]の公園[こうえん]の様子[ようす]を読みます。',
  level: 'n5',
  categories: ['life', 'daily'],
  coverImage: null,
  paragraphs: [
    {
      id: 'RxP1aa2bb3cc',
      sentences: [
        {
          id: 'RxS1dd4ee5ff',
          text: '朝[あさ]の公園[こうえん]は静[しず]かで、犬[いぬ]を散歩[さんぽ]させる人[ひと]がいます。',
          translation: '早晨的公園很安靜，有人在遛狗。',
          vocabularyNotes: [
            {
              id: 'RxV1gg6hh7ii',
              surface: '静か',
              surfaceReading: 'しずか',
              dictionaryForm: '静か',
              reading: 'しずか',
              partOfSpeech: 'na_adjective',
              contextualMeaning: '安靜的',
              featured: true,
            },
            {
              id: 'RxV2jj8kk9ll',
              surface: '散歩',
              surfaceReading: 'さんぽ',
              dictionaryForm: '散歩',
              reading: 'さんぽ',
              partOfSpeech: 'noun',
              contextualMeaning: '散步；此處為「散歩させる（帶去散步／遛）」',
              featured: false,
            },
          ],
        },
        {
          id: 'RxS2mm0nn1oo',
          text: '天気[てんき]が良[よ]い日[ひ]は、子[こ]どもたちが遊[あそ]んだり、走[はし]ったりします。',
          translation: '天氣好的日子，孩子們會玩耍、奔跑。',
          grammarNotes: [
            {
              id: 'RxG1pp2qq3rr',
              grammarPointId: null,
              pattern: '〜たり、〜たりする',
              shortExplanation: '列舉幾個代表性動作，「做做…、做做…之類」。',
              anchors: [{ surface: '遊んだり' }, { surface: '走ったり' }],
              sourceExample: {
                id: 'RxE1ss4tt5uu',
                japanese: '子どもたちが遊んだり、走ったりします。',
                translation: '孩子們會玩耍、奔跑等。',
              },
              extraExample: {
                id: 'RxE2vv6ww7xx',
                japanese: '休みの日は本を読んだり、音楽を聞いたりします。',
                translation: '休假時會看看書、聽聽音樂。',
              },
            },
          ],
        },
      ],
    },
  ],
  translation: [
    '早晨的公園很安靜，有人在遛狗。天氣好的日子，孩子們會在公園裡玩耍、奔跑。',
  ],
}
```

---

## 10. 送出前自我檢查清單

- [ ] 每個 `text` 刪掉 `[...]` 後是通順正確的日文；所有漢字都有讀音。
- [ ] 讀音沒有蓋到假名（送假名留在括號外）。
- [ ] 每個 `surface` 與 `anchor.surface` 都是該句純日文的真實子字串、且不含括號。
- [ ] 每句 `featured: true` 最多 1～2 個；其餘實詞為 `false`。
- [ ] `examples`／`sourceExample`／`extraExample` 的 `japanese` 都是純日文（無括號）。
- [ ] 沒填 `vocabularyItemId`；所有 `grammarPointId` 為 `null`。
- [ ] `level`／`partOfSpeech`／`categories`／`avatarKey` 都用合法值。
- [ ] 對話 `speakerId` 都對得上某個 `participant.id`。
- [ ] 所有 `id` 皆 8～12 碼英數、無語意、不重複。
- [ ] `reading` 段落翻譯數量 = `paragraphs` 段落數。

---

## 附錄：貼回流程備註（給專案方，非 ChatGPT 需遵守）

> 這段是給使用者／Claude 的工作流程，ChatGPT 不必負責；整份規範仍可原樣貼給 ChatGPT。

1. **一次少量**：一批建議 3～5 篇，且同批只產同一種（全閱讀 或 全對話），格式較穩。
2. **貼回位置**：把物件貼進 `app/data/materials/reading.ts` 或 `conversation.ts` 的**陣列 `[ ]` 內**，與現有資料並排、逗號隔開；不覆蓋現有代表案例；`import` 那行不動。
3. **跨批 id 撞號屬正常**：ChatGPT 分批產出常重用 id。貼回後由 Claude 以腳本自動 dedupe（保留每個 id 第一次出現、重複者換新唯一值），不需人工管。
4. **貼回後必驗**（Claude 執行）：括號無殘留、每個 surface／anchor 定位得到、漢字皆有讀音、詞性／level／category／avatarKey 合法、`speakerId` 對得上角色、featured 分佈合理、id 全域唯一、`reading` 段落翻譯數＝段數，最後 `npx eslint` ＋ `npm run build`。
