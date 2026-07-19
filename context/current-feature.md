# Current Feature

## Feature Name

閱讀與對話教材視覺原型

## Branch

`dev`

## Status

`In Review`

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
- 完成 Task 005 第一版實作：閱讀／對話四個 route、各 30 筆 mock data、共用教材卡片與列表、學習模式、官方 Popover、文法 Collapse、角色 Chat Bubble、固定角色圖片、推薦教材及 Header 導航；閱讀支援文章／單句 TTS，對話支援序列／逐句 TTS，等待視覺確認。

## Todo

- 確認 Task 005 桌面與手機版視覺，依回饋微調並完成驗收。
- Task 005 完成後另行規劃正式 TTS、R2 快取與 Audio Asset。

## Notes

- 現階段不要先依照 `docs/schema.md` 建資料庫。
- 完整單字教材與文章／對話中的上下文單字註解不強制共用完整欄位；未來可用輕量 Lexeme 統一詞條身分與收藏去重。
- 文章／對話文法註解只保存本文需要的短解釋與例句，未來以 nullable `grammarPointId` 連到完整文法教材。
- Task 005 已使用既有 `/api/tts` 驗證閱讀文章／單句及對話序列／逐句播放；播放速度尚未套用，正式快取與儲存另開技術 Feature。
- 單字教材只有列表 route，詳細資訊在同頁開啟，不建立單字詳情頁。
- Header／Toast／ConfirmModal 有專案既有 hydration mismatch，與單字頁分開處理。
