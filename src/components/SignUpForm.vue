<script setup lang="ts">
import {ref} from "vue";

import {usePopupsStore} from "@/stores/popupsStore";
import {useUserStore} from "@/stores/userStore";
const popupsStore = usePopupsStore();
const userStore = useUserStore();

const nickname = ref('');
const email = ref('');
const password = ref('');

async function signUp(){
  try {
    userStore.nickname = nickname.value;
    userStore.email = email.value;
    userStore.password = password.value;
    await userStore.signUp();
  } catch (err) {
    alert('Не удалось зарегистрироаться. Повторите попытку');
    console.error(err);
  }
}
</script>

<template>
  <div class="sign-up-form-container">
    <form class="sign-up-form">
      <input type="text" v-model.trim="nickname" placeholder="Ник">
      <input type="text" v-model.trim="email" placeholder="Email">
      <input type="password" v-model.trim="password" placeholder="Пароль">
      <input type="password" placeholder="Подтверждение пароля">
    </form>
    <RouterLink to="/" @click="popupsStore.signInPopupIsOpen = true">
      Уже зарегистрированы?
    </RouterLink>
    <button type="button" @click="signUp" form="sign-in-form">Регистрация</button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

.sign-up-form-container {
  width: 522px;
  height: 580px;

  background-color: $bg-beige;
  padding: 64px;
  border-radius: 24px;
  text-align: center;
  a {
    color: $text-blue;
    display: inline-block;
    text-decoration: underline;
  }

  > *:not(:first-child) {
    margin-top: 48px;
  }
}

.sign-up-form {
  input {
    @include input;
  }

  > *:not(:first-child) {
    margin-top: 32px;
  }
}

button{
  @include menu-button;
  background-color: $bg-blue;
  color: $text-blue;
}
</style>

<!--{-->
<!--"nickname": "Gamer123",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "ShadowMaster",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "HappyPlayer",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "CoolDude",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "EpicGamer",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "NoobSlayer",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "StealthyNinja",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "DragonWarrior",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "PixelArtist",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "MightyWizard",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "QuestSeeker",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "SpaceCadet",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "Thund3rCat",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "SilentAssassin",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "TechGuru",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "FrostyKnight",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "SilentAssassin",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "TechGuru",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "FrostyKnight",-->
<!--"status": "online"-->
<!--},-->
<!--{-->
<!--"nickname": "SilentAssassin",-->
<!--"status": "playing"-->
<!--},-->
<!--{-->
<!--"nickname": "TechGuru",-->
<!--"status": "offline"-->
<!--},-->
<!--{-->
<!--"nickname": "FrostyKnight",-->
<!--"status": "online"-->
<!--}-->