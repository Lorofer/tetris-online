<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore();

function foo(){
  alert('a');
}
</script>

<template>
<div class="menu-container">
  <RouterLink class="main-menu-button" to="/pvp">Играть 1 vs 1</RouterLink>
  <RouterLink class="main-menu-button" to="/single-player">Одиночная игра</RouterLink>
  <span class="separator"></span>
  <button
      v-if="!userStore.isAuthorisation" @click="$emit('open-popup')"
      class="main-menu-button">Войти</button>
  <button
      v-else @click="foo"
      class="main-menu-button">Профиль</button>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

.menu-container{
  width: 352px;
  height: 384px;

  background-color: $bg-beige;
  padding: 48px;
  border-radius: 24px;
}
.main-menu-button{
  @include menu-button;
  background-color: $bg-blue;
  color: $text-blue;
}
.main-menu-button:first-child{
  background-color: $bg-orange;
  color: $text-beige;
  font-weight: 300;
}
.separator{
  @include separator;
  background-color: $bg-blue;
}
.menu-container > *:not(:first-child){
  margin-top: 48px;
}
</style>