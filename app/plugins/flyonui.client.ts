type FlyonWindow = Window & {
  HSStaticMethods?: {
    autoInit: () => void
  }
}

const initFlyonUI = () => {
  ;(window as FlyonWindow).HSStaticMethods?.autoInit()
}

export default defineNuxtPlugin(async (nuxtApp) => {
  await import('flyonui/flyonui.js')

  nuxtApp.hook('page:finish', () => {
    nextTick(initFlyonUI)
  })

  nextTick(initFlyonUI)
})
