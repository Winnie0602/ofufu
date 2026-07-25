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
| 007 | Ruby 括號記法 ＋ 內文標註 stand-off 模型 | ✅ Completed |
| 008 | 閱讀／對話內文互動改版（顯示層） | ✅ Completed |

> 批次補教材資料與回頭清算舊 X 屬並行雜項（計畫見 task-007「完成後續接」段），與 task-008 各走各的、不互相阻塞。

## 現在焦點

- Branch：`dev`（**Task 008 尚未 commit**，工作區另含既有變更）。
- 上一個完成：**Task 008**（閱讀／對話內文互動改版）。現行畫面功能、AC、驗證與實作注意事項見 `docs/tasks/task-008-reading-conversation-interaction.md`。
- 後續已記錄：**Task 009**（TTS 與教材音檔正式流程）目前為 Backlog，需求與 Task 008 播放現況見 `docs/tasks/task-009-tts-audio-assets.md`；尚未進入技術規劃或實作。
- 並行雜項：**批次補教材資料 ＋ 回頭清算舊 X**（見 task-007「完成後續接」段）；`docs/tasks/seed-data.md` 已交付使用者陸續貼資料。
- **Task 008 完成摘要（2026-07-25）**：閱讀使用整篇／單句 Tabs；對話使用閱讀／角色扮演 Tabs與逐句引導練習。重點單字／文法、Ruby、模糊掀開、逐句／序列播放及播放中即時改速皆已接回正式狀態。舊三模式、`featured` 兩層與文法底線／捲頁尾規格已移除。


## 下一步 Todo

- **批次補教材資料並回頭驗收各列表**（計畫見 task-007「完成後續接」段）：格式已於 007 定案；「給 ChatGPT 的資料產生規範」由 Claude 撰寫、交付使用者貼給 ChatGPT。功能 AC 只驗代表性案例、資料量另計（見 `AGENTS.md` 完成條件）。
- **Task 008 已完成**：完整範圍與驗收紀錄見 `docs/tasks/task-008-reading-conversation-interaction.md`。
- **Task 009 已建立為 Backlog**：記錄 Task 008 播放現況、正式教材音檔、安全與成本需求；待重新排入開發時再討論實作方案。
- 後端 resolver／AI 產生內容／待審核草稿、正式 TTS ＋ R2 快取：進入後端階段再各自開 Task。

## 已知債（有意識延後，非遺漏）

- **首頁 `app/components/Index/*`（Introduce、Test、各 List、Carousel…）為 showcase 頁**：寫死資料、用來展示其他頁面的使用方式，尚未完成，且**暫無 feature spec**。策略：等各教材頁穩定後再回頭補首頁內容與（如需要的）spec；目前只做必要的 bug 修復（如 collapse）與連結，不為它建完整規格。

## Notes（跨 Task、不在別處記錄的決策）

- 現階段不要先依 `docs/schema.md` 建資料庫或 API。
- 專案既有 hydration mismatch：Header／Toast／ConfirmModal，以及 FlyonUI accordion 自動初始化與 Vue 狀態競態（解法：在 Vue 自控的 accordion 上加 `--prevent-on-load-init`，見 `Index/Test.vue`、`VocabularyListItem.vue`）。
