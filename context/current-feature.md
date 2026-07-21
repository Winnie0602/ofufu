# Current Feature

## Feature Name

教材單字身分與收藏去重重構（Task 006）

## Branch

`dev`

## Status

`Task 006 Completed`（2026-07-21 使用者確認 Popover 視覺定案）；下一步 `Task 007`

## Done

- 完成 Task 001：移除全站背景播放器依賴，Song 改為 route-local player；legacy Song Quiz 暫停維護，等待新版測驗全面重寫。
- 建立新版首頁 `/test-index`。
- 確認產品服務初學者至 JLPT N1。
- 確認六大教材：單字、文章、對話、歌曲、文法、測驗。
- 確認教材前台開發順序。
- 確認單字詳細內容採同頁 Accordion，由 `activeVocabularyId` 控制，不使用 Drawer。
- 確認程度使用單選 Badge，並以 `level`、`page` route query 保存狀態。
- 完成並驗收 Task 002：依確認的桌面／手機方向建立單字列表視覺原型、30 筆 mock data、每字 3 句可供 TTS 使用的結構化例句、型別與響應式互動。
- 完成並驗收 Task 003：手機與平板隱藏 Footer「學習內容」、平板採三欄、桌面保留四欄，並將主要內容置中。
- 完成 Task 004：串接既有 `/api/tts`，以 `useTtsAudio()` 統一單一音訊播放、loading、playing、停止、快速切換競態、錯誤復原及卸載清理；單字頁與既有 `BottomPanel` 共用相同邏輯。
- 完成閱讀與對話頁需求盤點，確認列表／內頁 route、共用卡片、手機 compact 排版、三種學習模式、多分類、單字 Popover、輕量 Lexeme／Grammar Point 參照方向、對話角色與文法 Collapse 呈現。
- 完成並驗收 Task 005：閱讀／對話四個 route、各 30 筆 mock data、共用教材卡片與列表、學習模式、官方 Popover、文法 Collapse、角色 Chat Bubble、固定角色圖片、推薦教材及 Header 導航；閱讀支援文章／單句 TTS，對話支援序列／逐句 TTS。2026-07-21 使用者確認第一版視覺，驗收通過。
- 完成教材內容資料模型方向盤點，撰寫 `context/content-model.md`：內文共用欄位、Ruby 輸入／顯示分離、單字辭書形自然鍵與收藏去重、AI 產生內容由 resolver 自動配對。
- 完成 Task 006 第一版實作（技術驗收通過）：單字註解改參照優先＋辭書形自然鍵、新增 `vocabularyIdentity` resolver、單字 id 改 nanoid；以「楽しめる→楽しむ」示範活用形去重。ESLint／build／git diff --check 皆通過。
- Task 006 Popover 視覺與使用者多輪即時調整（進行中，尚未定案）：由最初「單字表完整資料＋本文用法」兩層顯示，改為精簡顯示（表層形＋詞性 badge、表層形自己的讀音 `surfaceReading`、「解釋」「辭書形」（活用時才顯示）「例句」三個灰色 badge 小節、留白分隔不用分隔線）；配對只用於收藏去重，不在 Popover 攤開單字表資料。過程中發現並修正「活用形只顯示辭書形讀音」的錯誤，型別新增 `surfaceReading` 欄位。詳見 `docs/tasks/task-006-vocabulary-identity-refactor.md` 的「2026-07-21 追加」小節。
- 2026-07-21 使用者確認 Popover 視覺定案，Task 006 驗收通過並標記 `Completed`。文章內文法標記的呈現問題（整段被畫底線＋藍字、手機斷行後「きます」單獨置中、標記範圍過大）確認**歸屬 task-007 一併處理**，不列為 006 回歸；根因已釐清：`AnnotatedText.vue` 用 `<button>` 包整段，未覆蓋瀏覽器預設 `text-align: center`，且 mock data 把整句子塞進單一 segment／單一 `grammarNoteId`。

## Todo

- **Task 007（下一步，含本次設計決議）**：
  - Ruby 括號記法 `日本[にほん]には四[よっ]つ` ＋ parser，取代現行 `segments[].ruby` / `parts` 結構；砍掉純文字段用不到的 per-segment `id`。
  - 內文標註改 stand-off「notes anchor」模型：句子存純文字（含 ruby 括號），另有 `notes` 陣列，每則 note 以 **surface 子字串 ＋ occurrence（出現次數）** 定位，**不用數字 index**（易斷、改字即位移，已否決）。
  - 文法不連續範圍（`〜たり、〜たりする`）以「一則 note 帶多個 anchor」或「多則 note 共用同一 `grammarPointId`」表達，只框關鍵字、不再整段藍字。
  - task-006 的身分／去重成果不受影響：note 內容欄位（`dictionaryForm`／`reading`／`partOfSpeech`／`contextualMeaning`）不變，只改「定位方式」。
  - 順帶修 `AnnotatedText.vue` 文法標記的斷行置中問題。
  - 詳見 `docs/tasks/task-007-ruby-notation-and-annotation-model.md`。
- **Task 007 完成後：批次補資料並回頭驗收列表**：先前多個 Task 的驗收項目標為未完成（X），主因是**現階段 mock data 量不足以驗證列表呈現是否合乎標準**，非實作缺陷。待 007 格式定案後批次生成更多閱讀／對話／單字 mock data，再逐一回勾這些以資料量為前提的驗收項目。
- **資料生成規範（做完 007 才產出）**：資料由使用者貼需求給 ChatGPT（視為完全不懂本專案領域的 AI）生成。由 Claude 在 task-007 定案後，依括號記法＋notes anchor 格式撰寫一份「給 ChatGPT 的資料產生規範」交付使用者；本輪**不預先撰寫**該規範。
- 後端 resolver、AI 產生內容與待審核草稿單字，留待進入後端／AI 階段再開 Task。
- 另行規劃正式 TTS、R2 快取與 Audio Asset。

## Notes

- 現階段不要先依照 `docs/schema.md` 建資料庫。
- 文章／對話單字註解改為參照優先：只保存出現位置與上下文，完整資料由單字表以辭書形自然鍵 `(辭書形, 讀音, 詞性)` 查得，收藏依此身分去重（詳見 `context/content-model.md`）。
- 文章／對話文法註解只保存本文需要的短解釋與例句，未來以 nullable `grammarPointId` 連到完整文法教材。
- Task 005 已使用既有 `/api/tts` 驗證閱讀文章／單句及對話序列／逐句播放；播放速度尚未套用，正式快取與儲存另開技術 Feature。
- 單字教材只有列表 route，詳細資訊在同頁開啟，不建立單字詳情頁。
- Header／Toast／ConfirmModal 有專案既有 hydration mismatch，與單字頁分開處理。
