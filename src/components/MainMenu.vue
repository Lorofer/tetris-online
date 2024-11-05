<template>
<div class="menu-container">
  <RouterLink class="button" to="/pvp">Играть 1 vs 1</RouterLink>
  <RouterLink class="button" to="/single-player">Одиночная игра</RouterLink>
  <span class="separator"></span>
  <button class="button">Войти</button>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/base.scss";
.menu-container{
  width: 352px;
  height: 384px;

  background-color: $bg-beige;
  padding: 48px;
  border-radius: 24px;
}
.button{
  width: 256px;
  height: 48px;
  border-radius: 16px;
  background-color: $bg-blue;

  color: $text-blue;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}
.button:first-child{
  background-color: $bg-orange;
  color: $text-beige;
  font-weight: 300;
}
.separator{
  width: 256px;
  height: 2px;
  display: block;
  background-color: $bg-blue;
}
.menu-container > *:not(:first-child){
  margin-top: 48px;
}
</style>