# Task 002: 單字教材列表視覺原型

## 狀態

`Completed`

## 目標

依已確認的桌面與手機參考畫面，使用專案既有 Nuxt、Vue、Tailwind CSS 與
FlyonUI 建立 `/vocabulary` 第一版單字教材列表。

本 Task 用前端 mock data 驗證排版、篩選、Accordion、活用表與響應式體驗，
不串接資料庫、正式 TTS 或會員收藏。

## Scope

- 建立 `/vocabulary`。
- 建立 `app/types/vocabulary.ts`。
- 建立 `app/data/materials/vocabulary.ts`，包含 30 筆不同 JLPT 等級與詞性的單字，每筆提供 3 句例句。
- 使用 FlyonUI Join 單選按鈕切換 `All`、`N5`～`N1`，同步 `level` 與 `page` query。
- Hero 沿用 `/test-index` 的排版與背景，標題改為「單字學習」，右欄保留空白。
- 使用 Switch 控制 Ruby 假名顯示。
- 使用 Vue state `activeVocabularyId` 控制一次展開一筆單字。
- 展開項目以不同背景色區隔；單字列保留音訊按鈕，展開狀態使用停止 icon。
- 展開後以紅色 outline Badge 顯示詞性短標籤；選擇 `All` 時以藍色 outline Badge 顯示 JLPT 等級。
- 基本與進階活用以 Collapse＋Table 呈現。
- 顯示例句、繁中翻譯、目標詞 highlight、音訊與收藏 UI。
- 使用 Pagination、每頁顯示 20 筆，並完成手機版排版。
- 例句保存可供 TTS 使用的純文字日文與結構化 highlight segments，畫面不使用 `v-html`。
- 單字列表沿用 FlyonUI Accordion 結構，以淺灰底線分隔收合項目，展開項目顯示完整外框；停用 FlyonUI 自動 JavaScript 初始化，由 Vue `activeVocabularyId` 單獨控制狀態。

## Out of Scope

- MongoDB、API 與正式 Schema。
- 真實 TTS 播放、R2 快取與 Audio Asset。
- 收藏持久化、登入及會員功能。
- 單字測驗。
- 管理後台。

## Acceptance Criteria

- [x] `/vocabulary?level=all&page=1` 可正常顯示。
- [x] 程度 Badge 單選且切換程度後 `page=1`。
- [x] 分頁保留目前程度 query。
- [x] Switch 可顯示或隱藏 Ruby 假名。
- [x] 展開後顯示紅色 outline 詞性 Badge；選擇 `All` 時顯示藍色 outline JLPT Badge。
- [x] 一次只展開一筆單字，且整個展開項目有不同底色。
- [x] 單字列保留音訊按鈕，展開狀態顯示停止 icon。
- [x] 動詞顯示完整基本與進階活用資料。
- [x] 例句以結構化 segments 顯示目標詞 highlight，不使用 `v-html`。
- [x] 手機版沒有整頁水平溢出。
- [x] 不載入 YouTube SDK，不新增 npm 套件。
- [x] 變更檔案通過 ESLint。

## 驗證結果

- `npx eslint <changed-files>`：通過。
- `npm run build`：通過；保留專案既有 Toast／ConfirmModal dynamic import 警告。
- 人工驗收：2026-07-19 完成桌面與手機版視覺、內容及互動驗收。
- Browser：桌面 `1440 × 900` 與手機 `390 × 844` 通過視覺檢查。
- Browser：手機 `scrollWidth === clientWidth`，無整頁水平溢出。
- Browser：N4 篩選後 URL 為 `/vocabulary?level=n4&page=1`。
- Browser：Switch 關閉後 `<rt>` 確認隱藏。

## 已知既有問題

- `/test-index` 與 `/vocabulary` 都會出現 Header Teleport、Toast、ConfirmModal
  相關 hydration mismatch；確認不是本 Task 新增頁面獨有，另開技術 Task 處理。

## Reference

- `context/features/vocabulary.spec.md`
- 使用者於 Task 開始前提供的單字列表桌面／手機參考畫面。
