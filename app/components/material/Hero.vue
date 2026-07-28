<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="material-hero-bg relative w-full overflow-hidden">
    <div
      class="relative z-10 mx-auto grid min-h-[280px] w-full max-w-[1280px] items-end px-4 pt-8 pb-4 sm:px-6 sm:pb-[10px] md:gap-10 md:pt-12 lg:min-h-[340px] lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
    >
      <div class="max-w-full pt-4 text-center lg:text-left">
        <h1
          class="text-[2rem] leading-tight font-bold sm:text-5xl lg:text-[3.4rem]"
        >
          {{ title }}
        </h1>
        <p
          class="mx-auto mt-7 max-w-lg whitespace-pre-line text-base leading-8 font-semibold text-neutral-600 lg:mx-0 lg:text-lg"
        >
          {{ description }}
        </p>
      </div>

      <div class="hidden lg:block">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.material-hero-bg {
  background-color: #fff;
  background-image: url('/hero-bg3.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: auto 100%;
}

.material-hero-bg::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 150px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgb(255 255 255 / 0), #fff 82%);
  content: '';
}

@media (min-width: 1024px) {
  .material-hero-bg {
    background-size: cover;
  }
}

@media (max-width: 767px) {
  .material-hero-bg {
    background-position: left top;
    background-size: cover;
  }
}
</style>
