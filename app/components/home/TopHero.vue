<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef] = emblaCarouselVue(
  {
    align: 'center',
    dragFree: true,
    loop: true,
  },
  [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })],
)

const wordCards = [
  {
    word: '映画',
    ruby: '<ruby>映<rt>えい</rt>画<rt>が</rt></ruby>',
    meaning: '電影',
    level: 'N5',
    note: '名詞',
  },
  {
    word: '約束',
    ruby: '<ruby>約<rt>やく</rt>束<rt>そく</rt></ruby>',
    meaning: '約定',
    level: 'N4',
    note: '名詞',
  },
  {
    word: '影響',
    ruby: '<ruby>影<rt>えい</rt>響<rt>きょう</rt></ruby>',
    meaning: '影響',
    level: 'N3',
    note: '名詞',
  },
  {
    word: '思いつく',
    ruby: '<ruby>思<rt>おも</rt></ruby>いつく',
    meaning: '想到',
    level: 'N3',
    note: '動詞',
  },
  {
    word: '支える',
    ruby: '<ruby>支<rt>ささ</rt></ruby>える',
    meaning: '支持、支撐',
    level: 'N3',
    note: '動詞',
  },
]
</script>

<template>
  <section class="hero-bg relative w-full overflow-hidden">
    <div
      class="relative z-10 mx-auto grid min-h-[560px] w-full max-w-[1280px] items-center px-4 py-8 sm:px-6 md:gap-10 md:py-12 lg:min-h-[640px] lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
    >
      <div class="max-w-full pt-4 text-center lg:text-left">
        <h1
          class="text-[2rem] leading-tight font-extrabold sm:text-5xl lg:text-[3.4rem]"
        >
          Ofufu日文學習網
          <br />
          語言能力
          <span class="text-error">UPUP !</span>
        </h1>
        <p
          class="mx-auto mt-7 max-w-lg text-base leading-8 font-semibold text-neutral-600 lg:mx-0 lg:text-lg"
        >
          透過各式有趣的教材，
          <br class="md:hidden" />
          讓學習日文的過程中充滿樂趣。
          <br />
          從最適合自己的程度開始，
          <br class="md:hidden" />
          今天就開始你的日文學習之旅吧！
        </p>
      </div>

      <div class="hero-vocab-carousel-wrap">
        <div ref="emblaRef" class="hero-embla">
          <div class="hero-embla__container">
            <div
              v-for="card in wordCards"
              :key="card.word"
              class="hero-embla__slide"
            >
              <article class="hero-word-card">
                <div class="flex items-start justify-between gap-3">
                  <div class="space-x-2">
                    <span class="badge badge-primary">{{ card.level }}</span>
                    <span class="badge badge-error">
                      {{ card.note }}
                    </span>
                  </div>

                  <button
                    type="button"
                    class="word-favorite-btn"
                    :aria-label="`收藏 ${card.word}`"
                  >
                    <span class="icon-[tabler--heart-filled] size-5"></span>
                  </button>
                </div>

                <div class="mt-6">
                  <h3 class="word-title" v-html="card.ruby"></h3>
                  <p class="word-meaning">{{ card.meaning }}</p>
                </div>

                <div class="mt-auto flex justify-end">
                  <button
                    type="button"
                    class="btn btn-circle btn-text btn-sm text-neutral-500"
                    :aria-label="`播放 ${card.word} 讀音`"
                  >
                    <span class="icon-[tabler--volume] size-5"></span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-bg {
  background-color: #fff;
  background-image: url('/hero-bg3.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: auto 100%;
}

.hero-bg::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 150px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgb(255 255 255 / 0), #fff 82%);
  content: '';
}

.hero-vocab-carousel-wrap {
  display: flex;
  width: 100%;
  max-width: 520px;
  min-height: 250px;
  align-items: center;
  justify-self: center;
  padding: 18px 0;
}

.hero-embla {
  width: 100%;
  overflow: hidden;
  cursor: grab;
}

.hero-embla:active {
  cursor: grabbing;
}

.hero-embla__container {
  display: flex;
  align-items: center;
  min-height: 220px;
  touch-action: pan-y pinch-zoom;
}

.hero-embla__slide {
  min-width: 0;
  flex: 0 0 78%;
  padding: 10px 8px;
}

.hero-word-card {
  display: flex;
  width: 100%;
  aspect-ratio: 1 / 1;
  flex-direction: column;
  border: 1px solid rgb(229 229 229);
  border-radius: 8px;
  background: #fff;
  padding: 14px;
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.hero-word-card:hover {
  transform: translateY(-4px);
  border-color: rgb(198 27 41 / 0.26);
}

.word-favorite-btn {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(229 229 229);
  border-radius: 999px;
  background: white;
  color: rgb(163 163 163);
  box-shadow: 0 8px 20px rgb(23 23 23 / 0.08);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.word-favorite-btn:hover {
  transform: translateY(-1px) scale(1.06);
  border-color: rgb(198 27 41 / 0.35);
  background: var(--ofufu-red);
  color: white;
  box-shadow:
    0 0 0 6px rgb(198 27 41 / 0.12),
    0 12px 26px rgb(198 27 41 / 0.24);
}

.word-favorite-btn:focus-visible {
  outline: 3px solid rgb(198 27 41 / 0.2);
  outline-offset: 3px;
}

.word-title {
  margin-top: 4px;
  color: #171717;
  font-size: 1.7rem;
  font-weight: 900;
  line-height: 1.15;
}

.word-title :deep(ruby) {
  ruby-position: over;
}

.word-title :deep(rt) {
  color: var(--ofufu-blue);
  font-size: 0.42em;
  font-weight: 900;
  line-height: 1.4;
}

.word-meaning {
  margin-top: 6px;
  color: rgb(82 82 82);
  font-size: 0.82rem;
  font-weight: 800;
}

@media (min-width: 1024px) {
  .hero-bg {
    background-size: cover;
  }

  .hero-embla__slide {
    flex-basis: 50%;
    padding-inline: 8px;
  }
}

@media (max-width: 767px) {
  .hero-bg {
    background-position: left top;
    background-size: cover;
  }

  .hero-vocab-carousel-wrap {
    width: calc(100vw - 32px);
    max-width: 360px;
    min-height: 230px;
    margin-inline: auto;
    padding-block: 12px;
  }

  .hero-embla__container {
    min-height: 210px;
  }

  .hero-embla__slide {
    flex-basis: 58%;
    padding-inline: 7px;
  }

  .hero-word-card {
    padding: 13px;
  }

  .word-title {
    font-size: 1.55rem;
  }
}
</style>
