# Current Feature

> 本檔是「現在做到哪」的**薄游標**：任務總狀態 ＋ 當前焦點 ＋ 下一步。
> 各 Task 的完整實作、AC 與驗證結果一律在 `docs/tasks/task-00X-*.md`，**不在本檔重複**。

## 任務狀態總覽

| Task | 內容 | 狀態 |
| --- | --- | --- |
| 001 | 移除全站背景播放器，Song 改 route-local player | ✅ Completed |
| 002 | 單字列表視覺原型 | ✅ Completed |
| 003 | Footer 響應式排版 | ✅ Completed |
| 004 | 單字 TTS 播放（`useTtsAudio`） | ✅ Completed |
| 005 | 閱讀／對話前台原型 | ✅ Completed |
| 006 | 單字身分與收藏去重重構 | ✅ Completed |
| 007 | Ruby 括號記法 ＋ 註解與內文分離模型 | ✅ Completed |
| 008 | 閱讀／對話內文互動改版（顯示層） | ✅ Completed |
| 009 | TTS 與教材音檔正式流程 | 📋 Backlog |
| 010 | 元件資料夾重整 ＋ `useStudyState` | ✅ Completed |

## 現在焦點

- Branch：`dev`，工作區乾淨，Task 008／010 與三階段資料規範皆已 commit。
- 上一個完成：**Task 010**（元件依職責層重整為 `material/`、`content/`，並抽出 `useStudyState`）。
- 進行中：**批次補教材資料**。資料產生分三階段，各階段規範已寫好可直接貼給 ChatGPT：
  1. `docs/tasks/seed-content-draft.md` — 產內容
  2. `docs/tasks/seed-annotation-draft.md` — 審重點單字／文法
  3. `docs/tasks/seed-data.md` — 轉 TypeScript
- 目前資料量：對話 3 篇（`app/data/materials/conversation.ts`）。

## 下一步 Todo

- **用三階段規範批次補閱讀／對話教材，補完後回頭驗收各列表頁**。功能 AC 只驗代表性案例、資料量另計（見 `AGENTS.md` 完成條件）。
- **從兩個教材頁 template 抽出各自專屬區塊**，屆時才建立 `components/reading/`、`components/conversation/`（見 task-010「後續接」）。
- **Task 009** 待重新排入開發時再討論實作方案。
- 後端 resolver／AI 產生內容／待審核草稿、正式 TTS ＋ R2 快取：進入後端階段再各自開 Task。

## 已知債（有意識延後，非遺漏）

- **首頁 `app/components/home/*`（Introduce、Test、各 List、Carousel…）為 showcase 頁**：寫死資料、用來展示其他頁面的使用方式，尚未完成，且**暫無 feature spec**。策略：等各教材頁穩定後再回頭補首頁內容與（如需要的）spec；目前只做必要的 bug 修復與連結，不為它建完整規格。
- **`components/song/Player.vue` 是死檔**：Task 001 移除全站播放器後的殘留，零使用處，帶 3 個 eslint 與 1 個 typecheck error。

## Notes（跨 Task、不在別處記錄的決策）

- 現階段不要先依 `docs/schema.md` 建資料庫或 API。
- **元件資料夾依「職責層」而非「教材類型」分類**：`material/` 是教材外層（列表、卡片），`content/` 是教材內文（標註、遮罩、學習控制），兩者都被六種教材共用。閱讀／對話專屬元件等有東西可放時才建資料夾。新舊路徑對照與理由見 `docs/tasks/task-010-component-structure-refactor.md`。
- `components/global/` 在 Nuxt 是「全域註冊、無前綴」的保留語意，只放全站到處用的 UI，教材／歌曲專屬元件不得放入。
- 專案既有 hydration mismatch：Header／Toast／ConfirmModal，以及 FlyonUI accordion 自動初始化與 Vue 狀態競態（解法：在 Vue 自控的 accordion 上加 `--prevent-on-load-init`，見 `home/Test.vue`、`vocabulary/ListItem.vue`）。
