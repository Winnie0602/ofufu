import { Observer } from 'tailwindcss-intersect'

const restartObserver = () => {
  Observer.restart()
}

export default defineNuxtPlugin((nuxtApp) => {
  Observer.start()

  nuxtApp.hook('page:finish', () => {
    nextTick(restartObserver)
  })
})
