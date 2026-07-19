# Vocabulary Feature Spec

## 文件資訊

| 項目 | 內容 |
| --- | --- |
| 狀態 | Completed |
| Feature | 單字教材前台探索 |
| Route | `/vocabulary` |
| 資料來源 | 前端 TypeScript／JSON mock data |

## Overview

建立 Ofufu 第一版單字教材列表。使用者在同一頁依 JLPT 程度瀏覽單字、播放發音並開啟詳細介紹，不為每個單字建立獨立詳情頁。

本 Feature 先驗證資訊層級、展開互動及桌面／手機版體驗，再依實際畫面整理正式資料模型與 API。

## User Flow

1. 使用者進入單字教材頁。
2. 選擇 `N5`、`N4`、`N3`、`N2`、`N1` 或 `All`。
3. 瀏覽目前頁面的單字列表。
4. 視需要切換 Ruby 假名顯示。
5. 點擊發音按鈕播放單字音訊。
6. 開啟某個單字的詳細介紹。
7. 查看意思、活用與例句，再關閉詳細內容或開啟其他單字。
8. 使用列表下方分頁切換內容。

## Requirements

### Page Structure

- Hero 沿用 `/test-index` 的背景、最大寬度、雙欄比例、標題字級與文字間距，但作為教材內頁縮短為手機 280px、桌面 340px；左欄顯示「單字學習」及說明，右欄保留空白。文字區固定靠近 Hero 底部，使說明文字到「程度篩選」維持 48px。
- 程度篩選列使用淺灰色上下分隔線，不使用卡片陰影；篩選列與單字列表間距為 24px。
- 手機版將程度篩選與假名開關排在同一列；右側顯示「顯示假名」並放在開關上方，文字樣式與「程度篩選」一致，桌面版則維持水平排列。
- 單字教材使用列表頁呈現。
- 不建立單獨的單字詳情 route。
- 頁面提供 `N5`～`N1` 與 `All` 程度篩選，使用 FlyonUI `join` 與 `btn btn-soft join-item` 並限制為單選；選取項目為紅底白字且 hover 時保持不變，未選取項目為白底紅字、hover 時紅底白字；停用顏色 transition，避免點選時閃動。
- 程度與頁碼寫入 route query，例如 `/vocabulary?level=n5&page=1`。
- 切換程度時更新 `level` 並將 `page` 重設為 `1`。
- 重新整理或分享 URL 時，頁面應依 query 還原目前程度與頁碼；無效 query 使用安全的預設值。
- 列表下方提供分頁控制。
- 每頁顯示 20 筆單字。
- 篩選與分頁第一版只操作前端 mock data。

### Vocabulary List Item

每筆單字至少顯示：

- Ruby 格式日文；漢字上方顯示平假名。
- 全頁共用的「顯示／隱藏假名」控制，使用 FlyonUI Switch。
- 詞性 tag 使用 FlyonUI Badge 與短標籤：名詞 `名`、動詞 `動`、い形容詞 `い形`、な形容詞 `な形`、副詞 `副`、助詞 `助`；收合列表不顯示詞性，展開後放在意思與動詞分類下方，且不在 tag 顯示第一類、五段等分類。
- 當程度選擇為 `All` 時，顯示 JLPT 程度 tag。
- JLPT 與詞性 Badge 參考 `/test-index` Hero 單字卡的紅色與藍色 Badge。
- 單字發音使用 FlyonUI Button、Swap 與 Loading 表示可播放、播放中及載入中狀態。
- 列表單字發音按鈕放在收藏愛心左側，尺寸與愛心按鈕一致。
- 單字列維持音訊按鈕；單字展開時以停止 icon 呈現目前開啟狀態。
- 開啟詳細介紹的操作入口。

### Vocabulary Detail

詳細內容在列表頁內開啟，至少包含：

- 單字主要寫法與讀音。
- 繁體中文翻譯。
- 詞性。
- 動詞顯示動詞分類與活用形；資料第一版即保存完整的常用活用，不因 UI
  暫時隱藏而省略欄位。
- 每個單字提供 3～4 句日文例句及繁體中文翻譯。
- 每個例句保存不含 HTML 的完整日文 `japanese` 與結構化 `segments`；畫面依 segment 的 `highlighted` 狀態套用樣式，不使用 `v-html`，TTS 使用 `japanese`。
- 例句中的目標單字以不同顏色 highlight。
- 單字收藏愛心按鈕。
- 每個例句各自擁有收藏愛心按鈕。
- 單字或例句需要音訊時提供播放按鈕。

收藏按鈕在本 Feature 只有 UI 與互動狀態，不串接登入、資料庫或持久化。

### Detail Interaction

- 單字詳情採用 FlyonUI Accordion，不使用 Drawer。
- 外觀參考 FlyonUI Accordion 的 `With Avatar` 範例，但不顯示 Avatar。
- 展開後，整個目前單字區塊使用與未展開項目不同的背景色區隔，不只替內容區上色。
- Accordion 開關由 Vue state `activeVocabularyId` 控制，FlyonUI 負責主要視覺樣式；避免 FlyonUI JavaScript 與 Vue 同時成為狀態來源。
- 列表外框使用 FlyonUI `accordion accordion-shadow`、`accordion-item`、`accordion-toggle` 與 `accordion-content` 結構；項目加入 `--prevent-on-load-init`，停用 FlyonUI 自動 JavaScript 初始化並保留 Vue 控制。
- 列表標題列與內容 padding、加減圖示比照 `/test-index`「多種測驗題型」列表；單字項目不使用卡片陰影或展開陰影，只以淺灰底線分隔，並保留編號、標籤、播放與收藏操作。
- 第一版一次只展開一筆單字。
- 基本活用與進階活用各自使用 Collapse。
- 活用內容展開後以 Table 呈現，手機版仍需保持可讀，不得造成整頁非預期水平捲動。

### Verb Conjugations

動詞資料需標示第一類（五段）、第二類（一段）或第三類（不規則）動詞，並保存：

- 辭書形。
- ます形。
- ない形。
- て形。
- た形。
- 可能形。
- 被動形。
- 使役形。
- 使役被動形。
- 命令形。
- 意向形。
- ば條件形。
- たら條件形。

第一版 UI 分層呈現：

- **基本活用：** 辭書形、ます形、ない形、て形、た形。
- **進階活用：** 可能形、被動形及其餘常用活用；可以「顯示更多」收合，避免 N5、N4 使用者一次接收過多資訊。

「完整資料」是目前前端 mock data 與未來教材內容的需求，不代表現在定稿
MongoDB Schema。未來可由規則程式或 AI 產生活用候選值，但必須允許管理員審核與修正後才能發布。

### Audio

- Task 002 使用 mock 播放狀態完成 UI 驗證；Task 004 將沿用既有
  `POST /api/tts` 串接真實即時播放。
- 單字 TTS 使用 `VocabularyItem.word`；例句 TTS 使用不含 HTML 的完整
  `VocabularyExample.japanese`，不從 highlight segments 或 DOM 組合朗讀文字。
- 頁面使用單一 `HTMLAudioElement`，同一時間只播放一段；切換播放目標或離開
  頁面時需停止舊音訊並清理狀態。
- 需呈現可辨識的播放、載入與不可用狀態。
- 視覺元件使用 FlyonUI Button、Swap 與 Loading。
- 不得使用 YouTube 或全站播放器。
- R2 快取、批次產生、正式 Audio Asset 與公開環境防濫用流程另開技術 Feature。

### Responsive Design

- 支援桌面與手機版。
- 手機版不可產生非預期的水平捲動。
- Ruby、tag、播放與展開操作在小螢幕仍需清楚且容易點擊。

### Pagination

- 使用 FlyonUI 紅色系圓形 Pagination；頁碼按鈕與上／下一頁按鈕皆為圓形，上／下一頁只顯示左右箭頭 icon。目前頁使用紅底白字，其餘按鈕為透明底紅字，hover 時顯示淡紅底並維持紅字。
- 每頁固定顯示 20 筆。
- 目前頁碼同步至 route query 的 `page`。
- 切換頁碼時保留目前 `level`。
- 程度篩選造成總頁數改變時，不得停留在不存在的頁碼。

### Mock Data and Types

- 教材 mock data 不放在 `.vue` 檔案內。
- 單字 mock data 放在 `app/data/materials/vocabulary.ts`，未來其他教材也放在 `app/data/materials/`。
- 單字、例句、動詞活用與篩選程度等型別放在 `app/types/vocabulary.ts`。
- `createMockExample` 只用來建立模擬 API 回傳的例句 segments；正式資料庫預計保存完整日文與 highlight 位置，由 API 轉成 segments，不保存 Tailwind class 或例句 HTML。
- 詞性在資料中保存穩定英文代碼 `noun`、`verb`、`i_adjective`、`na_adjective`、`adverb`、`particle`，由 `as const` mapping 產生 `VocabularyPartOfSpeechCode` union type 並轉成繁中短標籤；未來資料庫可沿用代碼，但不在本 Feature 修改 Schema。
- mock data 與型別先服務實際 UI，不受 `docs/schema.md` 限制。

### Visual and Code Conventions

- 優先使用 FlyonUI 與現有專案元件，不引入 DaisyUI 或其他 UI framework。
- 顏色一律優先使用專案現有品牌色、FlyonUI semantic color 與 `main.css` 的 CSS variables。
- 若需要新增會重複使用的顏色，加入 `main.css` 並在完成回報中列出顏色值與用途。
- 本 Feature 新增畫面的最高字重使用 `font-bold`。
- 少量 Tailwind class 直接 inline 在 template；避免在元件底部累積只服務少數元素的 scoped style。
- 一行且容易理解的 Vue 表達式可以寫在 element 上；重複、較長或具業務意義的邏輯再抽出。
- 避免不必要的變數與函式，但型別安全、清楚的狀態流與效能優先。

## Out of Scope

- 單字獨立詳情頁。
- MongoDB Schema、正式 API 與資料 migration。
- 會員登入及正式收藏。
- 收藏持久化與跨裝置同步。
- 單字測驗與複習排程。
- 後台與 AI 教材產生。
- R2 上傳、TTS 批次產生與音檔快取。

## Acceptance Criteria

- [x] 使用者可以在 `N5`～`N1` 與 `All` 之間切換。
- [x] 程度 Badge 只能單選，切換後 URL 包含正確 `level` 且 `page=1`。
- [x] 重新整理有效 query URL 後，程度與頁碼狀態可以還原。
- [x] 列表只顯示符合目前程度與頁碼的 mock data。
- [x] 列表下方可以切換頁碼，篩選變更時回到合理頁碼。
- [x] 單字以 Ruby 顯示，且可以全頁切換假名顯示。
- [x] 每筆單字展開後在意思與動詞分類下方顯示詞性 tag。
- [x] 詞性資料使用英文代碼，列表以繁中短標籤顯示且不顯示動詞分類。
- [x] 選擇 `All` 時顯示 JLPT tag；選擇單一程度時可省略重複 tag。
- [x] 單字發音按鈕具有明確互動狀態，且不載入 YouTube SDK。
- [x] 使用者可以在同一列表頁開啟及關閉單字詳細內容。
- [x] Accordion 由 `activeVocabularyId` 控制，且一次只展開一筆單字。
- [x] 展開項目的完整區塊有清楚但符合品牌的背景色區隔。
- [x] 詳細內容顯示翻譯、適用的活用形及例句。
- [x] 每個單字有 3～4 句例句，並同時提供純文字日文與結構化 highlight segments。
- [x] 動詞顯示第一／二／三類分類，mock data 包含完整常用活用欄位。
- [x] 基本與進階活用在 UI 上有清楚的資訊層級。
- [x] 基本與進階活用各自使用 Collapse，展開內容以 Table 呈現。
- [x] 例句中的目標詞有清楚但不影響閱讀的 highlight。
- [x] 單字及例句收藏愛心按鈕已呈現，但不宣稱資料已永久保存。
- [x] 空篩選結果有明確空狀態。
- [x] 桌面及手機版主要內容與操作均可正常使用。
- [x] mock data 不依照 `docs/schema.md` 強制定型。
- [x] 相關檔案通過 ESLint；若涉及 Nuxt 組態則通過 build。

## References

- `context/project-overview.md`
- `context/current-feature.md`
- `docs/tasks/task-004-vocabulary-tts-playback.md`
- `/test-index` Hero 單字卡的紅、藍 Badge。
- [FlyonUI Accordion `With Avatar`](https://flyonui.com/docs/components/accordion/#with-avatar) 範例；只參考結構，不使用 Avatar。
- 視覺參考圖待補至 `context/screenshots/references/`。

## Notes

- 動詞常用活用欄位已先完整規劃，避免未來新增畫面時逐筆翻新舊教材；仍不在此階段定稿完整日文形態學或 MongoDB Schema。
- 名詞、副詞等非活用詞不顯示空白活用區塊；形容詞的變化需求留待實際 mock data 與 UI 探索時另行定義。
- 收藏屬於使用者行為，未來應引用 vocabulary 或 example ID，不直接成為教材本體的永久狀態。
