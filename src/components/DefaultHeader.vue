<script setup lang="ts">
import Logo from '@/components/Logo.vue'
</script>

<template>
<header>
  <RouterLink class="logo" to="/">
    <Logo></Logo>
  </RouterLink>
</header>
</template>

<style scoped lang="scss">
@import "@/assets/base";
header{
  width: 100%;
  height: 100px;
  border-bottom: 2px $separator-grey solid;

  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-height: 960px){
  header{
    height: 80px;
  }
}
</style>
