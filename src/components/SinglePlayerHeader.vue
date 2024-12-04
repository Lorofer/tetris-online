<script setup lang="ts">
import Logo from "@/components/Logo.vue";

import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore();
</script>

<template>
<header>
  <div class="header-container">
    <RouterLink class="logo" to="/">
      <Logo></Logo>
    </RouterLink>
    <nav>
      кнопки
    </nav>
    <button
        v-if="!userStore.isAuthorisation" @click="$emit('open-popup')"
        class="header-button">Войти</button>
    <button
        v-else
        class="header-button">Профиль</button>
  </div>
</header>
</template>

<style scoped lang="scss">
@import "@/assets/base";

header {
  width: 100%;
  height: 100px;
  border-bottom: 2px $separator-grey solid;
}
.header-container {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-button{
  @include menu-button;
  width: 200px;
  background-color: $bg-blue;
  color: $text-blue;
}
</style>