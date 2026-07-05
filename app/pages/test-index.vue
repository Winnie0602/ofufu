<script setup lang="ts"></script>

<template>
  <div class="w-full bg-white text-neutral-950">
    <IndexTopHero />

    <main class="w-full">
      <IndexIntroduce />

      <IndexMaterials />

      <IndexTest />

      <IndexMemberBenefits />
    </main>
  </div>
</template>

<style scoped>
.method-item h3 {
  font-weight: 900;
}

.method-item p {
  margin-top: 6px;
  color: rgb(82 82 82);
  font-size: 0.85rem;
  font-weight: 650;
  line-height: 1.6;
}

.method-item {
  text-align: center;
}

.method-icon {
  margin-inline: auto;
  width: 50px;
  height: 50px;
  color: var(--ofufu-blue);
}

.method-item:nth-child(3) .method-icon,
.method-item:nth-child(5) .method-icon {
  color: var(--ofufu-red);
}
</style>
