# Task 006: 教材單字身分與收藏去重重構（前端）

## 狀態

`Completed`（2026-07-21 使用者確認 Popover 視覺定案，驗收通過）

> 文章內文法標記的呈現問題（整段藍字底線、手機斷行後末段置中、標記範圍過大）不屬本 Task 回歸，已改由 task-007 隨 stand-off 標註模型一併處理。

## 目標

把文章／對話等教材內文的單字註解，從「自我完備、內嵌整包單字資料」改為
「參照優先」：註解只保存出現位置與上下文，完整單字資料由單字表（`VocabularyItem`）
以**辭書形自然鍵**查得。目的在前端 mock data 上驗證：

- 使用者在閱讀頁收藏「食べた」與在單字頁收藏「食べる」，會解析到**同一個身分**，
  收藏後只會是一筆「食べる」，且顯示的是單字表的**完整資訊**。
- AI 未來產生文章時，只需輸出辭書形／讀音／詞性，不需複製任何單字 ID；由前端
  resolver 依自然鍵配對。

本 Task 只做前端型別、resolver 與 mock data 驗證，不建資料庫、正式 API、收藏
持久化或 AI 產生流程。設計依據見 `context/content-model.md`。

## 範圍決定

- 本 Task 只處理**單字身分與去重**。
- Ruby 括號記法與 parser（改善 authoring）**不在本 Task**，留待 task-007。
- 文法連結沿用現況（nullable `grammarPointId`），本 Task 不重構文法。

## 實作計畫與變更檔案

### 1. 型別：辭書形自然鍵與參照優先（每個欄位都加註解）

身分原則（重要）：

- **PK（被參照的身分）＝穩定的代理鍵 `id`（模擬 nanoid）**，不用羅馬拼音 slug 或自然鍵字串當 PK；自然鍵可能被修改，當 PK 會讓參照斷掉。
- **自然鍵 `(dictionaryForm, reading, partOfSpeech)` 只做配對／去重**，資料庫層對應 unique index，不是 PK。

- `app/types/vocabulary.ts`
  - 明確定義單字條目的**辭書形自然鍵** `(dictionaryForm 辭書形, reading 讀音, partOfSpeech 詞性)`。
  - `VocabularyItem` 補上必要的正規化欄位（若 `word` 即辭書形則加註解說明；必要時新增 `dictionaryForm`）。
  - **每個欄位補上繁中註解**，說明用途與是否為自然鍵一部分。
- `app/types/material.ts`
  - 重構 `MaterialVocabularyNote` 為參照優先：
    - `id`：此出現位置（occurrence）的固定模擬 nanoid（代理鍵）。
    - `surface`：實際出現的活用形（例：食べた）。
    - `surfaceReading`：表層形自己的讀音（例：楽しめる→たのしめる）——**畫面主要顯示讀音**，非自然鍵，不用於配對。（實作中依使用者回饋新增，原計畫未列。）
    - `dictionaryForm`：辭書形（例：食べる）——自然鍵。
    - `reading`：辭書形讀音——自然鍵，僅用於配對，非畫面主要顯示讀音。
    - `partOfSpeech`：詞性——自然鍵，消除同形歧義（沿用專案既有代碼，不改名）。
    - `contextualMeaning?`：此字在本段的用法／意思（單字表沒有的本文專屬資訊）。
    - `examples?`：未連結單字表時的備用例句（連結後優先顯示單字表例句）。
    - `vocabularyItemId?: string | null`：resolver 解析後填入，未命中為 `null`。
  - 移除舊 `lexemeId`（身分改由自然鍵表達），並在型別註解記錄遷移原因。
  - **所有欄位補上繁中註解。**

### 2. Resolver 與收藏身分（新檔）

- `app/utils/vocabularyIdentity.ts`（新）
  - `vocabularyIdentityKey({ lemma, reading, partOfSpeech })`：回傳正規化後的穩定字串鍵。
  - `resolveVocabularyItem(note, items)`：以自然鍵在 `vocabularyItems` 找對應條目，找到回傳該 `VocabularyItem`、找不到回傳 `null`。
  - `favoriteVocabularyKey(source)`：回傳收藏用身分（已連結 → 單字表 `id`；未連結 → 由自然鍵組出的草稿鍵）。此函式即「去重」的單一依據。

### 3. Mock data：建立可驗證的配對案例

- `app/data/materials/vocabulary.ts`：
  - 確保示範用辭書形條目存在（如 `食べる`）。
  - 將所有單字 `id` 從羅馬拼音 slug（如 `taberu`）改為固定模擬 nanoid，與 reading／conversation 一致，符合「不以羅馬拼音作 ID」規則。
- `app/data/materials/reading.ts`、`app/data/materials/conversation.ts`：
  - 至少一個註解的活用形（食べた）其 `dictionaryForm` 命中單字表條目（食べる），驗證去重。
  - 至少一個註解**故意未命中**單字表，驗證未連結（草稿）狀態。
  - 各註解補上 `dictionaryForm`／`reading`／`partOfSpeech`。

### 4. Popover：精簡顯示，配對只做去重

`app/components/materials/VocabularyPopover.vue` 現況結構（已隨使用者多輪 UI 回饋調整）：

- 標題列：表層形（點的字，`text-xl font-bold`）＋詞性 badge（`badge badge-outline badge-error badge-sm rounded-sm`，樣式取自單字列表頁），右側播放／收藏 icon。
- 讀音：永遠顯示 `note.surfaceReading`（表層形自己的讀音），不是辭書形讀音。
- 「解釋」區塊：灰色 `badge badge-soft badge-neutral badge-sm rounded-full` 標題 ＋ `contextualMeaning`（`text-primary font-medium`）。
- 「辭書形」區塊：同款灰色 badge 標題，內容為 `dictionaryForm・reading`；**只在 `surface !== dictionaryForm`（活用形）時顯示**，名詞等表層形＝辭書形時不顯示。
- 「例句」區塊：同款灰色 badge 標題 ＋ 2～3 句例句。
- 三個區塊（解釋／辭書形／例句）之間用留白（`mb-5`）分隔，**不使用分隔線**；區塊內文字用 `pl-2` 對齊 badge 文字起點。
- **不攤開單字表的通用意思／完整活用**；那屬於未來「收藏單字區」與單字列表頁。
- 配對（resolver）不用於 Popover 顯示，只在收藏時以 `favoriteVocabularyKey` 去重；收藏按鈕的 label 以辭書形表示歸屬。
- 一律保留讀音與繁中意思，不做成「只有日文」；維持 FlyonUI 官方 `tooltip` click 結構，不改定位機制。
- `app/components/materials/AnnotatedText.vue`：維持傳入 note，不改渲染結構、不使用 `v-html`。

> 此區塊的視覺仍在與使用者逐項確認中（顏色／字重／間距／badge 用法），下一位接手者若要再調整，直接改 `VocabularyPopover.vue` 對應區塊即可，不需重新設計結構。

## Out of Scope

- Ruby 括號記法與 parser（task-007）。
- 後端 resolver、AI 產生內容、自動建立草稿單字與審核後台。
- MongoDB、正式 API、Schema 與 migration。
- 收藏持久化、登入、會員與收藏專區頁面。
- 文法身分重構與完整文法頁。
- 新增 npm 套件或新的相近顏色。

## Acceptance Criteria（技術驗收）

- [x] `MaterialVocabularyNote` 改為參照優先，含 `surface`／`dictionaryForm`／`reading`／`partOfSpeech`／`contextualMeaning`／`vocabularyItemId`；不再內嵌整包單字資料，移除舊 `lexemeId`。
- [x] 所有本 Task 新增或修改的型別，**每個欄位都有繁中註解**。
- [x] 單字 `id` 全部為固定模擬 nanoid（不含羅馬拼音 slug 如 `taberu`）；收藏參照此代理鍵。
- [x] `vocabularyIdentityKey` 對活用形（`食べた`→`食べる`、實作示範 `楽しめる`→`楽しむ`）與其辭書形單字條目回傳**相同**身分鍵；surface 不影響身分鍵。
- [x] `resolveVocabularyItem` 能由活用形註解正確解析到辭書形單字條目；未命中回傳 `null`。
- [x] `favoriteVocabularyKey` 對上述兩個來源回傳**相同**收藏鍵（去重依據）。
- [x] 至少一個閱讀與一個對話註解可解析到單字表；至少一個註解為未連結狀態。
- [x] Popover 精簡顯示表層形＋詞性 badge、`surfaceReading`、本文 `contextualMeaning`、（活用時）辭書形區塊與 2～3 句例句；不攤開單字表通用資料。配對僅用於收藏去重（`favoriteVocabularyKey`）。2026-07-21 使用者確認視覺定案。
- [x] 全程不使用 `v-html`；不改動 FlyonUI Popover 定位機制。
- [x] 桌面與手機版無非預期水平溢出（2026-07-21 使用者視覺確認；文法標記斷行置中為 `<button>` 樣式與 segment 粒度問題，另由 task-007 處理）。
- [x] 未新增 npm 套件或新的相近顏色。
- [x] `npx eslint <changed-files>` 通過。
- [x] `npm run build` 通過（可保留專案既有 Toast／ConfirmModal 匯入警告）。
- [x] `git diff --check` 通過。

## 人工驗收方式（給人類的驗收方式）

在具備 Google TTS credentials 的本機 `npm run dev`，依序確認：

1. **活用形示範**：打開閱讀文章「日本の四季を楽しもう」（`/reading/V1StGXR8Z5jd`），點第一句「楽しめる」開 Popover，確認顯示：表層形「楽しめる」＋詞性 badge「動」、讀音「たのしめる」（表層形自己的讀音，非辭書形讀音）、「解釋」區塊、「辭書形」區塊（楽しむ・たのしむ）、「例句」區塊 2 句；三區塊間留白分隔、無分隔線。
2. **名詞不顯示辭書形區塊**：點「桜」（閱讀）、「予約」（對話 `/conversation/C7Km3pQx92Ab`），確認讀音、解釋、例句都正常，但**沒有**「辭書形」區塊（因表層形＝辭書形）。
3. **未連結案例**：點「夏祭り」（閱讀）或「電話」（對話），確認一樣顯示讀音、本文用法與例句，畫面不報錯、不空白。
4. Popover 一律原地開啟、頁面不跳動。
5. **Ruby／顯示模式不受影響**：切換假名開關與三種顯示模式，確認文章／對話文字與註解仍正常，沒有整頁水平捲動。
6. 觀察開發者工具 Console，確認無型別或渲染錯誤。

> 收藏去重由 resolver／`favoriteVocabularyKey` 在「收藏動作」時保證（同字不同活用形收斂成同一筆），Popover 顯示不依賴配對結果；單字表完整資訊與收藏清單屬於未來會員 Task。

## 驗證結果

- 型別：`MaterialVocabularyNote` 已改為參照優先（`surface`／`dictionaryForm`／`reading`／`partOfSpeech`／`contextualMeaning`／`examples?`／`vocabularyItemId?`），移除 `lexemeId`；`material.ts`、`vocabulary.ts`、`vocabularyIdentity.ts` 每個欄位均有繁中註解。
- 新增 `app/utils/vocabularyIdentity.ts`：`vocabularyIdentityKey`、`vocabularyItemIdentityKey`、`resolveVocabularyItem`、`favoriteVocabularyKey`、`noteIdentity`。
- `vocabulary.ts`：31 筆單字 id（含例句 id）已由羅馬拼音 slug 改為固定模擬 nanoid；`grep` 確認無殘留 slug。新增 `桜`（名詞）、`楽しむ`（動詞）、`予約`（名詞）三筆配對用條目。
- Mock：閱讀「楽しめる→楽しむ」「桜」可解析、「夏祭り」未連結；對話「予約」可解析、「電話」未連結。
- 身分鍵等價性以純函式實測：`食べた/食べる`、`楽しめる/楽しむ`、`予約` 皆回傳相同鍵（surface 不影響）。
- `VocabularyPopover.vue`：精簡顯示（表層形／活用時辭書形／本文用法／例句），配對只用於收藏去重、不攤開單字表資料；未使用 `v-html`，未改動 FlyonUI 定位。
- `npx eslint <changed-files>`：通過。
- `npm run build`：通過（僅專案既有 Toast／ConfirmModal 匯入警告）。
- `git diff --check`：clean。

### 2026-07-21 追加：Popover 視覺逐項調整（與使用者即時來回，尚未定案）

第一版技術驗收後，使用者實際看畫面提出多輪 UI 回饋，逐一調整如下（皆已套用，`npx eslint` 與 `npm run build` 每次改動後皆重新驗證通過）：

1. 拿掉最初「單字表完整資料＋本文用法」兩層顯示（使用者認為單字表那層冗餘）→ 改為方案選項 1：Popover 只顯示本文相關輕量資訊，配對只用於收藏去重，不在 Popover 攤開單字表資料。
2. `contextualMeaning` 文案精簡：拿掉「本文指～～～」這類與意思重複的贅字（例：「櫻花；本文指春季盛開、常被觀賞的日本櫻花。」→「櫻花」）。
3. `contextualMeaning` 顯示樣式：`text-primary font-medium`（品牌藍、稍粗）。
4. 新增「解釋」「例句」灰色標籤（`badge-soft badge-neutral badge-sm rounded-full`）當小節標題；區塊間距用留白 `mb-5`，不用分隔線；內文用 `pl-2` 對齊 badge 文字起點。
5. 新增詞性 badge（`badge-outline badge-error badge-sm rounded-sm`，樣式取自單字列表頁 `VocabularyListItem.vue`），放在表層形旁邊。
6. **發現讀音顯示邏輯錯誤並修正**：原本活用形只顯示辭書形讀音（如「楽しめる」只顯示「たのしむ」的讀音），對初學者不正確。改為型別新增 `surfaceReading`（表層形自己的讀音，如「たのしめる」）為畫面主要顯示讀音；`dictionaryForm`／`reading` 移到獨立的「辭書形」區塊（同款灰色 badge），只在活用形時才顯示。已同步修改 `app/types/material.ts` 註解與 `reading.ts`／`conversation.ts` 全部 5 筆 mock 註解補上 `surfaceReading`。

**尚待確認／可能還會再調的部分**：Popover 目前視覺是與使用者即時來回調整出來的結果，**尚未收到明確的「視覺確認完成」訊號**；使用者可能會再要求微調顏色、間距、badge 措辭或版面。下一位接手者建議：
- 先確認 `VocabularyPopover.vue` 目前內容是否仍是使用者想要的（可主動詢問「目前 Popover 視覺 OK 了嗎」）。
- 若使用者確認 OK，再勾選 Acceptance Criteria 剩餘兩項（Popover 顯示、無水平溢出）並將狀態改為 `Completed`，同時更新 `context/current-feature.md`。
- 若使用者提出新的調整，直接改 `VocabularyPopover.vue` 對應區塊即可，不需重新設計資料結構（型別／resolver／mock data 已經穩定，不受這些視覺微調影響）。

## Reference

- `context/content-model.md`
- `context/features/reading.spec.md`
- `context/features/conversation.spec.md`
- `context/features/vocabulary.spec.md`
- `app/types/material.ts`
- `app/types/vocabulary.ts`
- `app/data/materials/reading.ts`
- `app/data/materials/conversation.ts`
- `app/components/materials/VocabularyPopover.vue`

## Notes

- 未命中單字表的註解在本 Task 只呈現「未連結」狀態；未來後端 resolver 會把它變成待審核草稿單字，屬 AI 產生 Task 範圍。
- 自然鍵正規化規則（送假名、異體字、外來語表記）第一版先做基本 trim／正規化，複雜規則列為待決策。
