# Task 010：元件資料夾重整與共用學習狀態抽離

## 狀態

✅ Completed（2026-07-25 ～ 2026-07-26）

## 背景與目標

`app/components/materials/` 已累積 16 個元件，且即將加入歌曲、文法、測驗教材。原本考慮按教材類型拆成 `reading/`、`conversation/`、`shared/`，但清點使用處後發現**沒有任何一個元件是閱讀或對話專屬**——全部至少被兩個頁面共用，按教材類型拆會得到兩個空資料夾與一個裝滿的 shared。

因此改為**依職責層分類**：教材外層（列表、卡片）與教材內文（標註、遮罩、學習控制）分開，兩者都會被六種教材共用。閱讀／對話專屬區塊等日後從各自頁面抽出時，才建立 `components/reading/`、`components/conversation/`。

同時解決 Nuxt 自動匯入前綴造成的結巴命名（`MaterialsMaterialCard`）與數個命名不一致。

## 完成範圍

### 教材元件依職責層拆分

| 舊 | 新 | 元件名變化 |
| --- | --- | --- |
| `components/materials/MaterialCard.vue` | `components/material/Card.vue` | `MaterialsMaterialCard` → `MaterialCard` |
| `components/materials/MaterialListing.vue` | `components/material/Listing.vue` | `MaterialsMaterialListing` → `MaterialListing` |
| `components/materials/Page.vue` | `components/material/PageShell.vue` | `MaterialsPage` → `MaterialPageShell` |
| `components/materials/{Hero,LevelFilter}.vue` | `components/material/` 同名 | `Materials*` → `Material*` |
| `components/materials/StudyControls.vue` | `components/content/Controls.vue` | → `ContentControls` |
| `components/materials/StudyDisplayToggles.vue` | `components/content/DisplayToggles.vue` | → `ContentDisplayToggles` |
| `components/materials/StudyMobileControls.vue` | `components/content/MobileControls.vue` | → `ContentMobileControls` |
| `components/materials/RevealableContent.vue` | `components/content/Maskable.vue` | → `ContentMaskable` |
| `components/materials/{AnnotatedText,RubyText,VocabularyPopover,GrammarPopover,GrammarNotes,VisibilityToggle}.vue` | `components/content/` 同名 | `Materials*` → `Content*` |

`Maskable.vue` 命名取自 `reading.spec.md` 的「模糊遮罩」用語；prop 仍為 `visible`（狀態）、事件仍為 `reveal`（動作），兩套用字的分工不變。

### 其他資料夾與命名

| 舊 | 新 | 元件名變化 |
| --- | --- | --- |
| `components/Index/` | `components/home/` | `Index*` → `Home*` |
| `components/test/` | `components/quiz/` | `Test*` → `Quiz*`（`test` 易誤讀為單元測試） |
| `components/{SongLyrics,SongWords}.vue`、`global/{SongPlayer,BottomPanel}.vue` | `components/song/{Lyrics,Words,Player,BottomPanel}.vue` | 僅 `BottomPanel` → `SongBottomPanel` |
| `global/VideoCard.vue` | `components/video/Card.vue` | 不變 |
| `global/{header,footer}.vue` | `global/{Header,Footer}.vue` | 不變（檔名改 PascalCase） |
| `vocabulary/Vocabulary{ListItem,Conjugations}.vue` | `vocabulary/{ListItem,Conjugations}.vue` | 不變（Nuxt 會去重前綴） |
| `composables/useYoutubePlayer.local.ts` | `composables/useYoutubePlayerLocal.ts` | 不變（檔名對齊 export） |

### 移除的未使用檔案

確認全專案無 `resolveComponent` 或 `<component :is>` 後刪除：`material/TypeBadges.vue`、`quiz/KeyboardJa.vue`、`quiz/KeyboardKr.vue`、`quiz/card/TypingComposition.vue`、`quiz/card/TypingInput.vue`、`composables/useBlankTyping.ts`。

> 後兩個元件（共 433 行）是歌曲測驗的填空作答卡片，處理 `partial`／`allBlank`／`translation` 三種題型，與 `useBlankTyping` 是一組。測驗教材若要重新支援填空題型，需重寫或從 git 取回（`git show 37c72f3:app/components/test/card/TypingInput.vue`）。

### 抽出 `useStudyState`

閱讀與對話兩頁有約 60～70 行結構完全相同、只有領域名詞不同（sentence／line）的狀態，抽成 `app/composables/useStudyState.ts`：

- `mode`、`showRuby`、`lookupMode`、`playbackRate`
- 日文／中文顯示開關與兩組掀開紀錄（`revealJapanese`、`clearJapaneseReveals` 等）
- `activeGrammarId` ＋ `toggleGrammar`
- `useTtsAudio` 整組 ＋ 序列播放的 `isSequencePlaying`／`toggleSequence`／`stopSequence`
- 三個原本重複的 watch：FlyonUI 重綁、眼睛關閉時清掀開紀錄 ×2

兩頁 destructure 時改回原本的變數名（`japaneseVisible: sentenceJapaneseVisible` 等），**template 完全未改動**。留在各頁的是真正專屬的：閱讀的 `articleVisible`（整篇遮罩）、對話的 `selectedRoleParticipantId` 與整套角色扮演逐句練習。

`useTtsAudio` 的 `PlayTtsAudioPayload` 改為 `export`，供 `toggleSequence` 共用型別。

## Out of Scope

- 不建立 `components/reading/`、`components/conversation/`：目前沒有專屬元件可放，等頁面 template 抽元件時再建。
- 不修既有的 eslint／typecheck 錯誤（`song/Player.vue`、`admin/*`、`server/api/auth`）。
- 不統一兩頁「切換 tab 是否停止單句播放」的既有行為差異（閱讀只停序列播放、對話一律停）；那是行為決策，不混進重構。

## Acceptance Criteria

- [x] `components/materials/` 全數依職責層移入 `material/` 或 `content/`，無殘留引用。
- [x] 所有元件名不再有 Nuxt 前綴結巴（`MaterialsMaterialCard` 類）。
- [x] `components/global/` 只剩全站共用 UI，無教材／歌曲專屬元件。
- [x] 兩個教材頁改用 `useStudyState`，template 零改動。
- [x] `npx eslint` 對變更檔案零問題；`npm run build` 通過。

## 驗證紀錄

- `npx eslint app`：剩 7 個既有 error，皆在只改路徑未改邏輯的檔案（`song/Player.vue` ×3、`admin/song/edit/Word.vue`、`song/Words.vue`、`admin/login.vue`、`admin/song/edit/[id].vue`）。
- `npx nuxi typecheck`：剩 2 個既有 error（`song/Player.vue` 找不到 `usePlayerStore`、`server/api/auth/[...].ts` 的 Role 型別）。
- `npm run build`：通過。
- 畫面行為由使用者手動確認（兩頁 tabs 切換、眼睛開關與掀開、播放速度即時生效、對話角色扮演逐句練習）。

## 實作注意事項

- **macOS 檔案系統不分大小寫**：純大小寫改名（`header.vue` → `Header.vue`）必須走 `git mv`，`git add` 偵測不到。
- **本 Task 的六個結構 commit 只有最終狀態經過驗證**，個別 checkout 中間 commit 會壞（改名相依性跨了 commit 類別）。要回退請整段一起 revert。
- `components/global/` 在 Nuxt 是「全域註冊、無前綴」的保留語意，只放全站到處用的 UI，教材／歌曲專屬元件不得放入。

## 後續接

- 從 `reading/[id].vue`（現 341 行）與 `conversation/[id].vue`（現 547 行）的 template 抽出各自專屬區塊，屆時才建立 `components/reading/`、`components/conversation/`。
- `song/Player.vue` 是 Task 001 移除全站播放器後的殘留死檔，帶 3 個 eslint error 與 1 個 typecheck error，待確認後刪除。
- `vocabulary/Conjugations.vue` 產生的元件名 `VocabularyConjugations` 與 `types/vocabulary.ts` 的同名型別重疊，不影響執行但易誤讀，動到單字頁時順手改名。

## Reference

- `context/current-feature.md`（Notes：職責層分類原則）
- Commits：`2a0a7a4`、`f2cb9a0`、`71587a3`、`e9d551a`、`a7d8b15`、`f94e9e0`、`ad3bded`
