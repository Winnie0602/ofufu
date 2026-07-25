<template>
  <footer
    class="mt-10 w-full bg-white/95 text-neutral-950 shadow-[0_-1px_3px_rgb(0_0_0_/_0.08)] backdrop-blur"
  >
    <div class="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div
        class="mx-auto grid w-full gap-10 text-center md:max-w-2xl md:grid-cols-[1.6fr_1fr_1fr] md:text-left lg:max-w-6xl lg:grid-cols-[1.6fr_1fr_1fr_1fr]"
      >
        <section>
          <img
            src="/logo-default.png"
            alt="Ofufu"
            class="mx-auto h-10 w-auto object-contain md:mx-0"
          />
          <p
            class="mx-auto mt-5 max-w-xs text-sm leading-7 text-neutral-600 md:mx-0"
          >
            Ofufu 致力於提供多元、實用的日語學習資源，幫助學習者持續進步。
          </p>
          <div class="mt-6 flex justify-center gap-3 md:justify-start">
            <a
              href="#"
              class="hover:bg-error flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white transition"
              aria-label="Facebook Link"
            >
              <span class="icon-[tabler--brand-facebook] size-5"></span>
            </a>
            <a
              href="#"
              class="hover:bg-error flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white transition"
              aria-label="Instagram Link"
            >
              <span class="icon-[tabler--brand-instagram] size-5"></span>
            </a>
            <a
              href="#"
              class="hover:bg-error flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white transition"
              aria-label="YouTube Link"
            >
              <span class="icon-[tabler--brand-youtube] size-5"></span>
            </a>
            <a
              href="#"
              class="hover:bg-error flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white transition"
              aria-label="Line Link"
            >
              <span class="icon-[tabler--message-circle] size-5"></span>
            </a>
          </div>
        </section>

        <nav class="hidden lg:block">
          <h3 class="text-base font-black">學習內容</h3>
          <ul class="mt-5 space-y-3 text-sm font-medium text-neutral-600">
            <li>
              <a href="#" class="hover:text-error transition">文章閱讀</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">文法學習</a>
            </li>
            <li>
              <NuxtLink to="/vocabulary" class="hover:text-error transition">
                單字學習
              </NuxtLink>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">歌曲學習</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">小測驗專區</a>
            </li>
          </ul>
        </nav>

        <nav>
          <h3 class="text-base font-black">關於我們</h3>
          <ul class="mt-5 space-y-3 text-sm font-medium text-neutral-600">
            <li>
              <a href="#" class="hover:text-error transition">關於 Ofufu</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">聯絡我們</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">意見回饋</a>
            </li>
          </ul>
        </nav>

        <nav>
          <h3 class="text-base font-black">相關資源</h3>
          <ul class="mt-5 space-y-3 text-sm font-medium text-neutral-600">
            <li>
              <a href="#" class="hover:text-error transition">日語檢定介紹</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">學習技巧</a>
            </li>
            <li>
              <a href="#" class="hover:text-error transition">常見問題</a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mt-10 border-t border-neutral-200 pt-5 text-center text-sm text-neutral-500"
      >
        © 2026 Ofufu. All rights reserved.
        <span class="icon-[tabler--paw] ml-2 inline-block size-4"></span>
      </div>
    </div>
  </footer>
</template>
