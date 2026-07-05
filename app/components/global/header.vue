<script setup lang="ts">
const isMobileNavOpen = ref(false)

const navItems = [
  { label: '文章閱讀', href: '#' },
  { label: '文法學習', href: '#' },
  { label: '單字學習', href: '#' },
  { label: '歌曲學習', href: '#' },
  { label: '小測驗專區', href: '#' },
  { label: '關於本站', href: '#' },
  { label: '加入方案', href: '#' },
]

const openMobileNav = () => {
  isMobileNavOpen.value = true
}

const closeMobileNav = () => {
  isMobileNavOpen.value = false
}
</script>

<template>
  <header class="w-full bg-white/95 shadow-sm backdrop-blur">
    <nav
      class="mx-auto flex h-15 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <NuxtLink
        to="/"
        class="inline-flex shrink-0 items-center"
        aria-label="Ofufu"
      >
        <img
          src="/logo-default.png"
          alt="Ofufu"
          class="h-9 w-auto object-contain"
        />
      </NuxtLink>

      <ul
        class="menu ofufu-menu menu-horizontal hidden p-0 text-base font-semibold lg:flex"
      >
        <li v-for="item in navItems" :key="item.label">
          <a :href="item.href" class="px-4 py-2">
            {{ item.label }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn btn-text btn-circle text-dark hidden md:inline-flex"
          aria-label="搜尋"
        >
          <span class="icon-[tabler--language-hiragana] size-7"></span>
        </button>

        <NuxtLink
          to="/login"
          class="btn btn-error h-9 min-h-9 px-6 text-sm font-semibold max-md:hidden"
        >
          登入
        </NuxtLink>

        <button
          type="button"
          class="btn btn-text text-dark btn-circle lg:hidden"
          aria-haspopup="dialog"
          :aria-expanded="isMobileNavOpen"
          aria-controls="site-mobile-navigation"
          aria-label="開啟選單"
          @click="openMobileNav"
        >
          <span class="icon-[tabler--menu-2] size-6"></span>
        </button>
      </div>
    </nav>

    <Teleport to="body">
      <button
        v-show="isMobileNavOpen"
        type="button"
        class="fixed inset-0 z-20 bg-neutral-950/40 lg:hidden"
        aria-label="關閉選單"
        @click="closeMobileNav"
      ></button>

      <aside
        id="site-mobile-navigation"
        class="fixed inset-y-0 inset-s-0 z-20 flex w-full max-w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden"
        :class="isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'"
        tabindex="-1"
        role="dialog"
        :aria-hidden="!isMobileNavOpen"
        aria-label="Mobile navigation"
      >
        <div class="drawer-header border-b border-neutral-100">
          <img
            src="/logo-default.png"
            alt="Ofufu"
            class="h-9 w-auto object-contain"
          />
          <button
            type="button"
            class="btn btn-text btn-circle btn-sm absolute inset-e-3 top-3"
            aria-label="關閉選單"
            @click="closeMobileNav"
          >
            <span class="icon-[tabler--x] size-5"></span>
          </button>
        </div>

        <div class="drawer-body py-5">
          <ul
            class="menu ofufu-mobile-menu w-full p-0 text-base font-semibold text-neutral-900"
          >
            <li v-for="item in navItems" :key="item.label">
              <a :href="item.href" @click="closeMobileNav">
                {{ item.label }}
              </a>
            </li>
          </ul>

          <div class="mt-6 w-full">
            <NuxtLink
              to="/login"
              class="btn btn-error w-full"
              @click="closeMobileNav"
            >
              登入
            </NuxtLink>
          </div>
        </div>
      </aside>
    </Teleport>
  </header>
</template>
