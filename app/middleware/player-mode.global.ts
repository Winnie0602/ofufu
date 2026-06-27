export default defineNuxtRouteMiddleware((to) => {
  const store = usePlayerStore()

  const path = to.path

  if (path.startsWith('/song/test')) {
    store.setMode('test')

    store.setPlaybackRate(1)
  } else if (path.startsWith('/admin')) {
    store.setMode('admin')
  } else {
    store.setMode('normal')
  }
})
