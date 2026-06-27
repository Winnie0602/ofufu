<script setup lang="ts">
definePageMeta({
  layout: 'no-player',
})

const { signIn, status } = useAuth()

// 處理 Google 登入
const handleGoogleLogin = async () => {
  try {
    // 這裡是使用 google provider
    await signIn('google', { callbackUrl: '/admin' })
  } catch (err) {
    console.error(err)
    alert('登入過程中發生錯誤')
  }
}
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-80px)] items-center justify-center px-4"
    style="background: var(--olaf-surface)"
  >
    <div
      class="w-full max-w-md rounded-xl border p-8 shadow-sm"
      style="
        border-color: var(--olaf-line);
        background: var(--olaf-white);
        color: var(--olaf-black);
      "
    >
      <!-- 頂部標題區 -->
      <div class="mb-8 text-center">
        <h1 class="text-xl font-semibold tracking-tight" style="color: var(--olaf-blue)">
          Log in Karaoke Lab
        </h1>
        <p class="mt-2 text-sm" style="color: rgba(16, 16, 16, 0.56)">
          請使用官方 Google 帳號驗證身分
        </p>
      </div>

      <!-- 登入按鈕區 -->
      <div class="space-y-4">
        <button
          type="button"
          :disabled="status === 'loading'"
          class="flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm transition-all disabled:opacity-50"
          style="
            border-color: var(--olaf-blue);
            background: var(--olaf-blue);
            color: var(--olaf-white);
          "
          @click="handleGoogleLogin"
        >
          <!-- 簡潔的 Google Icon -->
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path
                d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.3c1.92,-1.78 3.02,-4.4 3.02,-7.4C21.66,11.82 21.55,11.44 21.35,11.1Z"
                fill="#4285F4"
              />
              <path
                d="M12,20.64c2.34,0 4.3,-0.77 5.74,-2.1l-3.3,-2.6c-0.91,0.61 -2.08,0.98 -3.33,0.98 -2.56,0 -4.73,-1.73 -5.5,-4.06H2.2v2.69C3.63,18.42 7.56,20.64 12,20.64Z"
                fill="#34A853"
              />
              <path
                d="M6.5,12.87c-0.2,-0.61 -0.31,-1.25 -0.31,-1.91s0.11,-1.3 0.31,-1.91V6.36H2.2c-0.65,1.3 -1.02,2.77 -1.02,4.32s0.37,3.02 1.02,4.32L6.5,12.87Z"
                fill="#FBBC05"
              />
              <path
                d="M12,5.38c1.27,0 2.42,0.44 3.32,1.29l2.49,-2.49C16.3,2.83 14.34,2.16 12,2.16c-4.44,0 -8.37,2.22 -9.8,5.56l4.3,3.37C7.27,7.11 9.44,5.38 12,5.38Z"
                fill="#EA4335"
              />
            </g>
          </svg>
          <span>
            {{ status === 'loading' ? '正在跳轉...' : '使用 Google 帳號登入' }}
          </span>
        </button>
      </div>

      <!-- 底部返回 -->
      <div class="mt-8 text-center">
        <NuxtLink
          to="/"
          class="text-xs font-medium transition-colors"
          style="color: var(--olaf-red)"
        >
          ← 返回首頁
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
