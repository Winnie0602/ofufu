# Reading Feature Spec

## 文件資訊

| 項目 | 內容 |
| --- | --- |
| 狀態 | Completed |
| Feature | 閱讀教材前台視覺原型 |
| Route | `/reading`、`/reading/[id]` |
| 資料來源 | 前端 TypeScript mock data |

## Overview

建立 Ofufu 第一版閱讀教材列表與文章內頁，以 mock data 驗證教材卡片、響應式列表、文章閱讀模式、單字 Popover、文法補充及推薦教材的資訊層級。

本 Feature 使用既有 `/api/tts` 驗證文章與單句播放體驗，但不新增 API、資料庫、會員收藏、AI 產生或管理員審核後台。Mock data 與型別先服務實際 UI，不依照 `docs/schema.md` 定稿資料庫結構。

## Routes and User Flow

1. 使用者從 Header 進入 `/reading`。
2. 使用 JLPT 程度篩選及分頁瀏覽文章。
3. 點擊教材卡片進入 `/reading/[id]`；`id` 使用穩定且不含標題語意的 nanoid 形式。
4. 在文章內頁選擇中日對照、僅顯示日文或單句學習模式，並切換 Ruby 假名顯示。
5. 點擊文章中的單字開啟 Popover，查看上下文解釋與例句。
6. 點擊有底線的文法片段，定位到文章下方對應文法並展開說明。
7. 瀏覽同程度推薦文章並前往其他文章內頁。

## Requirements

### Shared Material Foundation

- 閱讀與對話列表共用 `MaterialsPage`、`MaterialsHero`、`MaterialsLevelFilter`、`Pagination` 及新的網站共用教材卡片。
- 六大教材使用穩定英文 type code：`vocabulary`、`reading`、`conversation`、`song`、`grammar`、`quiz`，畫面由 mapping 顯示繁中名稱。
- 共用教材摘要型別 `MaterialSummary` 至少包含 `id`、`type`、`title`、`excerpt`、`level`、`categories` 與 `coverImage`。
- `id` 使用固定的模擬 nanoid，不以日文、羅馬拼音、分類或標題作為 ID。
- `categories` 為可複選的穩定 code 陣列；分類 registry 可後續增加，不把分類定死為資料庫 enum。
- 本 Feature 只顯示多個分類 Badge，暫不提供分類篩選。
- 正式教材與使用者收藏狀態分離；教材 mock data 不保存 `isFavorite`。

### Reading List

- `/reading` 使用與單字頁相同的共用教材 Hero，標題為「文章閱讀」。
- 提供 `All`、`N5`～`N1` 單選程度篩選，使用既有 `MaterialsLevelFilter`。
- 程度與頁碼同步至 route query，例如 `/reading?level=n3&page=1`。
- 切換程度時將 `page` 重設為 `1`；無效 query 使用安全預設值。
- 每頁顯示 20 篇，桌面版一列 5 張卡片，共 4 列。
- 列表下方使用既有 `Pagination`；換頁後捲動到新頁第一張卡片，快速切換只保留最後一次定位。
- 桌面卡片沿用首頁「最新教材」第一張卡片的內容層級與視覺方向。
- 手機版由同一個共用教材卡片切換為橫向 compact 排版，縮圖在左、內容在右，減少垂直捲動距離，不建立第二套卡片元件。
- 卡片顯示封面、教材類型、JLPT、所有分類、標題、摘要及收藏 UI。
- `coverImage` 為 `null` 時，由卡片元件顯示黑底白字標題的預設封面；mock data 不保存預設圖路徑。
- Header 電腦版與手機版的「文章閱讀」均連至 `/reading`。

### Reading Detail Structure

文章內頁順序為：

1. 標題、JLPT、分類與文章收藏 UI。
2. 封面圖片或黑底白字預設封面。
3. 學習模式、Ruby 開關、文章播放與播放速度控制。
4. 日文文章內容。
5. 統一放在日文文章下方的繁中翻譯。
6. 本文使用文法。
7. 五篇同程度推薦文章。

- 找不到 `[id]` 對應 mock data 時顯示 Nuxt 404，不靜默顯示其他文章。
- 第一版文章主題至少涵蓋新聞、科學、文化、美食、旅遊或生活中的數種，以驗證多分類顯示。

### Study Display Controls

- 閱讀與對話內頁共用學習顯示控制元件與型別。
- 使用 FlyonUI Join／Button 呈現三種互斥的顯示模式：
  - `full`「中日對照」：顯示日文與繁中翻譯。
  - `japanese`「僅顯示日文」：翻譯不可見但保留原本所占空間。
  - `sentence`「單句學習」：每句以獨立卡片顯示日文與繁中翻譯，右側提供播放與收藏 UI。
- 未選取模式按鈕的 hover 使用 `error/10` 淡色背景，與 JLPT 程度篩選一致。
- Ruby 假名由獨立的 FlyonUI Switch 控制。
- 播放速度使用 Select，選項為 `0.75`、`1`、`1.25`、`1.5`。
- 中日對照與僅顯示日文模式在文章內容上方顯示「自動播放文章」按鈕，視覺比照對話頁「自動播放對話」。
- 中日對照與僅顯示日文模式的「自動播放文章」依 sentence 順序呼叫既有 `/api/tts`；單句學習的播放按鈕則播放該句日文。
- 播放速度仍只有 UI 狀態，尚未套用至音訊。

### Article Content and Segments

- 文章資料由 paragraphs、sentences 與安全的結構化 segments 組成，不使用 `v-html`。
- 每個 paragraph 與 sentence 均有自己的固定模擬 nanoid。
- sentence 保存可供未來 TTS 使用的完整純文字 `japanese` 與對應繁中 `translation`。
- segment 可包含顯示文字、Ruby 讀音、單字註解 ID 或文法註解 ID；畫面不得從 DOM 重組教材資料。
- 繁中翻譯在整篇日文下方統一顯示，不逐句穿插；資料仍保留 paragraph ID，方便未來擴充對應關係。
- 文章可以收藏整篇及可點擊單字；單句學習模式提供逐句收藏 UI，本 Feature 不做持久化。

### Vocabulary Notes and Popover

- 完整單字教材與文章中的單字註解是不同層級，不要求建立文章前先完成完整單字教材。
- 概念上使用輕量 `lexemeId` 辨識同一字典詞條；完整單字教材、閱讀註解與對話註解可引用同一 Lexeme。
- 文章單字註解保存自己的 `id`、`lexemeId`、原文表層形、讀音、上下文中文意思與 2～3 句簡短例句，不保存完整活用表。
- 收藏的共同身分是 `lexemeId`，因此同一詞條從單字、閱讀或對話入口收藏時未來可以去重；本 Feature 只記錄此方向，不建立正式 Lexeme Schema 或收藏 API。
- 單字快速查看依 [FlyonUI 2.4.1 Popover](https://flyonui.com/docs/overlays/popover/) 官方結構實作，使用 `tooltip`、`tooltip-toggle`、`tooltip-content`、`tooltip-body` 與 `[--trigger:click]`。
- Popover 顯示原文、讀音、中文、2～3 句例句、播放及收藏 UI；播放按鈕本階段不串 TTS。
- Popover 需支援 FlyonUI／Floating UI 定位，並在手機版限制寬度，避免整頁水平溢出；不自行重寫定位系統。

### Grammar Annotations

- 文章句子中的文法片段使用清楚的底線按鈕表示可互動，不使用 HTML 字串注入。
- 點擊文法片段後，捲動到本文文法區對應項目並展開。
- 每個文章文法註解保存自己的 nanoid，並可使用 nullable `grammarPointId` 連到未來的完整文法教材；建立文章時不要求完整文法教材已存在。
- 本文文法採與單字頁活用區相同視覺方向的 FlyonUI Collapse，每個文法項目顯示：
  - 文法名稱／句型。
  - 一段繁中短解釋。
  - 本文實際例句及翻譯。
  - 一句額外例句及翻譯。
  - 「查看完整文法」入口。
- 文法頁尚未建立時，「查看完整文法」顯示為規劃中或停用狀態，不導向不存在的 route；未來 `grammarPointId` 可連至 `/grammar/[id]`。
- 完整接續規則、多義比較、大量例句、相似文法、練習題不重複放入文章資料，留給完整文法教材。

### Recommendations

- 文法區下方顯示 5 篇與目前文章相同 JLPT 程度的推薦文章。
- 推薦內容使用同一個共用教材卡片，並可前往 `/reading/[id]`。
- 推薦不足 5 篇時只顯示可用資料，不以目前文章補足數量。

### Responsive and Visual Conventions

- 延續首頁與單字頁的品牌色、圓角、留白及字級；不新增相近顏色。
- 優先使用 FlyonUI Card、Badge、Button、Join、Switch、Select、Popover、Collapse 及既有共用元件。
- 新畫面最高字重使用 `font-bold`。
- 手機版不得產生整頁非預期水平捲動；文章文字、Ruby、Popover 與控制列均需保持可讀及可操作。
- 不為了展示元件使用 Diff、Tooltip 或不具實際用途的 Collapse。

## Mock Data and Types

- 共用教材型別放在 `app/types/material.ts` 或獨立的共用教材內容型別檔案。
- 閱讀專屬型別放在 `app/types/reading.ts`。
- 閱讀 mock data 放在 `app/data/materials/reading.ts`。
- Mock data 使用 JSON-compatible TypeScript objects，不放在 Vue 元件內。
- `coverImage` 同時包含有圖片與 `null` 案例。
- Mock data 數量足以驗證 20 筆分頁、不同 JLPT、多分類、推薦文章、單字 Popover 與多個文法 Collapse。

## Out of Scope

- MongoDB Schema、正式 API、資料 migration。
- 正式 Lexeme／Grammar Point registry 與後台對應流程。
- AI 產生、管理員審核與發布後台。
- 真實 TTS、音檔快取、R2 與播放速度套用。
- 登入、收藏持久化及個人專區。
- 完整文法頁。
- 文章與單句收藏持久化。
- 分類篩選。

## Acceptance Criteria

- [x] `/reading` 可依程度與頁碼顯示正確 mock data，並還原有效 query。
- [x] 每頁 20 篇；桌面一列 5 張，手機使用同一元件的橫向 compact 卡片。
- [x] 無封面資料時顯示黑底白字預設封面。
- [x] 換頁後捲動到第一張卡片，快速切換不產生過期捲動。
- [x] `/reading/[id]` 使用固定模擬 nanoid 取得文章，無效 ID 顯示 404。
- [x] 中日對照、僅顯示日文、單句學習模式互斥且畫面結果正確。
- [x] 單句學習正確配對逐句日文與繁中翻譯，並顯示播放及收藏 UI。
- [x] Ruby 開關與播放速度 UI 可操作；文章與單句可使用既有 TTS 播放，播放速度尚未套用。
- [x] 文章使用結構化 paragraphs、sentences、segments，不使用 `v-html`。
- [x] 點擊單字可使用 FlyonUI 官方 Popover 查看上下文解釋與例句。
- [x] 點擊文法片段可定位並展開對應的文法 Collapse。
- [x] 文法 Collapse 顯示短解釋、本文例句、額外例句與完整文法入口狀態。
- [x] 顯示最多 5 篇同程度推薦文章並可正常導航。
- [x] Header 電腦版及手機版均可前往 `/reading`。
- [x] 桌面與手機版無非預期水平溢出。
- [x] 不新增 npm 套件、不建立 API 或資料庫。
- [x] 相關檔案通過 ESLint；完成視覺原型後更新本文件狀態與驗收結果。

## Notes

- Lexeme、Grammar Point 與收藏 target 的分層是未來資料方向，不代表本 Feature 定稿資料庫 Schema。
- 未來 AI 候選文章中的新詞條或文法可先建立輕量待審核項目，不要求完整單字／文法教材先完成；任何教材仍需管理員確認後才能發布。
- 2026-07-19 完成第一版前端視覺原型與自動檢查；2026-07-21 使用者確認視覺，驗收通過並勾選 Acceptance Criteria。
