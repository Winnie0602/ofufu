# Ofufu — 給繁體中文使用者的日文學習平台

以「教材內容」為核心的日文學習平台，支援初學者到 JLPT N1。使用者依程度瀏覽教材，
逐句對照日文與繁中，點開重點單字與文法，並播放伺服器合成的日文語音。

> 本專案由一個以 YouTube 歌曲為核心的舊產品重構而來。歌曲頁與後台仍保留在 repo 裡，
> 但已不是系統核心——全站背景播放器已移除，教材不再依賴 YouTube。

**線上 Demo**：<https://ofufu.zeabur.app/>

---

## 產品範圍

六大教材類型為單字、文章、對話、歌曲、文法、測驗。目前 v1 交付**單字、閱讀、對話**三種。

三種教材的 MVP 工程主體（資料庫、API、頁面、受控語音）與 Task 011 驗收皆已完成；
下一步為 Task 009 的音檔保存、預產與公開播放流程。進度以
`context/current-feature.md` 與 `docs/tasks/task-011-material-api-and-seed.md` 為準。

| 教材 | 狀態 | 內容 |
| --- | --- | --- |
| 單字 | v1 主體完成 | Ruby 讀音、詞性、13 種動詞活用、例句、發音 |
| 閱讀 | v1 主體完成 | 整篇／單句模式、遮罩、重點單字與文法 popover、序列播放 |
| 對話 | v1 主體完成 | 固定三角色、角色扮演練習、每個角色不同日文人聲 |
| 文法 | 規劃中 | — |
| 歌曲 | 未排程 | 舊功能保留，不再是核心 |
| 測驗 | 未排程 | — |

---

## 技術架構

| 層 | 使用 |
| --- | --- |
| 框架 | Nuxt 4（SSR）、Vue 3 `<script setup>`、TypeScript |
| 樣式 | Tailwind CSS 4、FlyonUI |
| 資料庫 | MongoDB（原生 driver，未使用 ODM） |
| 後端 | Nuxt Nitro server routes |
| 語音 | Google Cloud Text-to-Speech |
| 登入 | @sidebase/nuxt-auth |
| 多語 UI | @nuxtjs/i18n |

教材內容的正本是 repo 裡的 TypeScript 資料檔，MongoDB 是可重建的副本——
內容進 git 才有 diff、review 與重跑的能力。

---

## 技術重點

### 語音端點只接受「內容座標」，不接受文字

**問題**：`/api/tts` 原本收 `{ text, lang }`。這個端點一旦公開，任何人都能貼任意文字
進來，帳單記在我頭上。

**做法**：改成只接受**內容座標**——教材類型、教材 ID、內容單位 ID。伺服器依座標去
資料庫查出要唸的文字與 voice，前端無法提交任意文字，也無法指定 voice。

```ts
// server/utils/materials.ts
export type SpeechTarget = {
  materialType: 'vocabulary' | 'reading' | 'conversation'
  materialId: string
  unitId: string
}

export async function findSpeechSource(
  target: SpeechTarget,
): Promise<{ text: string; voiceName: string } | null>
```

**結果**：送舊格式回 400、座標不存在回 404、在合法座標上多塞 `text` 欄位會被完全忽略
（音檔逐 byte 相同）。voice 由伺服器端 allowlist 決定，對話的三個固定角色因此能有
不同人聲，而**不需要在教材資料裡新增任何欄位**——靠 `speakerId → avatarKey → voice` 查表。

另有文字長度上限、環境變數一鍵停用，以及「文字＋voice 雜湊」為鍵的音檔快取
（同一句只合成一次；教材文字改了雜湊就變，不會誤用舊音檔）。

### 單字用「自然鍵」配對，不用 ID

**問題**：文章裡出現的是活用形「食べた」，單字表存的是辭書形「食べる」，
兩邊沒有共用 ID——教材是 AI 產的，它不可能知道單字表的 ID 長什麼樣。

**做法**：以 `辭書形 + 讀音 + 詞性` 當自然鍵，在**資料匯入階段**完成配對並寫回
`vocabularyItemId`。少了讀音會撞到同形異音（「行った」可能是 いった 或 おこなった），
少了詞性會撞到同形同音但用法不同的字。

**結果**：使用者在 A 文章收藏「食べた」、在 B 文章收藏「食べる」會收到同一筆。
配對不到不會阻斷教材——註解退回使用自己的上下文意思與備用例句，並列進匯入報告，
那份報告可以直接拿去反向產生缺少的單字資料。

### 可重跑的資料匯入

domain ID 直接當 MongoDB `_id`，整份 `replaceOne` upsert，因此 seed 可以無限次重跑：

```text
自然鍵重複檢查 → 建 index → 匯入單字 → 配對教材註解 → 匯入教材 → 回傳報告
```

重複的自然鍵會在寫入前被擋下並回 409，一筆都不會寫進去。連跑兩次的報告與資料庫
筆數完全相同。

### 伺服器端篩選與分頁

列表 API 用 projection 只回卡片需要的欄位，不把整篇內文送到列表頁；詳情 API 在回傳前
把配對成功的註解換成單字表的例句，所以前端不必為了幾個字載入整份單字表，
popover 元件也不用改。

超出範圍的頁碼由伺服器收斂到最後一頁再查，避免「分頁顯示第 5 頁、內容卻是空的」。

---

## 開發設定

需要 Node.js 與一個 MongoDB instance。

```bash
npm install
cp .env.example .env   # 依下表填入
npm run dev
```

| 環境變數 | 用途 |
| --- | --- |
| `MONGODB_URI` | MongoDB 連線字串（必填） |
| `MONGODB_DB` | 教材資料庫名稱，預設 `ofufu` |
| `SEED_TOKEN` | 匯入教材用的通行碼 |
| `TTS_ENABLED` | 設為 `true` 才啟用語音合成，**預設關閉** |
| `GOOGLE_CREDENTIALS` | Google Cloud TTS 的 service account JSON |
| `AUTH_SECRET`、`APP_URL` | 登入相關 |

### 匯入教材

教材資料在 `app/data/materials/*.ts`，透過 dev-only 的 server route 匯入：

```bash
curl -X POST http://localhost:3000/api/admin/seed -H "x-seed-token: $SEED_TOKEN"
```

回應是一份匯入報告：upsert 筆數、重複的自然鍵、以及未配對的單字清單。

> 語音**預設關閉**。`TTS_ENABLED` 未設時教材頁照常可讀，只有播放鍵會拿到 503。
> Task 009 若只公開讀取預產音檔，付費合成入口可維持私有；若保留公開即時合成 fallback，再加入 rate limit。

---

## 專案結構

```text
app/
  components/
    material/    教材外層（列表、卡片、程度篩選）
    content/     教材內文（標註、遮罩、單字與文法 popover）
    vocabulary/  單字列表與活用表
  composables/   useTtsAudio、useStudyState、useMaterialListing
  data/materials/ 教材內容正本（TypeScript）
  types/         共用型別，同時是資料契約
server/
  api/materials/ 教材列表與詳情 API
  api/admin/     教材匯入
  api/tts.post   語音合成
  utils/         collection、查詢工具、語音座標查詢
docs/
  prd.md         產品需求
  tasks/         各功能的實作規格與決策紀錄
context/         給 AI 協作者的專案規範與現況游標
```

元件資料夾依**職責層**而非教材類型分類：`material/` 是教材外層、`content/` 是教材內文，
兩者都被六種教材共用。

---

## 目前限制

- 教材匯入只做 upsert，不會刪除 repo 已移除但資料庫還留著的舊教材。
- 匯入不是 transaction；中途失敗會留下部分完成的狀態，重跑一次即可補齊。
- 首頁為 showcase，仍使用寫死資料。
- 收藏功能只有 UI，不持久化（規劃在 v2 隨會員系統一起做）。
- 尚未加入自動化測試。

---

## 文件

| 文件 | 內容 |
| --- | --- |
| `docs/prd.md` | 產品需求與版本範圍 |
| `docs/tasks/` | 各功能的實作規格、技術取捨與驗收紀錄 |
| `context/content-model.md` | 教材內容與單字身分的長期模型 |
| `context/current-feature.md` | 目前進度 |

---

## Author

Winnie Chang
