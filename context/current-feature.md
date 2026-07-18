# Current Feature

## Feature Name

單字教材前台探索

## Branch

尚未確認；開始實作前檢查目前 Git branch，必要時由開發者建立 Feature branch。

## Status

`Completed`

## Done

- 完成 Task 001：移除全站背景播放器依賴，Song 改為 route-local player；legacy Song Quiz 暫停維護，等待新版測驗全面重寫。
- 建立新版首頁 `/test-index`。
- 確認產品服務初學者至 JLPT N1。
- 確認六大教材：單字、文章、對話、歌曲、文法、測驗。
- 確認教材前台開發順序。
- 確認單字詳細內容採同頁 Accordion，由 `activeVocabularyId` 控制，不使用 Drawer。
- 確認程度使用單選 Badge，並以 `level`、`page` route query 保存狀態。
- 完成並驗收 Task 002：依確認的桌面／手機方向建立單字列表視覺原型、30 筆 mock data、每字 3 句可供 TTS 使用的結構化例句、型別與響應式互動。

## Todo

- 建立 Footer 手機版精簡 Task，縮短全站手機版 Footer 高度。
- Footer 完成後建立單字教材即時 TTS 播放 Task。

## Notes

- 現階段不要先依照 `docs/schema.md` 建資料庫。
- 單字頁的實際需求會成為未來 Vocabulary 資料模型的主要依據。
- TTS 可先沿用既有 API 做 UI 驗證，正式快取與儲存另開技術 Feature。
- 單字教材只有列表 route，詳細資訊在同頁開啟，不建立單字詳情頁。
- Header／Toast／ConfirmModal 有專案既有 hydration mismatch，與單字頁分開處理。
