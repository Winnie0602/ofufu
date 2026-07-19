# Ofufu AI 開發規範

## 必讀文件

開始實作前依序閱讀：

1. `context/project-overview.md`
2. `context/current-feature.md`
3. 對應的 `context/features/*.spec.md`（若存在）

`docs/schema.md` 是未來資料庫草案，不是目前前端實作的強制規格。

## 專案方向

- Ofufu 是給繁體中文使用者的日文學習平台。
- 正式支援程度為初學者至 JLPT N1。
- 六大教材類型為：單字、文章、對話、歌曲、文法、測驗。
- 歌曲只是教材之一，不得讓一般教材依賴 YouTube 或全站播放器。

## 現階段開發策略

- 目前優先完成 UI、互動流程與教材頁切版。
- 假資料先以 TypeScript 或 JSON 放在前端專案中。
- 不為了符合尚未定案的 MongoDB Schema 犧牲前端探索速度。
- 當頁面與使用流程穩定後，再從實際使用方式整理 API 與資料模型。
- AI 產生的教材只能是待審核內容，必須經管理員確認後才能發布。

## 技術與程式風格

- 使用 Nuxt 4、Vue 3、TypeScript、Tailwind CSS 4 與 FlyonUI。
- 優先使用 `<script setup lang="ts">` 與 Composition API。
- Vue 元件事件使用 TypeScript 函式 overload 宣告 `defineEmits`，明確命名 `event` 與 payload，例如 `(event: 'toggle', vocabularyId: string): void`；若不同事件的 payload 型別相同而觸發 `@typescript-eslint/unified-signatures`，可在該 overload 加入局部 ESLint 例外以保留 payload 語意，不停用全專案規則。
- 沿用現有元件與 CSS variables，不任意建立重複的設計系統。
- 共用型別放在 `app/types/`；可重用邏輯放在 `app/composables/`。
- 教材 mock data 與 Vue 元件分離，統一放在 `app/data/materials/`；對應型別放在 `app/types/`。
- 新增 UI 優先使用 FlyonUI 與專案現有元件，不為了相似元件另外引入 UI framework。
- 顏色優先使用 `app/assets/css/main.css` 已有的品牌色與 CSS variables，不在各元件任意增加相近色。
- 若某個新顏色會跨元件重複使用，可加入 `main.css`；完成時必須明確回報新增的顏色與用途。
- 新增畫面的字重最粗使用 `font-bold`；除非使用者另有指定，不新增 `font-extrabold` 或 `font-black`。
- Tailwind class 數量不多時直接寫在 template；避免為少量樣式在元件底部建立難以追蹤的 scoped style。
- template 上只有一行且容易理解的 Vue 表達式可以 inline；較長、重複或具業務意義的邏輯再抽成 computed 或 function。
- 避免為單次簡單操作建立過多變數與函式，但不得為了減少函式數量犧牲型別安全、可讀性或造成重複計算。
- 不讀取、輸出或提交 `.env` 的秘密值。

## 變更限制

- 未經使用者同意，不新增 npm 套件。
- 不以目前的 `docs/schema.md` 為理由提前建立資料庫或 API。
- 不自行擴張 Feature 範圍；發現相鄰需求時記錄在 Todo 或 Notes。
- 保留使用者工作區中與任務無關的未提交變更。

## Git Commit 規範

- 未經使用者明確同意，不自行建立 commit。
- Commit message 統一使用 Conventional Commits 格式：`type(scope): 繁體中文摘要`。
- `type` 與 `scope` 使用小寫英文，`scope` 必須填寫並清楚表示變更範圍。
- 摘要與補充說明使用繁體中文，不使用英文句子，結尾不加句號。
- Commit message 以 1 行為主；需要交代原因或重要細節時，可增加第 2 行繁體中文說明。
- 一個 commit 只處理一組相關變更，避免混入無關檔案。
- Commit 前必須檢查 staged files，不得包含 `.env`、credentials、系統檔或任務範圍外的變更。
- 允許的 type：`feat`、`fix`、`refactor`、`style`、`docs`、`test`、`chore`、`perf`、`build`、`ci`。

範例：

```text
feat(vocabulary): 完成單字與例句即時語音播放
```

```text
fix(vocabulary): 修正展開單字後的畫面定位

依固定 Header 高度保留捲動間距
```

```text
refactor(tts): 抽離共用語音播放 composable
```

```text
docs(task-004): 更新語音播放驗收結果
```

## 完成條件

- 實作符合對應 Feature Spec 與 Acceptance Criteria。
- 執行專案現有且與變更相關的檢查；目前至少執行 `npx eslint <changed-files>`。
- 涉及建置或 Nuxt 組態時執行 `npm run build`。
- 回報已完成項目、檢查結果、未處理風險與建議下一步。
- Feature 完成後更新 `context/current-feature.md`。
