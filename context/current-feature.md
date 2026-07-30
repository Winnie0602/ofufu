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
| 011 | 受控語音、教材資料庫與教材 API（v1 主線） | 🚧 In Progress（階段 0＋1 完成，MVP 成立） |

## 現在焦點

- Branch：`dev`。
- 上一個完成：**Task 011 階段 1（1-1 ～ 1-7 全部）**。三種教材已進 MongoDB，
  三個列表頁與兩個詳情頁的資料都來自 API，程度篩選與分頁在伺服器端完成，
  `findSpeechSource()` 也改讀資料庫（簽章不變，`/api/tts` 沒動）。
- **階段 0** 的受控語音維持不變：`/api/tts` 只吃「教材類型＋教材 id＋單位 id」的座標，
  文字與 voice 都由伺服器決定。
- **尚缺一輪瀏覽器人工走查**，清單與建議看哪兩篇教材見 task-011 的
  「人工走查清單」。這些都不需要改程式。
- **語音公開開啟前必須先加 rate limit**：現在擋得住任意文字與任意 voice，
  擋不住拿合法座標反覆請求。行程內快取重啟就沒了。
- 教材封面放 `public/images/covers/`，資料寫相對路徑。**不能放 `app/assets/`**——
  `coverImage` 是資料庫來的字串，Vite 只處理原始碼裡看得見的靜態路徑。
- **語音預設關閉**：`TTS_ENABLED=true` 才啟用，本機設在 `.env`，部署站台不設，
  避免公開端點被陌生人刷 Google TTS 的成本。要在網站上開之前先想好防濫用。
- 產品範圍與版本規劃一律看 `docs/prd.md`（唯一一份 PRD，不再有 `prd-v1.md` 這類分版檔案）。
- 目前資料量：單字 86 筆、閱讀 9 篇、對話 9 篇，程度涵蓋 n5～n1。教材內容仍在增加中。

## 下一步 Todo

- **瀏覽器人工走查**（見上方「現在焦點」與 task-011 階段 1 檢查點）。
- ~~**依未配對報告補齊單字表**~~：單字表補到 86 筆後，56 則註解全部配對成功，
  未配對只剩刻意不收的 `二名様`（固定表達）。日後新增教材再依 seed 回應的
  `unmatchedNotes` 反向補字即可。
- 補教材資料排在 Task 011 階段 2，三階段規範已寫好可直接貼給 AI：
  1. `docs/tasks/seed-content-draft.md` — 產內容
  2. `docs/tasks/seed-annotation-draft.md` — 審重點單字／文法
  3. `docs/tasks/seed-data.md` — 轉 TypeScript
- **從兩個教材頁 template 抽出各自專屬區塊**，屆時才建立 `components/reading/`、`components/conversation/`（見 task-010「後續接」）。
- **單字表沒有欄位規格**：`docs/tasks/seed-data.md` 只規範閱讀與對話教材，不含
  `VocabularyItem`（`rubyHtml`、`verbGroup`、`conjugations` 都沒提），但定案四要求
  「依 seed-data.md 產 VocabularyItem」。下次要大量產單字前先補這份規格。
  已定下的慣例先記在這裡：`rubyHtml` **能逐字拆就逐字拆，拆不開的整組標一個 `rt`**
  （`一人暮らし` 的 `一人` 是熟字訓、`時々` 的 `々` 沒有讀音、`景色` 的 `景` 不讀 `け`，
  三者都整組標）；する 名詞的 `meaning` 只寫短 gloss，不註明可接 `する`。
- **Task 009** 的正式音檔流程（R2、批次預產、資產狀態機）由 Task 011 承接其中的受控與快取部分，其餘維持 Backlog。

## 已知債（有意識延後，非遺漏）

- **首頁 `app/components/home/*`（Introduce、Test、各 List、Carousel…）為 showcase 頁**：寫死資料、用來展示其他頁面的使用方式，尚未完成，且**暫無 feature spec**。策略：等各教材頁穩定後再回頭補首頁內容與（如需要的）spec；目前只做必要的 bug 修復與連結，不為它建完整規格。
- ~~`components/song/Player.vue` 死檔~~：已於 Task 011 階段 0 刪除。
- **`song/BottomPanel.vue` 的語音已停用**：它播的是 Tatoeba 回來的任意外部句子，
  沒有 `materialId` 可指，套不上「只能唸既有教材」的保護，播放鍵改為 disabled。
  日後恢復的方向是「已登入才能對任意文字合成」或把常用例句收成教材（見 task-011 定案七）。

## Notes（跨 Task、不在別處記錄的決策）

- 現階段不要先依 `docs/schema.md` 建資料庫或 API。
- **元件資料夾依「職責層」而非「教材類型」分類**：`material/` 是教材外層（列表、卡片），`content/` 是教材內文（標註、遮罩、學習控制），兩者都被六種教材共用。閱讀／對話專屬元件等有東西可放時才建資料夾。新舊路徑對照與理由見 `docs/tasks/task-010-component-structure-refactor.md`。
- `components/global/` 在 Nuxt 是「全域註冊、無前綴」的保留語意，只放全站到處用的 UI，教材／歌曲專屬元件不得放入。
- 專案既有 hydration mismatch：Header／Toast／ConfirmModal，以及 FlyonUI accordion 自動初始化與 Vue 狀態競態（解法：在 Vue 自控的 accordion 上加 `--prevent-on-load-init`，見 `home/Test.vue`、`vocabulary/ListItem.vue`）。
