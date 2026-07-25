type FlyonWindow = Window & {
  HSStaticMethods?: {
    autoInit: () => void
  }
}

/**
 * 重新初始化 FlyonUI 元件。
 *
 * FlyonUI 只在頁面載入／換頁時 `autoInit`（見 `app/plugins/flyonui.client.ts`）；
 * 若元件是切換狀態後才動態出現（例：查字模式開啟後才長出的單字 Popover），
 * 需在 DOM 更新後手動再跑一次，否則新元件的 click trigger 不會綁定。
 */
export function useFlyonuiReinit() {
  return () => {
    if (!import.meta.client) return
    void nextTick(() => {
      ;(window as FlyonWindow).HSStaticMethods?.autoInit()
    })
  }
}
