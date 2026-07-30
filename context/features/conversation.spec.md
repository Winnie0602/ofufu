# Conversation Feature Spec

## 文件資訊

| 項目 | 內容 |
| --- | --- |
| 狀態 | Completed |
| Feature | 對話教材前台視覺原型 |
| Route | `/conversation`、`/conversation/[id]` |
| 資料來源 | 前端 TypeScript mock data |

## Overview

建立 Ofufu 第一版對話教材列表與情境對話內頁，以 mock data 驗證角色、對話泡泡、逐句翻譯、單句操作、重點單字、常見用法與文法及推薦教材的排版。

本 Feature 與閱讀教材共用教材列表、卡片、Hero、學習顯示控制及部分註解型別，但不強迫閱讀文章與角色對話使用相同的內容結構。

## Routes and User Flow

1. 使用者從 Header 進入 `/conversation`。
2. 使用 JLPT 程度篩選及分頁瀏覽情境對話。
3. 點擊教材卡片進入 `/conversation/[id]`；`id` 使用穩定且不含標題語意的 nanoid 形式。
4. 選擇閱讀模式或角色扮演模式，並依需求切換重點標記、Ruby 假名與內容遮罩。
5. 依角色閱讀對話、查看逐句翻譯，使用每句的播放及收藏 UI。
6. 查看本文重點單字、常見用法與文法及五篇同程度推薦對話。

## Requirements

### Conversation List

- `/conversation` 使用與閱讀頁相同的共用教材 Hero，標題為「對話學習」。
- 列表行為、query 驗證、每頁 20 篇、桌面一列 5 張、手機橫向 compact 卡片、預設封面及換頁捲動均沿用 `reading.spec.md` 的共用規則。
- Header 電腦版與手機版的「對話學習」均連至 `/conversation`。
- 對話可同時包含多個分類 code，例如 `restaurant`、`reservation`；第一版只顯示多個分類 Badge，不提供分類篩選。
- 對話標題描述具體任務，例如「電話預約座位」「取消餐廳訂位」「詢問候位時間」；「餐廳」等大類由分類 Badge 表達，不要求重複寫入標題。
- 封面可由管理員提供；`coverImage` 為 `null` 時顯示黑底白字標題的預設封面。

### Conversation Detail Structure

對話內頁順序為：

1. 標題、JLPT、分類與整篇對話收藏 UI。
2. 場景圖片或黑底白字預設封面。
3. 場景簡介與角色列表。
4. 學習模式、Ruby 開關、序列／逐句播放與播放速度控制。
5. 角色對話內容。
6. 重點單字。
7. 常見用法與文法。
8. 「更多 NX 對話」五篇同程度推薦對話。

- 重點單字與常見用法及文法不放在 Tabs，兩個區塊依序完整顯示。
- 找不到 `[id]` 對應 mock data 時顯示 Nuxt 404。

### Participants and Avatars

- 每篇對話包含 2～3 名角色，角色與對話行分離。
- 角色至少保存 `id`、`name`、`role` 與 `avatarKey`；角色 ID 使用固定模擬 nanoid。
- 對話行只保存 `speakerId`，不重複保存名字、身份及圖片路徑。
- 角色名稱第一版限制為 `ふふ`、`シロ`、`クロ`；兩人對話優先使用 `ふふ` 與 `シロ`，`クロ` 保留給三人對話。
- `avatarKey` 由前端集中 mapping 至 `public/images/characters/` 的角色圖片；mock data 不直接散落 `/images/...` 路徑。
- 專案圖片改名時只修改 mapping；未來若允許管理員上傳自訂頭像，改以媒體 `assetId` 對應外部儲存，不把專案檔案路徑當成正式資料庫資產。

### Chat Presentation

- 對話使用 FlyonUI Chat Bubble 結構：`chat`、`chat-sender`、`chat-receiver`、`chat-avatar`、`chat-header`、`chat-bubble` 與 `chat-footer`。
- 角色使用一致但可辨識的左右排列；2～3 人情境仍需清楚辨認說話者，不只依賴顏色。
- 每句對話至少保存固定 nanoid、`speakerId`、完整純文字 `japanese`、安全的結構化 segments 及繁中翻譯。
- 每句日文下方顯示該句繁中翻譯；閱讀模式可獨立遮蔽日文或中文，角色扮演模式遮蔽所選角色的日文，皆保留原本對話框版面。
- 每句旁邊提供共用 `AudioButton` 與 `FavoriteButton`；播放使用既有 `/api/tts`，收藏不持久化。
- 第一則對話上方提供「自動播放對話」，依對話行順序逐句播放；再次點擊可停止序列。
- 對話使用與閱讀共用的 Ruby／單字 segment 基礎型別，避免日後無法安全切換假名或開啟單字 Popover；不使用 `rubyHtml` 或 `v-html` 作為正式顯示策略。
- 對話泡泡中的文法使用 primary 淡底標示，點擊後在原地開啟共用 Grammar Popover。

### Study Display Controls

- 沿用閱讀頁的共用控制元件，以 16px 紅色分段 Tabs 呈現「閱讀模式／角色扮演」。
- 「顯示重點單字/文法」、Ruby 假名與播放速度為跨模式常駐設定，彼此獨立。
- 重點標記關閉時內文為乾淨純文字；開啟時單字以淡粉底、文法以 primary 淡底呈現，皆可開啟 Popover。
- 閱讀模式提供獨立「隱藏日文／隱藏中文」與自動播放對話。
- 角色扮演模式可選擇扮演角色；自由播放跳過所選角色，逐句練習則依序播放別人台詞，輪到使用者時停止並引導看答案／繼續。
- 所有遮蔽內容可直接點擊掀開，氣泡不放重複的 eye；遮罩保留原本版位。
- 播放速度選項為 `0.75`、`1`、`1.25`、`1.5`，套用至逐句、序列及角色扮演播放；播放中改速立即生效。
- 桌面將 Tabs、模式設定、播放速度與播放操作排成同列；手機控制放在粉色對話容器內、第一句上方。
- 本 Feature 使用既有 `/api/tts` 驗證播放體驗；不建立角色 voice、音檔快取或正式 Audio Asset 流程。

### Vocabulary Notes

- 對話單字註解與閱讀文章採相同的輕量 Lexeme 方向，可保存上下文意思與 2～3 句簡短例句，不要求完整單字教材已存在。
- 對話中的可點擊單字使用與閱讀頁相同的 FlyonUI 官方 Popover 結構。
- 下方「重點單字」使用白底紅框的 FlyonUI Badge 水平排列，超出容器時自動換行；點擊後直接在原地開啟共用 Popover，不捲動至上方對話位置。
- Popover 顯示原形、讀音、繁中意思、例句、播放及收藏 UI。
- 同一 Lexeme 未來從單字、閱讀或對話收藏時以 `lexemeId` 去重；本 Feature 不建立正式收藏 Schema。

### Grammar Notes

- 下方「常見用法與文法」沿用閱讀頁文法區及單字頁活用區的 FlyonUI Collapse 視覺方向。
- 每個文法顯示句型、繁中短解釋、對話中的本文例句、額外例句及「查看完整文法」入口狀態。
- 文法資料可使用 nullable `grammarPointId`；完整文法頁尚未建立時不導向不存在的 route。
- 不在對話資料重複完整文法教材的接續規則、大量例句、比較及練習內容。

### Recommendations

- 文法區下方顯示 5 篇與目前對話相同 JLPT 程度的推薦對話。
- 推薦卡片使用共用教材卡片並前往 `/conversation/[id]`。
- 推薦不足 5 篇時只顯示可用資料，且排除目前對話。

### Responsive and Visual Conventions

- 延續首頁、單字及閱讀頁的品牌視覺，不新增相近顏色。
- 優先使用 FlyonUI Card、Badge、Button、Join、Switch、Select、Chat Bubble、Popover、Collapse 及既有共用元件。
- 新畫面最高字重使用 `font-bold`。
- 手機版需保持對話泡泡、頭像、Ruby、翻譯、播放及收藏按鈕可讀且易於點擊，不得產生整頁水平溢出。
- 不使用 Diff、Tooltip 或無實際需求的 Tabs。

## Mock Data and Types

- 對話專屬型別放在 `app/types/conversation.ts`。
- 對話 mock data 放在 `app/data/materials/conversation.ts`。
- 共用教材摘要、顯示模式、segments、Lexeme／Grammar reference 優先放在共用型別，不在閱讀與對話各複製一份。
- Mock data 使用 JSON-compatible TypeScript objects，不放在 Vue 元件內。
- Mock data 數量足以驗證 20 筆分頁、不同 JLPT、多分類、2～3 人角色、推薦內容、單字 Popover 與多個文法 Collapse。
- 頭像先使用前端集中 mapping 與專案本地素材；未確認可用素材前不得任意加入不明授權圖片。

## Out of Scope

> 本節記錄的是**本 spec 撰寫時（UI 原型階段）**的範圍，不是目前架構的描述。
> 其中的 MongoDB、教材 API 與角色 voice 已在 Task 011 完成，現況見
> `docs/tasks/task-011-material-api-and-seed.md`。

- ~~MongoDB Schema、正式 API、資料 migration~~（已於 Task 011 完成，migration 除外）。
- AI 產生、管理員審核與發布後台。
- 正式 Lexeme／Grammar Point registry。
- 正式 TTS provider、角色 voice、音檔快取及 R2。
- 登入、收藏持久化及個人專區。
- 完整文法頁。
- 分類篩選。

## Acceptance Criteria

- [x] `/conversation` 可依程度與頁碼顯示正確 mock data，並還原有效 query。
- [x] 列表共用閱讀頁的教材卡片；桌面一列 5 張，手機為同元件橫向 compact 排版。
- [x] 無封面資料時顯示黑底白字預設封面。
- [x] 換頁後捲動到第一張卡片，Header 電腦版及手機版均可前往 `/conversation`。
- [x] `/conversation/[id]` 使用固定模擬 nanoid 取得資料，無效 ID 顯示 404。
- [x] 每篇顯示 2～3 名角色，對話行以 `speakerId` 正確取得名字、角色與 `avatarKey`。
- [x] 使用 FlyonUI Chat Bubble 清楚呈現角色、逐句日文、翻譯、播放及收藏 UI。
- [x] 閱讀、角色扮演模式及 Ruby／重點標記開關結果正確，遮罩仍保留對話框、播放及收藏操作。
- [x] 角色扮演逐句練習可依序播放別人台詞，輪到使用者時停下並提供看答案／繼續操作。
- [x] 播放速度套用至逐句、序列與角色扮演播放，播放中改速立即生效。
- [x] 對話文字使用安全結構化 segments，不使用 `v-html`。
- [x] 點擊內文單字或下方重點單字 Badge，皆可在原地開啟共用 FlyonUI Popover。
- [x] 重點單字 Badge 可自動換行，且與常見用法與文法不使用 Tabs、依序顯示。
- [x] 文法 Collapse 顯示短解釋、本文例句、額外例句與完整文法入口狀態。
- [x] 顯示最多 5 篇同程度推薦對話並可正常導航。
- [x] 桌面與手機版無非預期水平溢出。
- [x] 不新增 npm 套件、不建立 API 或資料庫。
- [x] 相關檔案通過 ESLint；完成視覺原型後更新本文件狀態與驗收結果。

## Notes

- 對話分類可持續擴充；大類放在 categories，標題描述具體溝通任務，避免同類對話標題難以區分。
- AI 候選對話仍必須經管理員確認角色、翻譯、單字與文法後才能發布。
- 2026-07-19 完成第一版前端視覺原型與自動檢查；2026-07-21 使用者確認視覺，驗收通過並勾選 Acceptance Criteria。
