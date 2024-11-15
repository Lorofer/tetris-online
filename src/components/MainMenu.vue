<template>
<div class="menu-container">
  <RouterLink class="button" to="/pvp">Играть 1 vs 1</RouterLink>
  <RouterLink class="button" to="/single-player">Одиночная игра</RouterLink>
  <span class="separator"></span>
  <button class="button" @click="$emit('open-popup')">Войти</button>
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
.button{
  @include menu-button;
  background-color: $bg-blue;
  color: $text-blue;
}
.button:first-child{
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