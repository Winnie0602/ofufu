<script setup lang="ts">
const studyModes = [
  {
    title: '文章閱讀',
    text: '閱讀各式主題文章，提升理解力與閱讀速度。',
    action: '瀏覽文章',
    icon: 'icon-[tabler--file-text]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[0ms]',
  },
  {
    title: '對話學習',
    text: '透過生活情境對話，熟悉自然說法、語氣與實用表達。',
    action: '瀏覽對話',
    icon: 'icon-[tabler--messages]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[112ms]',
  },
  {
    title: '文法學習',
    text: 'N5~N1 專題練習與模擬測驗，幫助你有效備考。',
    action: '前往練習',
    icon: 'icon-[tabler--clipboard-check]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[224ms]',
  },
  {
    title: '單字學習',
    text: '系統化單字學習與測驗，擴充詞彙量更有效率。',
    action: '瀏覽單字',
    icon: 'icon-[tabler--letter-case]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[336ms]',
  },
  {
    title: '歌曲學習',
    text: '透過日語歌曲學習發音、語感與實用詞彙。',
    action: '瀏覽歌曲',
    icon: 'icon-[tabler--music]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[448ms]',
  },
  {
    title: '小測驗',
    text: '用多種題型檢查理解度，把學過的日文真正變成自己的能力。',
    action: '開始測驗',
    icon: 'icon-[tabler--pencil-check]',
    iconColor: 'text-primary',
    motionDelay: 'intersect:motion-delay-[560ms]',
  },
]

const levelSteps = [
  {
    level: '初學者',
    title: '從五十音開始',
    action: '適合第一次學日文',
    icon: 'icon-[tabler--seedling-filled]',
    motionDelay: 'intersect:motion-delay-[0ms]',
  },
  {
    level: 'N5',
    title: '基礎入門',
    action: '學會基本日文',
    icon: 'icon-[tabler--droplet]',
    motionDelay: 'intersect:motion-delay-[160ms]',
  },
  {
    level: 'N4',
    title: '日常基礎',
    action: '看懂日常生活日文',
    icon: 'icon-[tabler--growth]',
    motionDelay: 'intersect:motion-delay-[320ms]',
  },
  {
    level: 'N3',
    title: '日常進階',
    action: '自然表達想法',
    icon: 'icon-[tabler--pencil]',
    motionDelay: 'intersect:motion-delay-[480ms]',
  },
  {
    level: 'N2',
    title: '高階實用',
    action: '流暢理解各種情境',
    icon: 'icon-[tabler--book]',
    motionDelay: 'intersect:motion-delay-[640ms]',
  },
  {
    level: 'N1',
    title: '精通挑戰',
    action: '接近母語者水準',
    icon: 'icon-[tabler--star-filled]',
    motionDelay: 'intersect:motion-delay-[800ms]',
  },
]
</script>

<template>
  <div class="bg-error/5 py-8">
    <section
      class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
    >
      <div class="section-title">
        <span
          class="icon-[tabler--arrow-badge-right] section-title-icon"
        ></span>
        <h2>六大學習教材</h2>
      </div>
      <div class="study-mode-grid">
        <article
          v-for="mode in studyModes"
          :key="mode.title"
          :class="[
            mode.motionDelay,
            'intersect:motion-preset-slide-left intersect:motion-ease-spring-bouncier intersect-once card study-mode-card',
          ]"
        >
          <div class="card-body">
            <span
              :class="[mode.icon, mode.iconColor, 'study-mode-icon']"
            ></span>
            <h3 class="card-title study-mode-title">{{ mode.title }}</h3>
            <p class="study-mode-text">{{ mode.text }}</p>
          </div>
          <div class="study-mode-overlay">
            <button class="btn btn-error study-mode-action">
              {{ mode.action }} >
            </button>
          </div>
        </article>
      </div>
    </section>

    <section
      class="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[38px]"
    >
      <div class="section-title">
        <span
          class="icon-[tabler--arrow-badge-right] section-title-icon"
        ></span>
        <h2>面向不同程度的學習者</h2>
      </div>

      <div class="rounded-md bg-white py-6 sm:px-6 lg:py-8">
        <div class="scrollbar-hidden snap-x overflow-x-auto pb-2">
          <div class="grid min-w-[760px] grid-cols-6 items-start lg:min-w-0">
            <div
              v-for="(step, index) in levelSteps"
              :key="step.level"
              :class="[
                step.motionDelay,
                'intersect:motion-preset-slide-left intersect:motion-ease-spring-bouncier intersect-once relative flex snap-center flex-col items-center px-2 text-center',
              ]"
            >
              <div
                v-if="index !== levelSteps.length - 1"
                class="text-error absolute top-[78px] left-[calc(50%+42px)] z-0 flex w-[calc(100%-84px)] justify-center"
              >
                <span class="icon-[tabler--arrow-big-right] size-7"></span>
              </div>

              <button
                class="border-error/20 text-error relative z-10 mt-2 flex size-16 items-center justify-center rounded-full border-2 shadow-[inset_0_0_0_8px_rgb(255_255_255_/_0.55)] transition"
                type="button"
              >
                <span :class="[step.icon, 'size-8']"></span>
              </button>

              <strong
                class="mt-3 text-xl leading-none font-black text-[var(--ofufu-black)]"
              >
                {{ step.level }}
              </strong>
              <span class="mt-2 text-sm text-neutral-700">
                {{ step.title }}
              </span>
              <!-- <button
                class="btn btn-sm border-error/25 text-error hover:bg-error mt-4 min-h-8 rounded-full bg-white px-4 text-xs font-black hover:text-white"
                type="button"
              >
                {{ step.action }}
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.study-mode-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
}

@media (min-width: 640px) {
  .study-mode-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .study-mode-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.study-mode-card {
  position: relative;
  min-height: 230px;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  text-align: center;
  box-shadow: 0 10px 24px rgb(23 23 23 / 0.04);
  transition: box-shadow 180ms ease;
}

.study-mode-card:hover {
  box-shadow: 0 10px 24px rgb(23 23 23 / 0.04);
}

.study-mode-card .card-body {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 26px 20px 18px;
}

.study-mode-title {
  margin-top: 18px;
  margin-bottom: 0;
  justify-content: center;
  color: #171717;
  font-size: 1.05rem;
  font-weight: 900;
}

.study-mode-text {
  margin-top: 14px;
  margin-bottom: 0;
  color: rgb(82 82 82);
  font-size: 0.86rem;
  font-weight: 650;
  line-height: 1.65;
}

.study-mode-icon {
  width: 58px;
  height: 58px;
}

.study-mode-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 0.68);
  opacity: 0;
  transition: opacity 180ms ease;
}

.study-mode-card:hover .study-mode-overlay,
.study-mode-card:focus-within .study-mode-overlay {
  opacity: 1;
}

.study-mode-action {
  min-height: 40px;
  height: 40px;
  padding-inline: 22px;
  font-size: 0.82rem;
  font-weight: 800;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

@media (max-width: 767px) {
  .study-mode-grid {
    gap: 12px;
  }

  .study-mode-card {
    display: flex;
    flex-direction: column;
    min-height: 230px;
  }

  .study-mode-card .card-body {
    flex: 1;
    min-height: auto;
    padding: 22px 14px 14px;
  }

  .study-mode-title {
    margin-top: 14px;
    font-size: 0.98rem;
  }

  .study-mode-text {
    font-size: 0.78rem;
  }

  .study-mode-icon {
    width: 48px;
    height: 48px;
  }

  .study-mode-overlay {
    position: static;
    inset: auto;
    padding: 0 14px 16px;
    background: transparent;
    opacity: 1;
  }

  .study-mode-action {
    width: 100%;
    min-height: 36px;
    height: 36px;
    padding-inline: 10px;
    font-size: 0.76rem;
  }
}
</style>
