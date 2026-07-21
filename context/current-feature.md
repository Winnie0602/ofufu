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
| 007 | Ruby 括號記法 ＋ 內文標註 stand-off 模型 | 📋 Planned |

> 批次補教材資料屬 007 之後的工作，計畫見 task-007 的「完成後續接」段；屆時再視需要開 task-008。

## 現在焦點

- Branch：`dev`
- 上一個完成：**Task 006**（2026-07-21 使用者確認 Popover 視覺定案，驗收通過）。
- 下一步：**Task 007**（詳見 `docs/tasks/task-007-ruby-notation-and-annotation-model.md`）。
- 零星進行中：首頁互動修正（`Index/Test.vue` collapse 競態、`Index/Introduce.vue` 卡片 NuxtLink）——見下方「已知債」。

## 下一步 Todo

- **Task 007**：Ruby 括號記法 parser ＋ 內文標註改 stand-off「notes anchor」；順帶修 `AnnotatedText.vue` 文法標記斷行置中。細節見 task-007 doc。
- **Task 007 完成後**：批次補教材資料並回頭驗收各列表（計畫見 task-007「完成後續接」段）；「給 ChatGPT 的資料產生規範」待 007 格式定案後由 Claude 撰寫、交付使用者貼給 ChatGPT。功能 AC 只驗代表性案例、資料量另計（見 `AGENTS.md` 完成條件）。
- **閱讀／對話頁互動改版（規劃中）**：
  - 閱讀：版面軸（整篇／單句）、查字模式、整篇聽力遮罩、單句逐句遮日文／遮中文。
  - 對話：顯示三段（對照／只看日文／只看中文）、查字模式、聽力遮罩、角色扮演（精簡版可一起做）。
  - 共用：單字覆蓋改 `featured` 旗標（主打亮、其餘可點不亮）；所有遮蔽一律用模糊遮罩＋掀開，不用 `hidden`。
  - 設計已定於 `context/content-model.md`，屆時視需要開 task。
- 後端 resolver／AI 產生內容／待審核草稿、正式 TTS ＋ R2 快取：進入後端階段再各自開 Task。

## 已知債（有意識延後，非遺漏）

- **首頁 `app/components/Index/*`（Introduce、Test、各 List、Carousel…）為 showcase 頁**：寫死資料、用來展示其他頁面的使用方式，尚未完成，且**暫無 feature spec**。策略：等各教材頁穩定後再回頭補首頁內容與（如需要的）spec；目前只做必要的 bug 修復（如 collapse）與連結，不為它建完整規格。

## Notes（跨 Task、不在別處記錄的決策）

- 現階段不要先依 `docs/schema.md` 建資料庫或 API。
- 專案既有 hydration mismatch：Header／Toast／ConfirmModal，以及 FlyonUI accordion 自動初始化與 Vue 狀態競態（解法：在 Vue 自控的 accordion 上加 `--prevent-on-load-init`，見 `Index/Test.vue`、`VocabularyListItem.vue`）。
