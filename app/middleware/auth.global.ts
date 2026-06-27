export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth()

  // 所有人都能看非 admin 的頁面 & 登入頁面
  if (!to.path.startsWith('/admin')) {
    return
  }

  if (to.path === '/admin/login') {
    return
  }

  // 檢查登入狀態
  if (status.value !== 'authenticated') {
    return navigateTo('/admin/login')
  }

  if (data.value?.user?.role !== 'admin') {
    // 雖然登入了但不是 admin，踢回首頁
    return navigateTo('/')
  }
})
