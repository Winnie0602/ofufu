<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const { locales, locale, setLocale } = useI18n()

const showComingSoon = ref(false)

watch(showComingSoon, () => {
  setTimeout(() => {
    showComingSoon.value = false
  }, 2000)
})
</script>

<template>
  <div class="w-full font-medium tracking-wide">
    <nav
      class="relative flex h-12 items-center border-b border-gray-200 bg-white px-3 md:h-14 md:px-5"
    >
      <NuxtLink
        class="text-lg font-semibold tracking-wide text-gray-900"
        to="/"
      >
        {{ $t('karaoke_site') }} 〜
        <span class="ml-1 text-[#F9595F]">♪</span>
      </NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="flex items-center gap-1 rounded-md px-1.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none md:px-3"
            >
              <i class="fa-solid fa-globe md:text-xl"></i>
              <span class="text-sm md:text-base">Language</span>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 z-50 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem
                  v-for="lang in locales"
                  :key="lang.code"
                  v-slot="{ active }"
                >
                  <button
                    :class="[
                      locale === lang.code
                        ? 'bg-[#F9595F]/60 text-white'
                        : active
                          ? 'bg-gray-300 text-gray-900'
                          : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors',
                    ]"
                    @click="setLocale(lang.code)"
                  >
                    <span class="mr-2 text-base">{{ lang.flag }}</span>
                    {{ lang.name }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <!-- 登入按鈕 -->
        <div class="group profile-container relative flex items-center">
          <button
            class="rounded-full px-2.5 py-1 transition-colors hover:bg-gray-200"
            @click="showComingSoon = !showComingSoon"
          >
            <i class="fa-regular fa-user text-gray-700 md:text-lg"></i>
          </button>

          <span
            class="pointer-events-none absolute top-1.5 -right-1.5 flex-col items-center justify-center rounded-md bg-[#F9595F]/80 px-1.5 py-1 text-[9px] font-medium text-white shadow-sm ring-1 ring-white"
            :class="[showComingSoon ? 'flex' : 'hidden', 'md:group-hover:flex']"
          >
            <span class="text-[7px] leading-none">COMING</span>
            <span class="mt-[2px] text-[7px] leading-none">SOON</span>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>
