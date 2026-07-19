# Task 004: 單字教材即時 TTS 播放

## 狀態

`Completed`

## 目標

將既有 `POST /api/tts` 串接至 `/vocabulary` 的單字與例句播放按鈕，
以 Google TTS 即時產生 MP3 並在目前頁面播放，取代 Task 002 的計時器模擬狀態。

本 Task 只驗證單字教材的真實播放體驗；R2、音檔快取、Audio Asset 與批次產生
流程留待後續技術 Task。

## 完成後現況

- `server/api/tts.post.ts` 已接受 `text` 與語言設定，並回傳 Base64 MP3
  `audioContent`。
- `useTtsAudio()` 統一呼叫 API，並以單一 `HTMLAudioElement` 管理播放、停止、
  非同步競態、錯誤復原及卸載清理。
- `/vocabulary` 與既有 `BottomPanel.vue` 均使用相同 composable；播放按鈕統一使用
  `global/AudioButton.vue`。
- 單字列播放文字來自 `VocabularyItem.word`。
- 例句播放文字必須使用完整純文字欄位 `VocabularyExample.japanese`，不得從
  highlight HTML 或畫面 DOM 擷取。

## Scope

- 將單字頁的 mock `playAudioPreview` 改為真實非同步播放流程。
- 呼叫既有 `POST /api/tts`，日文使用 `LANG_CONFIG_MAP.ja`。
- 單字播放按鈕送出該筆 `item.word`。
- 例句播放按鈕送出該句 `example.japanese`。
- 調整播放事件 payload，使頁面同時取得穩定的 `audioId` 與要朗讀的 `text`；
  `audioId` 只負責 UI 狀態，`text` 才是 TTS request 內容。
- 使用單一 `HTMLAudioElement` 管理目前音訊，任一時間只允許播放一段。
- request 開始時顯示 `loading`，瀏覽器實際開始播放後顯示 `playing`，播放結束後
  回到 `idle`。
- 播放另一筆內容時，先停止並重設上一段音訊，再開始新的 request。
- 點擊目前正在播放的按鈕時停止播放，並回到 `idle`。
- 防止較早的非同步 response 在使用者已切換播放目標後覆蓋目前狀態或突然播放。
- API、音訊解碼或瀏覽器自動播放失敗時，清除 loading／playing 狀態，並透過既有
  Toast 顯示容易理解的失敗訊息。
- 離開頁面或元件卸載時停止音訊並移除事件處理，避免背景繼續播放。
- 保留 Task 002 已確認的按鈕尺寸、icon、Swap 與 Loading 視覺，不重新設計列表。
- 將播放 UI 統一為 `global/AudioButton.vue`，並將 API、音訊生命週期與競態處理
  抽至 `useTtsAudio()`；既有 `BottomPanel.vue` 改用相同播放邏輯。

## API Contract

沿用既有 API，不在本 Task 改變共用端點格式：

```ts
await $fetch('/api/tts', {
  method: 'POST',
  body: {
    text,
    lang: LANG_CONFIG_MAP.ja,
  },
})
```

成功 response：

```ts
{
  audioContent: string
}
```

`audioContent` 為 Base64 MP3，前端可建立
`data:audio/mp3;base64,${audioContent}` 交由 `HTMLAudioElement` 播放。

## Out of Scope

- Cloudflare R2 上傳、讀取與 CDN URL。
- TTS 音檔持久化、快取、去重與預先批次產生。
- MongoDB、Audio Asset Schema 與教材 API。
- TTS voice 選擇器、語速、音高與多語言設定 UI。
- 全站播放器、背景播放與跨 route 保留播放狀態。
- 其他尚未使用 `POST /api/tts` 的頁面播放功能。
- 正式環境的 rate limit、用量配額與防濫用策略；上線公開使用前需另開技術 Task。
- 收藏、登入與會員功能。

## Acceptance Criteria

- [x] 單字播放按鈕會朗讀目前單字的 `item.word`。
- [x] 例句播放按鈕會朗讀完整的 `example.japanese`。
- [x] 單字與例句播放不再使用 `setTimeout` 模擬。
- [x] request 期間只有對應按鈕顯示 Loading。
- [x] 音訊實際播放時，只有對應按鈕顯示停止 icon。
- [x] 同一時間最多播放一段音訊。
- [x] 點擊播放中的按鈕可以停止目前音訊。
- [x] 切換至另一個單字或例句時，上一段會停止且不會延遲恢復播放。
- [x] 播放結束、播放失敗與離開頁面後，狀態都會正確回到 `idle`。
- [x] TTS 失敗時顯示錯誤提示，且按鈕可以再次操作。
- [x] 不使用 YouTube、全站播放器或 `window.speechSynthesis`。
- [x] 不新增 R2、資料庫、Audio Asset 或新的 npm 套件。
- [x] 具備有效 Google TTS credentials 的本機環境可完成單字及例句人工播放驗收。
- [x] 相關檔案通過 ESLint，專案通過 production build。

## 驗收結果

- 2026-07-19 於本機 `/vocabulary` 驗證 `食べる` 單字及前兩句例句可透過
  Google TTS 播放，request、實際播放及停止分別呈現 Loading、停止 icon 與 idle。
- 驗證播放中點擊同一按鈕會停止；快速切換另一句時，上一句立即停止且舊狀態不會
  恢復。
- 暫時令 `/api/tts` 回傳 503 驗證失敗流程：按鈕回到 idle、顯示既有 Toast，並可
  再次操作；測試用錯誤已還原，未保留 API 變更。
- 驗證 route 切換會執行音訊清理，返回單字頁後播放狀態為 idle。
- `npx eslint app/pages/vocabulary.vue app/components/vocabulary/VocabularyListItem.vue app/components/global/AudioButton.vue app/components/global/BottomPanel.vue app/composables/useTtsAudio.ts app/types/audio.ts server/api/tts.post.ts` 通過。
- `npm run build` 通過；僅出現專案既有 Toast／ConfirmModal 同時靜態與動態匯入
  警告。

## 驗證方式

- 依序播放一個單字與該單字至少兩句例句，確認朗讀文字正確。
- 播放途中點擊同一按鈕，確認音訊停止。
- 播放途中快速切換另一個按鈕，確認沒有重疊或舊 response 突然播放。
- 模擬 API 失敗，確認 Toast、狀態復原及再次播放皆正常。
- 切換 route 或離開頁面，確認音訊停止。
- 執行相關檔案 ESLint 與 `npm run build`。

## Reference

- `context/features/vocabulary.spec.md`
- `app/pages/vocabulary.vue`
- `app/components/vocabulary/VocabularyListItem.vue`
- `app/components/global/AudioButton.vue`
- `app/composables/useTtsAudio.ts`
- `server/api/tts.post.ts`
- `app/components/global/BottomPanel.vue`

## Notes

- 本 Task 會讓每次未快取的播放都呼叫 Google TTS，適合目前的本機 UI 驗證，
  不代表已具備正式公開環境所需的成本控制。
- `.env` 中的 Google credentials 只能由 server 使用，不得輸出至前端、文件、log
  或 commit。
