# Task 005: 閱讀與對話教材視覺原型

## 狀態

`In Review`

## 目標

依已確認的功能與資料方向，使用 Nuxt 4、Vue 3、TypeScript、Tailwind CSS 4 與 FlyonUI 建立閱讀及對話教材的列表／內頁視覺原型。

本 Task 以 TypeScript mock data 驗證四個頁面的資訊層級、共用教材卡片、響應式版面、文章註解與角色對話體驗；播放使用既有 `/api/tts` 驗證，不新增正式資料庫、收藏或管理後台。

## Scope

- 建立 `/reading`、`/reading/[id]`、`/conversation`、`/conversation/[id]`。
- 建立共用 `MaterialSummary`、六大教材 type mapping、顯示模式、結構化文字 segments 及必要的 Lexeme／Grammar reference 型別。
- 建立 `app/types/reading.ts`、`app/types/conversation.ts`。
- 建立 `app/data/materials/reading.ts`、`app/data/materials/conversation.ts`，所有 ID 使用固定模擬 nanoid。
- 將首頁最新教材卡片抽成網站共用教材卡片；桌面支援五欄，手機由同一元件呈現橫向 compact 排版。
- 閱讀與對話列表沿用共用 Hero、JLPT 程度篩選及 Pagination，每頁 20 筆，程度與頁碼同步 query，換頁後捲動到第一張卡片。
- 封面為 `null` 時顯示黑底白字標題的預設封面。
- Header 電腦版與手機版連上閱讀與對話列表。
- 建立中日對照、僅顯示日文及依教材類型提供的單句學習／內容隱藏模式、Ruby Switch 與播放速度 Select；閱讀支援自動播放文章及單句播放，對話支援自動播放及逐句播放。
- 閱讀內頁顯示結構化文章、統一繁中翻譯、逐句日中配對與播放／收藏 UI、FlyonUI 官方 click Popover 單字註解、文法定位與 Collapse、五篇推薦文章。
- 對話內頁使用 FlyonUI Chat Bubble 顯示 2～3 名角色、集中 avatar mapping、固定角色圖片、逐句日文／翻譯、播放／收藏 UI、重點單字、文法 Collapse 及五篇推薦對話。
- 對話重點單字使用可換行的白底紅框 Badge，點擊原地開啟共用 Popover；常見用法與文法接續顯示，不使用 Tabs。
- 延續現有品牌色與共用元件，不新增 npm 套件或相近顏色。
- 完成後更新兩份 Feature Spec、Acceptance Criteria、驗證結果及 `context/current-feature.md`。

## Data Decisions

- 文章、對話、完整單字教材可以各自建立，不以完整單字教材存在作為文章發布前端資料的必要條件。
- 輕量 Lexeme 概念只負責辨認同一字典詞條；完整單字教材與文章／對話上下文註解各自保存所需內容，未來收藏可使用 `lexemeId` 去重。
- 文章／對話文法註解只保存短解釋、本文例句與一個額外例句；完整文法內容留給未來文法頁，並以 nullable `grammarPointId` 保留連結能力。
- 第一版角色名稱限制為 `ふふ`、`シロ`、`クロ`，圖片集中於 `public/images/characters/` 並由 `avatarKey` mapping；兩人對話優先使用 `ふふ` 與 `シロ`。
- 上述方向是前端 mock data 與未來 API 討論依據，不在本 Task 定稿 MongoDB Schema。

## FlyonUI Components

- Card：共用教材卡片與推薦教材。
- Badge：教材種類、JLPT 及多分類。
- Join／Button：程度篩選與學習模式。
- Pagination：列表分頁。
- Switch：Ruby 假名顯示。
- Select：播放速度 UI。
- Popover：依 v2.4.1 官方 `tooltip` click trigger 結構顯示單字資訊。
- Collapse：文章與對話下方文法補充，視覺沿用單字頁活用區。
- Chat Bubble／Avatar：角色對話。
- Loading／Swap：播放按鈕既有視覺狀態。

Diff、Tooltip hover 提示、Tabs 與額外 Collapse 在本 Task 沒有必要用途，不納入頁面。

## Out of Scope

- MongoDB、正式 API、Schema 與 migration。
- AI 產生、管理員審核及發布後台。
- 正式 Lexeme、Grammar Point 與分類管理。
- 真實 TTS、角色 voice、播放速度套用、R2 與 Audio Asset。
- 登入、收藏持久化、個人專區及學習紀錄。
- 完整文法頁。
- 分類篩選。

## Acceptance Criteria

- [ ] 四個 route 均可使用 mock data 正常顯示，無效詳情 ID 顯示 404。
- [ ] 閱讀與對話列表共用卡片、Hero、篩選及分頁，不重複建立同功能元件。
- [ ] 列表每頁 20 筆，桌面五欄，手機為橫向 compact 卡片，換頁後正確捲動。
- [ ] 程度與頁碼 query 可還原，切換程度後回到第一頁。
- [ ] Header 電腦版與手機版可前往兩個列表頁。
- [ ] 閱讀內頁可切換顯示模式與 Ruby，查看單字 Popover、文法 Collapse 及推薦文章。
- [ ] 對話內頁可切換顯示模式與 Ruby，清楚顯示 2～3 名角色、逐句翻譯、重點單字、文法及推薦對話。
- [ ] 角色頭像由固定 `avatarKey` 正確載入；兩人對話優先顯示 `ふふ` 與 `シロ`。
- [ ] 單字 Popover 使用 FlyonUI v2.4.1 官方 click trigger 結構，不自行實作浮動定位。
- [ ] 文法區視覺沿用單字頁 Collapse，顯示短解釋、本文例句、額外例句及完整文法入口狀態。
- [ ] Mock data 與 Vue 元件分離，型別無不必要重複，所有教材／句子／註解／角色 ID 均為固定模擬 nanoid。
- [ ] 不使用 `v-html` 顯示文章或對話 segments。
- [ ] 桌面及手機版無非預期水平溢出。
- [ ] 未新增 npm 套件或新的相近顏色。
- [ ] 執行 `npx eslint <changed-files>` 並通過。
- [ ] 執行 `git diff --check` 並通過。

## Reference

- `context/features/reading.spec.md`
- `context/features/conversation.spec.md`
- `context/features/vocabulary.spec.md`
- [FlyonUI Popover v2.4.1](https://flyonui.com/docs/overlays/popover/)

## 驗證結果

- `npx eslint <Task 005 changed files>`：通過。
- `git diff --check`：通過。
- `npm run build`：通過；保留專案既有 Toast／ConfirmModal 靜態與動態匯入警告。
- Browser 桌面 `1440 × 900`：閱讀列表為五欄，每頁顯示 20 張卡片。
- Browser 手機 `390 × 844`：列表使用同一元件的橫向 compact 卡片，單卡高度約 130px。
- Browser：程度切換後 URL 為 `/reading?level=n3&page=1`，畫面只顯示 N3 mock data。
- Browser：閱讀內頁可顯示結構化 Ruby、單字 Popover、文法 Collapse、翻譯與推薦文章。
- Browser：對話內頁顯示 6 句 Chat Bubble、2 名角色、逐句翻譯、單字、文法與推薦對話。
- Browser：`ふふ` 與 `シロ` 的場景角色及逐句頭像皆從固定圖片路徑載入成功；`クロ` 圖片與 mapping 已備妥供三人對話使用。
- Browser：下方重點單字以白底紅框 Badge 呈現；點擊後 Popover 原地開啟，等待 500ms 前後頁面 `scrollY` 不變。
- Browser：對話文法標題顯示「常見用法與文法」，推薦標題依程度顯示如「更多 N4 對話」。
- Browser：閱讀列表及對話內頁手機版 `scrollWidth === clientWidth`，無整頁水平溢出。
- 等待使用者確認第一版視覺後，再將 Task 與兩份 Feature Spec 標記為 `Completed` 並勾選 Acceptance Criteria。
