# Task 001: 移除全站背景播放器依賴

## 狀態

`Planned`

## 目標

移除全站背景 YouTube 播放器，避免整個網站依賴 Song 或 YouTube 播放狀態。

歌曲播放未來只存在於 Song 頁面內，不再跨頁持續播放。

## 背景

目前 default layout 將所有一般頁面包在 `SongPlayer` 中，因此首頁與未來的 Article、Dialogue、Vocabulary 頁面都會進入播放器生命週期。

新產品以 Material/Segment 學習流程為核心：

- Article 不需要 YouTube。
- Dialogue 預設使用 Segment audio，不需要 YouTube。
- Vocabulary 不需要 YouTube。
- Quiz 不應依賴全站播放器。
- Song 可以在自己的頁面內保留 YouTube Embed。

## 現況分析

### 播放器掛載位置

- `app/layouts/default.vue`
  - 掛載全站 `Header`。
  - 使用 `SongPlayer` 包住所有 page slot。
- `app/components/global/SongPlayer.vue`
  - 建立 `#player` YouTube 容器。
  - 呼叫 `useYoutubePlayer()`。
  - 顯示固定在頁面底部的播放控制列。
  - 依 route 決定是否顯示影片區塊。

### 播放狀態與執行層

- `app/stores/player.ts`
  - 保存 `videoId`、`test_videoId`、時間、播放速度與 segment request。
  - 使用 persisted state 支援跨頁播放。
- `app/composables/useYoutubePlayer.ts`
  - 載入 YouTube Iframe API。
  - 建立 player instance。
  - 監聽 store 並執行播放、暫停、seek 與 segment playback。
- `app/middleware/player-mode.global.ts`
  - 依 route 切換 `normal`、`test`、`admin` mode。

### Song 與 Quiz 使用點

- `app/pages/song/[id].vue`
  - 將 route ID 寫入 player store。
  - 使用 store current time 計算目前歌詞。
- `app/components/SongLyrics.vue`
  - 透過 store seek 到歌詞時間。
- `app/pages/song/test/[id].vue`
  - 設定 test video ID，測驗仍依賴全站 YouTube player。
- `app/components/test/*`
  - 多個元件透過 store 播放歌詞片段。
- `app/components/admin/song/edit/Time.vue`
  - 使用獨立的 `useYoutubePlayerLocal`，不是全站播放器。

## Scope

本次只處理：

- 確認全站播放器的掛載與依賴。
- 從 default layout 移除 `SongPlayer` wrapper。
- 確認首頁與非 Song 頁不載入 YouTube Iframe API。
- 在 Song 頁建立或掛載局部 YouTube 播放器容器。
- 保留既有 Song 頁的基本播放、歌詞同步與 seek 能力。
- 隔離舊播放器程式，不做立即刪除。
- 明確處理舊 Song Quiz 對播放器的暫時依賴。

## Out of Scope

- 重寫完整 Song 頁。
- 重寫 player store。
- 建立 v2 Material/Segment 架構。
- 建立 Article 或 Dialogue 頁。
- 修改 MongoDB schema。
- Migration 舊歌曲資料。
- 刪除舊播放器相關檔案。
- 建立新的 TTS audio system。
- 重寫 Quiz domain。

## 受影響檔案

### 預期需要修改

- `app/layouts/default.vue`
  - 移除 `SongPlayer` wrapper，保留一般 page slot。
- `app/pages/song/[id].vue`
  - 成為 Song 局部播放器的掛載與生命週期入口。
- `app/components/global/SongPlayer.vue`
  - 評估改為 Song page 專用元件，或拆出可局部掛載的 player component。

### 可能需要小幅調整

- `app/components/SongLyrics.vue`
- `app/composables/useYoutubePlayer.ts`
- `app/stores/player.ts`
- `app/middleware/player-mode.global.ts`
- `app/assets/css/main.css`

### 必須先確認，避免意外回歸

- `app/pages/song/test/[id].vue`
- `app/components/test/SelectTestType.vue`
- `app/components/test/SelectLyrics.vue`
- `app/components/test/Testing.vue`
- `app/components/test/Review.vue`

舊測驗目前使用 player store 播放指定歌詞片段。移除 layout player 後，測驗頁若沒有局部 player instance，既有測驗會失去音訊。實作前必須選擇：

1. 暫時在舊 Song Quiz 頁掛載局部 legacy player；或
2. 將 Song Quiz 標記為暫停使用，等待後續 segment audio 重構。

本 task 建議採用方案 1，以維持既有功能。

## 暫時不應刪除

- `app/stores/player.ts`
- `app/composables/useYoutubePlayer.ts`
- `app/composables/useYoutubePlayer.local.ts`
- `app/types/youtube.d.ts`
- Song 頁的時間軸與同步歌詞邏輯。
- Test components 的 segment playback 呼叫。
- Admin 時間軸編輯器的 local player。

這些程式仍被 Song、Song Quiz 或 Admin 使用。Task 001 的目標是隔離，不是清除。

## 建議實作計畫

1. 建立播放器依賴清單，確認所有 `usePlayerStore`、`useYoutubePlayer` 與 `#player` 使用點。
2. 確認首頁載入時目前是否注入 YouTube Iframe API，作為修改前基準。
3. 將 default layout 改為單純渲染 Header 與 page slot。
4. 將 `SongPlayer` 或拆出的局部 player 掛到 Song detail page。
5. 在 legacy Song Quiz page 掛載無全站持久化需求的局部 player。
6. 取消非 Song route 的 player mode 與 persisted playback 副作用。
7. 驗證首頁、登入頁與未來 v2 route 不會建立 `#player` 或載入 YouTube SDK。
8. 驗證 Song 的播放、暫停、seek、歌詞同步與翻譯顯示。
9. 驗證 Song Quiz 仍能播放指定片段。
10. 保留舊檔案並註記後續清理 task，不在本次擴大重構。

## Acceptance Criteria

- [ ] 進入首頁不會建立 YouTube player instance。
- [ ] 進入首頁不會因全站 layout 載入 YouTube Iframe API。
- [ ] 進入 Article、Dialogue 或其他 v2 頁面不會載入 YouTube player。
- [ ] Song 頁仍顯示局部 YouTube Embed。
- [ ] Song 頁仍可播放、暫停與 seek。
- [ ] Song 頁的同步歌詞仍可依目前播放時間更新。
- [ ] 點擊有時間戳的歌詞仍可播放或跳至對應位置。
- [ ] 舊 Song Quiz 仍能播放指定歌詞片段，或已有明確的暫時停用決策。
- [ ] 離開 Song 頁後不會繼續背景播放。
- [ ] 不修改 MongoDB schema 或歌曲資料。
- [ ] 不刪除仍被 Song、Quiz 或 Admin 使用的 legacy player 程式。
- [ ] 修改範圍維持局部，沒有同步進行 v2 domain 重構。

## 驗證方式

### 手動驗證

- 首頁：確認 Network/DOM 中沒有 YouTube Iframe API 與 `#player`。
- Song 頁：確認 YouTube embed、播放控制與歌詞同步正常。
- Song -> 首頁：確認離頁後播放停止，且首頁沒有固定播放列。
- Song Quiz：確認 preview、題目播放與 review playback。
- Admin Song Time Editor：確認 local player 不受影響。

### 自動化驗證建議

- 加入 route-level browser test，檢查首頁不存在 YouTube iframe。
- 加入 Song page test，檢查 player container 只在 Song route 出現。
- 加入 navigation test，確認離開 Song route 後 player 被 destroy。

## 風險

- `useYoutubePlayer()` 目前由 `SongPlayer` 呼叫；直接移除 wrapper 會讓 Song 與 Quiz 都失去 player instance。
- player store 使用 persisted state，局部播放器若未清理，可能在下一次進入 Song 頁恢復舊狀態。
- default layout 的 padding 與底部播放器高度耦合，移除後需確認頁面高度與留白。
- `player-mode.global.ts` 可能仍對所有 route 寫入 store，需要確認是否留下不必要副作用。
- `noPlayer` layout 已有自己的生命週期行為，本 task 不應順便重構。

## 完成定義

Task 完成時，全站 layout 不再擁有任何 YouTube player instance；Song 與 legacy Song Quiz 可在各自頁面內建立並銷毀播放器，其他頁面與播放器狀態完全解耦。

