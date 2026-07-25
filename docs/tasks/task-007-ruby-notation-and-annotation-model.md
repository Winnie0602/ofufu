# Task 007: Ruby 括號記法 ＋ 註解與內文分離模型（前端）

## 狀態

`Completed`（2026-07-21 實作完成並經使用者確認畫面無誤；parser、「註解與內文分離」的標註模型、§5 斷行修正皆到位，`npm run build` 通過）

## 背景與動機

task-005／006 目前文章／對話內文採「segment 陣列」模型：每句 `japanese` 之外，另用
`segments: MaterialTextSegment[]` 把整句切成一段一段，ruby 掛在 segment 上、單字／文法
標註也掛在 segment 上（`vocabularyNoteId` / `grammarNoteId`）。實際使用後浮現三個問題：

1. **segment 太碎且產生無用 id**：ruby 逼著每個要標假名的詞自成一段，於是純文字段也被
   切開並各自帶一個用不到的 `id`（如 `RdA1qZ8mN4vC`）。作者要手寫大量 segment 與 id。
2. **混合 ruby 結構囉嗦**：像「楽しめる」只有「楽」需假名，得寫成
   `parts: [{ text:'楽', ruby:'たの' }, { text:'しめる' }]`。
3. **標註粒度只能到整個 segment**：一個 segment 只能掛一個 `grammarNoteId`，且範圍＝整段
   文字。於是「〜たり、〜たりする」被迫把整句子（含逗號、兩個 たり 子句）塞進單一 segment，
   整段被畫底線＋藍字；手機版斷行後末段（如「きます」）還會因 `<button>` 預設
   `text-align: center` 而單獨置中（見下方 CSS 根因）。

## 設計決議（2026-07-21 與使用者確認的方向）

### 1. Ruby 改括號記法 ＋ parser

- 作者改寫**純文字**，假名以括號標記：`日本[にほん]には四[よっ]つの季節`。
- 混合 ruby 直接寫 `楽[たの]しめる`，不再需要 `parts`。
- 由 parser 把括號字串解析成渲染用結構；純文字段不再需要 per-segment `id`。

### 2. 內文註解改為「與內文分離」的 anchor 模型

- 句子物件存**純文字（含 ruby 括號）** ＋ 一個 `notes` 陣列。
- 每則 note 以 **surface 子字串 ＋ occurrence（第幾次出現）** 定位，renderer 自行在句中
  找位置並包裹樣式。
- **明確否決「數字 index 定位」**：手寫易錯、且句子改一個字後所有 index 位移，維護成本高。
- 只需列出「要標記的 note」，不必逐字切 segment；「要不要每個字可點」與 segment 數量脫鉤。

### 3. 文法不連續範圍

- `〜たり、〜たりする` 這類跨越逗號的不連續文法，以下列任一表達：
  - 一則 note 帶**多個 anchor**（如 `['眺めたり', '温めたり']`）；或
  - 多則 note **共用同一個 `grammarPointId`**。
- 只框關鍵字，不再整段藍字。

### 4. 與 task-006 的關係

- **不影響** task-006 的單字身分／去重成果：note 的內容欄位
  （`dictionaryForm`／`reading`／`partOfSpeech`／`contextualMeaning`／`surfaceReading` 等）
  維持不變，本 Task 只改「note 如何定位在句子裡」。

### 5. 順帶修正 `AnnotatedText.vue` 斷行置中

- 根因：`app/components/materials/AnnotatedText.vue` 用 `<button>` 包標註文字，未覆蓋
  瀏覽器對 `<button>` 的預設 `text-align: center`（及 inline-block 行為），導致換行後
  較短的一行在按鈕盒內置中。改為左對齊、讓斷行行為與一般文字一致。

## 四個取捨的定案

> 這四項在實作前列為待拍板，實作時已全部定案。以下為當初的問題與最後的決定。

### 1. 同一個詞在句中出現兩次，要標哪一個？

**問題**：句子是「花が咲いて、花が散る」，只想標第二個「花」。光說「標『花』」不夠。

**定案**：anchor 加 `occurrence` 欄位，從 1 數起，不寫就是第 1 個。欄位名選 `occurrence`，沒有採用當初並列的 `nth`。

```ts
{ surface: '花', occurrence: 2 }
```

見 `app/types/material.ts` 的 `NoteAnchor`。

### 2. 標註範圍只蓋到帶讀音漢字段的一半怎麼辦？

**問題**：「公園」的讀音「こうえん」掛在兩個字合起來上，不能拆成 公→こう、園→えん。若有人只想標「園」，從中間切下去假名就壞了。

**定案：不切，整段納入（外擴）。** 標註範圍只要碰到帶讀音的漢字段就整段標進去——標「園」實際會標成「公園」。沒有讀音的假名則可精準切到單一字元。

**這與原設計預想相反**：本文件上方原寫「renderer 需能切開 ruby token 再重組——這是本模型唯一比 segment 麻煩處」，實作改採外擴，把切開重組的麻煩繞掉了。

見 `app/utils/annotatedText.ts` 的 `Unit.atomic` 與 `isCovered()`。

### 3. 單字與文法標到同一段字怎麼辦？

**問題**：同一段文字同時被單字 note 與文法 note 涵蓋時，要顯示成哪一種。

**定案：v1 不支援重疊，文法優先。** 先讓文法佔位，單字只填尚未被佔走的部分；因此重疊處的單字不會被標出來。

見 `buildAnnotatedSegments()` 中 grammar 先於 vocabulary 的 `claim()` 順序。

### 4. 作者要在教材裡寫字面中括號怎麼辦？

**問題**：`[ ]` 已被讀音記法佔用。

**定案**：

- 只有**半形** `[ ]` 是記法；**全形**「［］」與其他括號原樣顯示。
- 反斜線跳脫：`\[` `\]` `\\` 得到字面字元。
- 寫錯時（`[` 找不到對應 `]`、或括號前沒有漢字可掛）**原樣保留括號**，讓作者在畫面上一眼看出記法有誤，而不是默默吃掉。
- 巢狀括號未支援，也不需要。

見 `app/utils/parseRuby.ts` 檔頭說明。

## Out of Scope

- 後端 resolver、AI 產生內容、待審核草稿單字與審核後台。
- MongoDB、正式 API、Schema 與 migration。
- 收藏持久化、登入、會員與收藏專區頁面。
- 完整文法教材頁與文法身分重構。

## 完成後續接：批次補資料並回頭驗收列表

> 這是 task-007 **完成後**才進行的階段，記錄於此以免遺漏。

- 先前多個 Task 的部分驗收項目標為未完成（X），**主因是現階段 mock data 量不足以驗證列表
  呈現是否合乎標準**，非實作缺陷。
- 待本 Task 的括號記法＋notes anchor 格式定案後，批次生成更多**閱讀／對話／單字** mock data。
- **不要在 007 定案前用舊格式生大量資料**，否則 007 後需全部重生。

補完資料後的**必做步驟：回頭清算舊 X**（不是只生資料就結束）：

1. 逐一翻查先前 Task／Feature Spec 的 Acceptance Criteria，找出**當初因「資料量不足」而
   打 X** 的項目（例：`context/features/reading.spec.md`、`conversation.spec.md`、
   `docs/tasks/task-002/005` 等的分頁、程度篩選、推薦數量、多分類等）。
2. 用新的資料量實際驗證每一條，該勾的**回勾 `[x]`**，並補上驗收日期。
3. 若某條 X 其實是**真實缺陷（非資料量）**，另立 bug/Task 處理，不要混進資料補齊裡默默勾掉。
4. **例句規則已於 Task 008 同步**：有連結到單字表時優先使用單字表 `examples`；未連結時可使用註解備用例句；兩者皆無則不顯示空的例句區塊。批次補資料時沿用 `content-model.md` 的現行優先序，不再使用已移除的 `featured` 分層。
5. 全部清算完成後，更新 `context/current-feature.md` 任務總覽與相關 spec/task 狀態。

### 給 ChatGPT 的資料產生規範（做完 007 才產出）

- 資料由**使用者貼需求給 ChatGPT**（視為完全不懂本專案領域的 AI）生成。
- 由 Claude 在本 Task 定案後，依括號記法＋notes anchor 的實際格式，撰寫一份「給 ChatGPT 的
  資料產生規範」（欄位定義、括號寫法、note anchor 規則、範例、禁止事項），交付使用者。
- **本輪不預先撰寫該規範**（格式未定，先寫會失效）。

## Reference

- `context/content-model.md`
- `app/components/materials/AnnotatedText.vue`
- `app/components/materials/RubyText.vue`
- `app/types/material.ts`（`MaterialTextSegment`／`MaterialGrammarNote`／`MaterialVocabularyNote`）
- `app/data/materials/reading.ts`、`app/data/materials/conversation.ts`
- `docs/tasks/task-006-vocabulary-identity-refactor.md`
