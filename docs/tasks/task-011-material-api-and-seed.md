# Task 011：受控語音、教材資料庫與教材 API

## 狀態

`In Progress`（**步驟** 0-1 已完成——刪除死檔。階段 0 其餘步驟與階段 1 之後皆待實作。）

## 目標

把 v1 的三種教材（單字、閱讀、對話）從「編譯進前端的 TypeScript 假資料」推進到
「MongoDB ＋ Nuxt server API」，並讓語音成為公開環境可開啟的受控功能。

歌曲、文法、測驗不在本 Task 範圍。

## 給實作者

- **依「執行順序」由上而下做，不要跳階段。** 階段順序已經依「重要性」與「是否
  依賴資料庫」排過，前面的階段不需要資料庫也不需要後面的成果。
- **每個階段結束都是一個可交付狀態。** 時間不夠時從最後面往前砍，不要砍前面的。
- 下方「技術定案」是查閱用的參考，不是執行順序。
- 專案規範見 `AGENTS.md`：未經同意不新增 npm 套件、不自行建立 commit、
  完成後執行 `npx eslint <changed-files>`。

---

## 最低可行產品（MVP）的定義

**做完「階段 0」與「階段 1」就是 MVP，之後的都是加分項。**

MVP 必須同時滿足這三件事，缺一不可：

1. 單字、閱讀、對話三頁的資料來自 MongoDB，經 API 取得，不再從前端 import 假資料。
2. 語音在公開環境可用，且公開使用者無法提交任意文字觸發付費合成。
3. 對話的固定角色使用不同的日文人聲。

---

## 執行順序

### 階段 0：受控語音與雙人聲（不需要資料庫）

**為什麼排最前面**

- `/api/tts` 目前第一行就是 `throw createError({ statusCode: 503 })`，等於整站
  語音是死的。這是修復既有功能，不是新功能。
- 這階段**完全不需要資料庫**：server route 的 `~/*` alias 指向 `app/*`
  （見 `.nuxt/tsconfig.server.json`），所以 server 可以直接 import 現有的教材
  資料檔。等階段 1 的資料庫好了，只要換掉一個查詢函式的內部實作，介面不變，
  **這階段不會產生任何白工**。
- 做完之後網站的所有功能都是活的，隨時可以展示。

**步驟**

- [x] **0-1** 刪除死檔 `app/components/song/Player.vue`（Task 001 的殘留，零引用，
      帶 3 個 eslint 與 1 個 typecheck error）。
- [ ] **0-2** 建立 `server/utils/materials.ts`，提供依座標取得教材文字與 voice 的
      查詢函式 `findSpeechSource()`（命名與支援範圍見「定案一」）。
      **第一版實作直接 import `~/data/materials/*`**：

      ```ts
      import { readingMaterials } from '~/data/materials/reading'
      import { conversationMaterials } from '~/data/materials/conversation'
      import { vocabularyItems } from '~/data/materials/vocabulary'
      ```

      這個檔案是階段 1 唯一要改實作的地方，因此函式簽章要先想清楚。
      （若 value import 的 alias 在 Nitro 建置時解析失敗，改用相對路徑
      `../../app/data/materials/reading`，行為相同。）
- [ ] **0-3** 改寫 `server/api/tts.post.ts`：移除最上方的 `throw`，改為只接受
      內容座標（見「定案一」），加上 voice allowlist、文字長度上限、
      找不到座標回 404、環境變數可一鍵停用。
- [ ] **0-4** 對話雙人聲：依 `unitId → line.speakerId → participant.avatarKey`
      查 voice allowlist（見「定案一」）。**不需要新增任何資料欄位。**
- [ ] **0-5** `app/composables/useTtsAudio.ts` 的 payload 由 `{ audioId, text }`
      改為 `{ audioId }`，`materialType` 與 `materialId` 在建立 composable 時傳入。
      更新所有呼叫端：

      | 呼叫端 | 播什麼 | unitId |
      | --- | --- | --- |
      | `pages/vocabulary.vue` ＋ `components/vocabulary/ListItem.vue` | 單字本體 | `VocabularyItem.id` |
      | 同上 | 單字例句 | `VocabularyExample.id` |
      | `pages/reading/[id].vue` | 句子 | `ReadingSentence.id` |
      | `pages/conversation/[id].vue` | 台詞 | `ConversationLine.id` |
      | `components/content/VocabularyPopover.vue` | 單字表層形 | `MaterialVocabularyNote.id` |

      **播放狀態機、序列播放、角色扮演邏輯完全不動。**

      `VocabularyPopover` 目前只有 `note`、`variant` 兩個 prop，不知道自己屬於
      哪一篇教材，而它從 **3 個地方**被渲染：
      `components/content/AnnotatedText.vue`、`pages/reading/[id].vue`、
      `pages/conversation/[id].vue`。

      **做法：用 `provide` / `inject` 傳教材座標**，不要一路傳 prop。

      ```ts
      // app/types/material.ts
      export type MaterialCoordinate = {
        materialType: 'reading' | 'conversation'
        materialId: string
      }
      export const materialCoordinateKey =
        Symbol('materialCoordinate') as InjectionKey<MaterialCoordinate>

      // 兩個詳情頁各 provide 一次
      provide(materialCoordinateKey, { materialType: 'reading', materialId: material.id })

      // VocabularyPopover 內 inject
      const coordinate = inject(materialCoordinateKey)
      ```

      理由：`AnnotatedText` **自己完全不需要這個資訊**，純轉發 prop 只是雜訊；
      而且頁面裡直接使用 popover 的地方（頁尾「重點單字」清單）也能一併拿到。
      改 3 處 vs 傳 prop 要改 8 處。
      `inject` 拿不到值時要丟出明確錯誤，不要靜默失敗。
- [ ] **0-6** `app/components/song/BottomPanel.vue` 的語音停用：移除它的
      `useTtsAudio`，播放鍵改為 disabled 並加註解說明原因（見「定案七」）。
      **這一步不能略過**，否則改完 payload 型別會讓建置失敗。
- [ ] **0-7** 加一層行程內記憶體快取（`Map`），避免同一句反覆呼叫 Google TTS。
      階段 2 再換成 MongoDB。

**階段 0 檢查點（做完立刻執行，不要留到階段 3）**

- [ ] `npx eslint <changed-files>` 通過。
- [ ] `npm run build` 通過（`useTtsAudio` 改了型別，這裡最容易漏掉呼叫端）。
- [ ] 閱讀、對話、單字三頁的所有播放按鈕都能發出聲音，含單字例句。
- [ ] 對話中不同角色的聲音明顯不同。
- [ ] 用工具直接對 `/api/tts` 送任意文字會被拒絕。
- [ ] 送不存在的 `materialId` / `unitId` 回 404。
- [ ] 同一句連按兩次，第二次不再呼叫 Google TTS。

---

### 階段 1：教材資料庫與 API（MVP 的核心）

**做完這階段就是 MVP。**

- [ ] **1-1** 建立 collection 與 index（見「定案三」）。
- [ ] **1-2** 建立 `server/api/admin/seed.post.ts`：驗證 token、建 index、
      單字自然鍵重複檢查、upsert 單字、配對閱讀／對話的單字註解、upsert 教材、
      回傳報告（見「定案二」與「定案四」）。
- [ ] **1-3** 跑一次 seed，確認未配對報告的內容正確，並**刻意保留至少一個未配對
      的代表案例**。不要在這裡把單字表補到全部配對成功——AC 要求「配對成功與
      未配對兩種案例同時存在」，補到收斂反而會讓未配對那條驗收不到。
      補齊單字數量留在階段 2-3。
- [ ] **1-4** 建立五支教材 API（見「API contract」）。列表 API **一次做到伺服器端
      篩選與分頁**（見「定案六」），不要先回全部再重構。詳情 API 要在伺服器端把
      單字表例句併進註解（見「定案五」）。
- [ ] **1-5** 三個列表頁與兩個詳情頁改用 `useFetch` / `useAsyncData`，加上
      loading 與空狀態；`useMaterialListing` 隨伺服器分頁調整（見「定案六」）；
      詳情頁沿用現有的 `createError` 404 處理。
- [ ] **1-6** 補一張本機教材封面到 `public/images/`，指定給一篇閱讀或對話，讓
      「有封面」與「`coverImage: null`」兩種情況都有代表案例
      （目前 6 篇教材全部是 `null`，而 `components/material/Card.vue` 有封面分支）。
- [ ] **1-7** 把 `server/utils/materials.ts` 的實作從「讀資料檔」換成「讀 MongoDB」。
      函式簽章不變，因此 `/api/tts` 一行都不用改。

**階段 1 檢查點（做完立刻執行）**

- [ ] `npx eslint <changed-files>` 通過。
- [ ] `npm run build` 通過。
- [ ] 三個列表頁與兩個詳情頁的 Network 面板看得到 API 請求，畫面與改版前一致。
- [ ] 切換程度與翻頁時有新的 API 請求（確認分頁真的在伺服器端）。
- [ ] 無效的教材 ID 顯示 404。
- [ ] seed 連跑兩次，資料庫筆數不變。
- [ ] 閱讀／對話頁同時存在「配對成功」與「未配對」的單字 popover，兩者都正常顯示。
- [ ] 列表同時看得到「有封面」與「無封面」的卡片。
- [ ] 語音仍然正常（1-7 只換了查詢來源）。

---

### 階段 2：加分項（可依剩餘時間逐項砍）

依重要性排序，時間不夠就從最後一項開始砍。

- [ ] **2-1** 音檔快取從記憶體改為 MongoDB `audio_cache` collection
      （見「定案一」的快取段）。估 1 小時。
- [ ] **2-2** 補充閱讀與對話教材數量。這是內容工作不是工程，不影響 MVP 成立。
- [ ] **2-3** 依未配對報告補齊單字表（見「定案四」）。同樣是內容工作。

---

### 階段 3：收尾（不可省略）

階段 0 與階段 1 各自已經跑過 eslint 與 build，這裡是整體驗收。

- [ ] **3-1** `npx eslint <changed-files>` 全數通過。
- [ ] **3-2** `npm run build` 通過。
- [ ] **3-3** 逐頁走一遍「Acceptance Criteria」的代表性情境。
- [ ] **3-4** 更新 `context/current-feature.md`。

---

## 技術定案（參考用，非執行順序）

### 定案一：語音入口只接受內容座標

`/api/tts` 的 request body 就是 `SpeechTarget`：

```ts
// server/utils/materials.ts

/** 「要唸哪一句」的座標。materialType 沿用 types/material.ts 既有的 MaterialType，不另創 scope 字彙。 */
export type SpeechTarget = {
  materialType: 'vocabulary' | 'reading' | 'conversation'
  materialId: string
  unitId: string
}

/** 查出來的結果：要唸的字，和用誰的聲音。 */
export type SpeechSource = {
  text: string        // 已用 toPlainJapanese() 剝掉括號 Ruby 的純日文
  voiceName: string
}

export async function findSpeechSource(
  target: SpeechTarget,
): Promise<SpeechSource | null>
```

伺服器依座標取得教材、取出該單位的文字、剝除括號 Ruby、決定 voice、合成或讀快取。
**前端無法提交任意文字或任意 voice 名稱。**

`useTtsAudio` 的 payload 由 `{ audioId, text }` 改為 `{ audioId }`，`audioId`
即 `unitId`；`materialType` 與 `materialId` 在建立 composable 時傳入。
呼叫端因此更簡單，播放狀態機不動。

#### findSpeechSource 必須支援的 unit 種類

`unitId` 在不同 `materialType` 下指的東西不同，實作時四種都要能查到：

| materialType | unitId 是什麼 | 要唸的文字 |
| --- | --- | --- |
| `vocabulary` | `VocabularyItem.id` | `item.word` |
| `vocabulary` | `VocabularyExample.id`（**單字列表頁會播例句**） | `example.japanese` |
| `reading` | `ReadingSentence.id` | `sentence.text` 剝括號 |
| `conversation` | `ConversationLine.id` | `line.text` 剝括號 |

`materialType: 'vocabulary'` 時，`materialId` 一律是 `VocabularyItem.id`；
例句就從那筆單字的 `examples[]` 裡找。

教材內文的單字 popover（`components/content/VocabularyPopover.vue`）播的是
**單字表層形**，`materialType` 用該篇教材、`unitId` 用 `note.id`。
popover 的例句是純文字渲染、**沒有播放按鈕**，所以不需要處理「詳情 API 注入的
單字表例句」——那些例句不會被點播。若日後替 popover 例句加上播放鍵，要改成
`materialType: 'vocabulary'` ＋ 該例句所屬單字的 id，不要讓閱讀教材去解析
單字表的例句 id。

#### 對話雙人聲

對話已使用 `ふふ／シロ／クロ` 三個固定角色（`app/types/conversation.ts` 的
`characterAvatarKeyMap`），因此**不需要新增資料欄位**，只要在伺服器端建 allowlist：

```ts
// server-only，前端拿不到也送不了
const characterVoiceMap = {
  fufu: 'ja-JP-Neural2-B',   // 女聲
  shiro: 'ja-JP-Neural2-C',  // 男聲
  kuro: 'ja-JP-Neural2-D',   // 男聲（音色較低）
} as const
const defaultJapaneseVoice = 'ja-JP-Neural2-B'
```

- 對話：`unitId` → `line.speakerId` → `participant.avatarKey` → voice。
- 閱讀與單字：一律 `defaultJapaneseVoice`。
- 三個角色都使用 Neural2，屬於同一計價級別、依合成字元數計費。因此在「同一句只
合成一次」的前提下，**使用多個角色 voice 不會額外增加費用**——多出來的成本只有
「多錄了幾句」而已。不同模型級別（Standard／WaveNet／Neural2／Chirp3-HD）單價
不同，換級別才會影響費用。價格以官方頁面為準：
<https://cloud.google.com/text-to-speech/pricing>

#### 快取

階段 0 用行程內 `Map`；階段 2 換成 MongoDB `audio_cache`：

```ts
{
  _id: string        // sha256(voiceName + '|' + 純文字) 前 32 碼
  voiceName: string
  audio: string      // base64 MP3，單句約 20–40 KB，遠低於 16 MB 上限
  createdAt: Date
}
```

- 同一句文字＋同一 voice 只會合成一次。
- 教材文字修改 → 雜湊改變 → 自動產生新音檔，天然滿足 Task 009 的「文字修改後
  不可誤用舊音檔」。
- 舊的孤兒音檔 v1 不清理。
- 之所以先用 MongoDB 而不是 R2：專案已有 MongoDB，v1 的資料量不足以讓多接一個
  物件儲存服務產生效益。量放大或需要 CDN 時再遷移，屆時只有快取讀寫的實作要換。

#### 其他保護

- 文字長度上限（例如 200 字元），超過直接拒絕。
- 環境變數可一鍵停用語音合成（保留現有 503 的能力，改成由設定控制）。
- 找不到 `materialId` / `unitId` 一律 404，不進入合成。

---

### 定案二：資料匯入（seed）的執行方式

「seed」＝把 repo 裡的教材資料寫進 MongoDB 的那個動作。

#### 資料放在哪裡

**放在現在的位置就好，不用搬、不用轉 JSON、不用另開資料夾。**

```text
app/data/materials/vocabulary.ts
app/data/materials/reading.ts
app/data/materials/conversation.ts
```

這些檔案匯入資料庫之後**不刪除**。它們是內容的正本，MongoDB 只是查詢用的副本。
把種子資料放在 repo 是各框架的既有做法（Rails `db/seeds.rb`、Prisma
`prisma/seed.ts`、Laravel `database/seeders/`），資料進版控才有 diff、review 與
重跑的能力。

#### 為什麼是 server route 而不是獨立 script

- `app/data/materials/*.ts` 用了 `~/types` 這類專案 alias，獨立的 Node script
  解析不了，得額外裝 `tsx` 或 `jiti`——`AGENTS.md` 規定未經同意不新增套件。
- Nitro server route 本來就跑在專案的 TS 環境裡，`~/*` 已指向 `app/*`
  （見 `.nuxt/tsconfig.server.json`），直接 import 即可。

#### 怎麼執行

```bash
npm run dev
curl -X POST http://localhost:3000/api/admin/seed -H "x-seed-token: <token>"
```

回應是一份報告：

```json
{
  "upserted": { "vocabulary": 33, "reading": 8, "conversation": 6 },
  "duplicateNaturalKeys": [],
  "unmatchedNotes": [
    { "dictionaryForm": "眺める", "reading": "ながめる",
      "partOfSpeech": "verb", "contextualMeaning": "遠遠地看、眺望",
      "from": "reading/rd-4jK2" }
  ]
}
```

#### 保護

- 需要 `x-seed-token` header 比對環境變數。
- `import.meta.dev` 為 false 時直接 403，正式環境無法呼叫。

**為什麼 dev-only 不會造成「正式環境無法匯入」**：本機 dev 與部署站台目前使用
同一個由 `MONGODB_URI` 設定的 MongoDB instance、同一個 `ofufu` 資料庫。所以在
本機打一次 seed，部署站立刻讀得到，不需要在正式環境開放 seed endpoint——那只會
多一個攻擊面。

⚠️ **反過來說，本機 seed 會直接改動公開站台讀取的資料。** 現階段沒有使用者資料
可以接受，但 seed token、`MONGODB_DB` 的值與「執行前先確認連的是哪個資料庫」
三件事都不可省略。

（未來若拆出獨立的正式資料庫，再把守門條件改成 `SEED_ENABLED` 環境變數
＋ token，預設關閉、用完即關。現階段不需要。）

#### 內部流程

```text
建 index → 單字自然鍵重複檢查 → upsert 單字
        → 逐一比對閱讀／對話的單字註解，填入 vocabularyItemId
        → upsert 教材 → 回傳報告
```

因為用 domain id 當 `_id` 且全部走 upsert，**這支可以重跑無限次**，不會產生重複
資料。改了教材內容就重跑一次，這是它取代「手動匯入」的關鍵。

#### 已知限制：upsert 不等於完整同步

**v1 的 seed 只做 upsert，不會刪除「repo 已移除、但資料庫還留著」的舊教材。**
所以從 `app/data/materials/*.ts` 刪掉一篇文章後，MongoDB 裡那篇仍然存在，
列表頁還看得到。

需要完整重建時，先手動清空三個教材 collection 再跑 seed。

要讓「repo 是正本」完全成立，未來可以二選一（不在 v1）：

- seed 前先清空三個教材 collection 再全量寫入；或
- seed 後刪除資料庫中不存在於 repo 的 domain ID。

---

### 定案三：collection 與 index

沿用現有 TypeScript 型別，**document 形狀 = 現有型別**，不另設中介模型。

| Collection | Document | `_id` |
| --- | --- | --- |
| `vocabulary_items` | `VocabularyItem` | 沿用現有 domain id（`xf0UXfch7bLu`） |
| `reading_materials` | `ReadingMaterial` | 沿用現有 domain id |
| `conversation_materials` | `ConversationMaterial` | 沿用現有 domain id |
| `audio_cache` | 見「定案一」 | 文字＋voice 的雜湊 |

**直接用 domain id 當 `_id`**：不會出現「MongoDB `_id` 與 domain id 兩套身分」的
問題，upsert 天然冪等。

**資料庫裡不同時保存 `_id` 和 `id`**，避免日後兩者不一致。儲存形狀明確定義為：

```ts
type StoredReadingMaterial = Omit<ReadingMaterial, 'id'> & { _id: string }
```

轉換只發生在兩個邊界，中間層一律用前端型別：

```text
seed 寫入： { id, ...rest }  →  { _id: id, ...rest }
API  回傳： { _id, ...rest }  →  { id: _id, ...rest }
```

只有教材與單字的**最外層** id 這樣處理。內文的句子 id、台詞 id、註解 id、例句 id
都是巢狀欄位，不是 MongoDB document 的主鍵，**維持原本的 `id` 欄位名不動**。

Index：

- `vocabulary_items`：`{ word, reading, partOfSpeech }` **unique**（自然鍵去重）
- `reading_materials` / `conversation_materials`：`{ level: 1 }`

因為 seed 可重跑、資料庫可清空重建，且沒有真實使用者資料，**現在建資料庫不會鎖死
擴充性**。真正昂貴的是「已有使用者資料之後的 migration」，那不在 v1。

---

### 定案四：單字配對在匯入階段完成，不需要後台

「配對」＝拿教材裡的單字註解，去單字表找出對應的那一筆，把它的 id 寫回註解。
邏輯直接複用 `app/utils/vocabularyMatching.ts` 既有的自然鍵：

```text
(dictionaryForm 辭書形, reading 讀音, partOfSpeech 詞性)
```

- 找到 → 把 `vocabularyItemId` 寫進註解，存進 MongoDB。
- 找不到 → `vocabularyItemId: null`，列進報告的 `unmatchedNotes`；教材照常顯示，
  popover 退回使用註解自帶的 `contextualMeaning` 與備用例句。
- v1 **不自動建立草稿單字**（`content-model.md` 的長期方向保留，但不在本 Task）。

之所以不需要後台：後台是給「人工修正配對結果」用的，v1 沒有人要修正，只需要看
報告知道哪些字還沒收錄。

#### 單字表用「反向產生」補齊，不用猜

```text
seed 一次
  → 取得 unmatchedNotes 清單（辭書形／讀音／詞性都已在裡面）
  → 把清單貼給 AI，依 docs/tasks/seed-data.md 產對應的 VocabularyItem
  → 驗證後放回 app/data/materials/vocabulary.ts
  → 重跑 seed，直到只剩「刻意不收錄」的字
```

好處是單字表的覆蓋率由教材決定，不必事先猜要產哪些字，也天然保證閱讀／對話頁
有大量配對成功的案例。

---

### 定案五：詳情 API 在伺服器端把單字例句併進註解

`context/content-model.md` 定的例句優先序：

1. 有配對到單字表 → 用**單字表的 `examples`**
2. 沒配對到但註解自帶備用例句 → 用註解的
3. 兩者皆無 → 不顯示例句區塊

**第 1 條由詳情 API 在回傳前完成**，不在前端做：

```ts
const material = await readingMaterials.findOne({ _id: id })

// 收集這篇用到的單字 id，一次撈回來
const ids = allNotes(material).map((n) => n.vocabularyItemId).filter(Boolean)
const items = await vocabularyItems.find({ _id: { $in: ids } }).toArray()

// 配對成功的註解換成單字表的例句；沒配對的維持自己的備用例句
for (const note of allNotes(material)) {
  const item = itemMap.get(note.vocabularyItemId)
  if (item) note.examples = item.examples
}
```

理由：

- 前端不必為了幾個字載入整份單字表，payload 只含這篇實際用到的例句。
- 詳情頁只有一個 `useFetch`，不需要處理兩個請求的 loading／error 組合與 SSR 時序。
- 優先序規則只存在伺服器一處，之後收藏頁共用同一份行為。
- **`components/content/VocabularyPopover.vue` 一行都不用改**，它本來就在渲染
  `note.examples`。

只補 popover 需要的欄位，**不把整筆單字資料攤平進註解**——完整活用表與通用意思
仍然只出現在單字列表頁與未來的收藏區，維持 `content-model.md` 的「參照優先」。

`vocabularyMatching.ts` 的 `favoriteVocabularyKey` 保留給收藏去重使用。

---

### 定案六：列表 API 做伺服器端篩選與分頁（階段 1 一次做到位）

沿用專案既有的 `server/api/list/songs.ts` 寫法（原生 `mongodb` driver 的
`skip` ＋ `limit` ＋ `countDocuments`，**本專案未使用 mongoose**）：

```ts
const [items, total] = await Promise.all([
  collection.find(filter).skip((page - 1) * pageSize).limit(pageSize).toArray(),
  collection.countDocuments(filter),
])
return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
```

`app/composables/useMaterialListing.ts` 隨之調整：

- 現況把完整陣列在前端 `filter` ＋ `slice`；改為把 route query 的 `level`／`page`
  直接當成 `useFetch` 的 reactive query，Nuxt 會在條件變動時自動重新請求。
  **篩選與切片邏輯移除，composable 因此變短。**
- `pageCount` 改讀回應的 `totalPages`。
- 兩個要處理的邊界：
  - `page` 超出範圍時伺服器回空陣列，改用回應的 `totalPages` 收斂顯示頁碼。
  - 翻頁後捲動到第一張卡片的時機，從 `nextTick` 改為「請求完成後」；既有的
    `scrollRequestVersion` 流水號機制保留。

**不要分兩次改。** API 反正都要查 MongoDB，多加 `filter`／`skip`／`limit` 的
成本很低；先回傳全部陣列、之後再重構成分頁回應，等於同一段程式碼寫兩次，
還要改兩次 `useMaterialListing`。

真的時間不足時的降級方式是「前端先不做翻頁 UI 的優化」，不是「API 先回全部」——
contract 從一開始就固定為分頁回應。

---

### 定案七：`song/BottomPanel.vue` 的語音在 v1 停用

`app/components/song/BottomPanel.vue`（歌曲頁的查字面板，由 `song/Words.vue` 使用）
也在用 `useTtsAudio`，但它播的是 **Tatoeba API 回來的任意外部句子**，而且語言可變：

```ts
const { audioState, togglePlay, stopAudio } = useTtsAudio(() => LANG_CONFIG_MAP[lang])
const handleSpeak = (text: string, index: number) =>
  togglePlay({ audioId: `bottom-panel-${index}`, text })
```

這種內容**本質上無法座標化**——外部字典句子沒有 `materialId` 可指，也就無法套用
「只能唸既有教材」的保護。所以它不是「一併遷移就好」，是設計上的衝突。

v1 的處理：**移除它的 `useTtsAudio`，播放鍵改為 disabled 並加註解說明原因。**

- 這個功能今天本來就是壞的（`/api/tts` 全站 503），停用不是退步。
- 歌曲在 `docs/prd.md` 是 `[未排程]`，不值得為它在兩天內多開一條要測的路徑。
- **這一步不能省略**：`useTtsAudio` 的 payload 型別改了之後，不處理它會讓
  `npm run build` 失敗。

日後要恢復時的方向（不在本 Task）：改成「已登入使用者才能對任意文字合成」
（專案已有 `@sidebase/nuxt-auth`），或把常用的 Tatoeba 例句預先收成教材再座標化。

---

## API contract

```text
GET  /api/materials/vocabulary?level=n5&page=1     → { items, total, page, pageSize, totalPages }
GET  /api/materials/reading?level=n5&page=1        → { items, total, page, pageSize, totalPages }
GET  /api/materials/reading/:id                    → ReadingMaterial（單字註解已配對、例句已併入）
GET  /api/materials/conversation?level=n5&page=1   → { items, total, page, pageSize, totalPages }
GET  /api/materials/conversation/:id               → ConversationMaterial（同上）
POST /api/tts                                      → { audioContent: base64 }
POST /api/admin/seed                               → 匯入報告（dev-only ＋ token）
```

- 列表 API 的 `items` 用 projection 只取 `MaterialSummary` 欄位，不把整篇內文
  送到列表頁；單字列表回 `VocabularyItem[]`。
- `level` 只接受 `n5`～`n1`，其餘（含 `all`）不加入 filter；`page` 非正整數當 1。
- 詳情 API 找不到 → 404，頁面沿用現有 `createError` 顯示。
- 所有回應把 `_id` 改名為 `id`，前端型別完全不變。

---

## Out of Scope

- Cloudflare R2、CDN、批次預產音檔、音檔資產狀態機。
- 管理員後台與教材編輯器。
- 自動建立草稿單字、文法 pattern 配對（`grammarPointId` 一律 `null`）。
- 歌曲、文法、測驗的資料化。
- 會員登入、收藏持久化、學習紀錄。
- 全文搜尋。

## Acceptance Criteria

### MVP（階段 0＋1，必須全數通過）

- [ ] 單字、閱讀、對話三個列表頁的資料來自 API。
- [ ] 閱讀、對話詳情頁資料來自 API；無效 id 顯示 404。
- [ ] 代表性案例可正確顯示：有封面與 `null` 封面、配對成功與未配對的單字註解、
      有 Ruby 與無 Ruby 的句子、有文法註解與無文法註解的句子。
- [ ] seed 可重跑，重跑後不產生重複教材，且回報 upsert 筆數。
- [ ] 單字自然鍵重複會被偵測並明確回報。
- [ ] 未配對的單字註解會列在報告中，且不影響教材顯示。
- [ ] 列表同時看得到「有封面」與「`coverImage: null`」的卡片。
- [ ] 程度篩選與分頁由伺服器完成（切換條件時有新的 API 請求）。
- [ ] 資料庫的 document 只有 `_id`，沒有重複的最外層 `id` 欄位。
- [ ] 對話播放時，不同角色使用不同日文人聲。
- [ ] 單字列表頁的「單字本體」與「例句」兩種播放都正常。
- [ ] 同一句重複播放不會重複呼叫 Google TTS。
- [ ] `/api/tts` 拒絕任意文字與不存在的 `materialId` / `unitId`。
- [ ] 語音停用或失敗時，教材頁仍可閱讀，並有明確的失敗提示。
- [ ] `song/BottomPanel.vue` 的播放鍵為停用狀態，且不影響建置。

### 加分項（階段 2，未完成不影響 MVP 成立）

- [ ] 音檔快取存在 MongoDB，重啟服務後仍然命中。
- [ ] 教材數量與單字表覆蓋率提升。

### 收尾（階段 3，不可省略）

- [ ] `npx eslint <changed-files>` 通過。
- [ ] `npm run build` 通過。

> 階段 0 與階段 1 各自的檢查點已經跑過 eslint 與 build，這裡只是整體複驗。
> **不要把所有檢查都留到最後**——兩天工期裡最容易被犧牲的就是最後一段。
