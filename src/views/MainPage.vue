<script setup lang="ts">
import DefaultHeader from '@/components/DefaultHeader.vue'
import MainMenu from "@/components/MainMenu.vue";
</script>

<template>
  <DefaultHeader />
  <main>
    <MainMenu />
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/base.scss";
main{
  height: calc(100vh - $header-height);
  display: grid;
  place-items: center;
}
</style>
