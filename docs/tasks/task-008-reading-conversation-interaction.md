# Task 008: 閱讀／對話內文互動改版（前端顯示層）

## 狀態

`Completed`（2026-07-25 完成程式、規格同步及自動檢查；實機結果沿用各 Slice 已記錄的桌面與 390px 驗證。）

## 背景與目標

Task 005 的閱讀／對話 v1 使用舊三模式、`invisible` 翻譯及文法底線／捲頁尾互動。本 Task 依 `context/content-model.md` 重整學習控制、遮罩、重點標記、文法 Popover、播放速度與對話角色扮演；只處理前端顯示層，不建立資料庫、resolver 或正式音檔儲存流程。

## 完成範圍

### 共用互動

- 閱讀與對話共用 `StudyControls.vue`、`StudyMobileControls.vue`、`RevealableContent.vue` 與 `VisibilityToggle.vue`。
- 模式使用 Tab 語意並沿用 16px 紅色分段按鈕外觀；桌面控制同排，手機控制移到教材內容前。
- 「顯示重點單字/文法」、Ruby 假名與播放速度為跨模式常駐設定，彼此正交。
- 重點標記關閉時內文為乾淨純文字；開啟時只顯示符合程度的重點單字淡粉底及文法 primary 淡底。
- 單字與文法皆可在原地開啟 Popover；FlyonUI 動態節點透過 `useFlyonuiReinit()` 重新初始化。
- 所有遮罩使用模糊層保留版位，支援滑鼠、觸控及鍵盤掀開，不使用 `hidden`、`invisible` 或條件渲染抽掉內容。
- 播放速度提供 0.75x、1x、1.25x、1.5x，套用至逐句、序列及角色扮演播放；播放中改速立即生效。
- 切換模式時停止正在進行的序列或練習播放。

### 閱讀教材

- 「整篇閱讀／單句學習」兩種模式。
- 整篇模式提供隱藏整篇與自動播放文章，遮罩與播放互不連動。
- 單句模式提供全域隱藏日文／中文；每句被遮內容可個別掀開，句卡不放重複 eye。
- 手機教材控制位於內文上方 `neutral-50` 區塊。

### 對話教材

- 「閱讀模式／角色扮演」兩種模式。
- 閱讀模式提供獨立隱藏日文／中文與自動播放對話。
- 角色扮演可選擇扮演者；自由播放跳過所選角色，該角色日文維持模糊並可掀開。
- 自動播放顯示目前說話氣泡、`NOW SPEAK` 標籤並捲動到正在播放的句子。
- 手機教材控制位於粉色對話容器內、第一句上方。

### 角色扮演逐句練習

- 播放鈕使用「開始練習／結束練習」，閱讀模式維持「自動播放對話」。
- 別人台詞自動播放並在播畢後前進；輪到使用者時停止播放並顯示「看中文說日文」。
- 使用者可依序「看答案／繼續對話」；最後一句改為「結束練習」。
- 練習中顯示 sticky 進度列，焦點句不被 fixed header 或進度列遮住。
- 切換模式、角色或離開頁面時立即停止練習。
- 沿用 `speakerId`、`text`、`translation`，未新增教材資料欄位。
- `useTtsAudio.playLine()` 以播放完成 promise 驅動流程，被其他播放中斷時不錯誤前進。

## 資料與顯示調整

- 移除 `MaterialVocabularyNote.featured` 與主打／一般兩層視覺。
- 文法欄位改為 `pattern`、`shortMeaning`、`explanation`，Popover 與頁尾文法列表共用。
- 文法由底線／捲頁尾改為 primary 淡底／原地 Popover；頁尾仍保留文法列表供整篇瀏覽。
- `StudyMode` 只保留實際使用的 `full`、`sentence`、`roleplay`。
- 標題與簡介使用符合程度的純日文；分類最多 2 個。
- 閱讀內容為 3～4 段、每段 2～3 句、約 280～500 個純日文字元；對話為 10～14 行。

## Out of Scope

- runtime tokenizer／拖選任意字段查字。
- 後端 resolver、`vocabularyItemId` 正式配對。
- 正式 TTS provider、音檔快取及 R2。
- 批次補教材資料與回頭清算舊資料量。
- 登入、收藏持久化、錄音及發音比對。

## Acceptance Criteria

- [x] 閱讀內頁以「整篇閱讀／單句學習」Tabs 切換，模式設定切換不推動下方教材。
- [x] 重點標記關閉時內文為純文字；開啟時單字與文法使用不同淡底且可開啟各自 Popover。
- [x] 整篇模式的自動播放與隱藏整篇彼此獨立，遮罩可直接掀開。
- [x] 單句模式可全域隱藏日文／中文，並逐句掀開；句卡無多餘 eye。
- [x] 對話閱讀模式可獨立隱藏日文／中文，並保留自動播放。
- [x] 對話角色扮演可選擇角色、遮蔽該角色日文，且自由序列播放跳過所選角色。
- [x] 角色扮演逐句練習依序處理別人台詞、使用者回合、看答案、繼續與結束狀態。
- [x] 所有遮蔽保留版位與可點性，不以 `invisible`、`hidden` 或 `v-if` 移除內容。
- [x] 重點標記、假名、播放速度及遮罩彼此正交。
- [x] 播放速度套用至所有播放路徑，播放中改速立即生效。
- [x] 桌面與 390px 手機控制可操作，無非預期水平溢出。
- [x] 未新增 npm 套件或相近品牌色。
- [x] 變更檔案通過 ESLint、`git diff --check` 與完整 build。

## 驗證紀錄

- Slice 1 已實機驗證重點單字／文法、Popover、furigana 與 FlyonUI 動態重新初始化。
- Slice 2～5 的桌面／手機控制列視覺由使用者確認；正式互動、遮罩與播放狀態已完成程式檢查。
- 角色扮演完整流程：開始練習 → 別人台詞自動播畢前進 → 使用者台詞停下 → 看答案 → 繼續 → 最後一句結束練習。
- Slice 7 已於桌面 1280px 與手機 390px 實測，`scrollWidth === clientWidth`，無水平溢出。
- 相關變更通過 `npx eslint`、`git diff --check` 與 `npm run build`。
- 本次文件收尾時測試瀏覽器連線不可用，未重跑完整視覺回歸；部署後仍建議依上述 AC 做一次 smoke test。

## 實作注意事項

- FlyonUI 只會在載入或換頁時自動初始化。任何切換狀態後才新增的 Popover／tooltip，必須在 DOM 更新後呼叫 `useFlyonuiReinit()`，否則 Popover 不會開啟且未定位內容可能撐出手機水平溢出。
- `useTtsAudio` 以單一 `<audio>` 管理播放；新播放、停止、模式切換及逐句練習均透過 sequence version 避免舊 promise 錯誤前進。

## 工作區與後續

- 本 Task 尚未 commit，依規範等待使用者確認。
- `server/api/tts.post.ts` 為使用者工作區既有的 TTS 啟用變更；正式部署保護另開 Task 處理。
- 批次教材資料、後端 resolver／AI 待審核流程、正式 TTS＋R2 各自另開後續 Task。

## Reference

- `context/content-model.md`
- `context/features/reading.spec.md`
- `context/features/conversation.spec.md`
- `app/components/materials/StudyControls.vue`
- `app/components/materials/StudyMobileControls.vue`
- `app/components/materials/RevealableContent.vue`
- `app/components/materials/AnnotatedText.vue`
- `app/components/materials/VocabularyPopover.vue`
- `app/components/materials/GrammarPopover.vue`
- `app/pages/reading/[id].vue`
- `app/pages/conversation/[id].vue`
- `app/composables/useTtsAudio.ts`
- `app/types/material.ts`
