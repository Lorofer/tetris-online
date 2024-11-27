<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import router from "@/router";

import {usePopupsStore} from "@/stores/popupsStore";
import {useUserStore} from "@/stores/userStore";
const popupsStore = usePopupsStore();
const userStore = useUserStore();

const nickname = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const isPasswordsMatch = ref(true);

async function signUp(event: Event){
  event.preventDefault();

  if (password.value === passwordConfirmation.value) {
    try {
      userStore.nickname = nickname.value;
      userStore.email = email.value;
      userStore.password = password.value;

      await userStore.signUp();
      await router.push({path: '/'});
    } catch (err) {
      alert('Не удалось зарегистрироваться. Повторите попытку');
      console.error(err);
    }
  } else {
    isPasswordsMatch.value = false;
  }
}

const isPasswordHidden = ref(true);
const signUpForm = useTemplateRef<HTMLFormElement>('sign-up-form');
function switchPasswordVisibility(event: Event) {
  event.stopPropagation();
  isPasswordHidden.value = !isPasswordHidden.value;

  let inputs = signUpForm.value?.querySelectorAll('.password-input');
  inputs?.forEach(input => {
    switch (isPasswordHidden.value) {
      case true:
        input.setAttribute('type', 'password');
        break;
      default:
        input.setAttribute('type', 'text');
    }
  })
}
</script>

<template>
  <div class="sign-up-form-container">
    <form ref="sign-up-form" id="sign-in-form" @submit="signUp" class="sign-up-form">
      <input
          class="sign-up-form-input" placeholder="Ник"
          type="text" v-model.trim="nickname" required
      >
      <input
          class="sign-up-form-input" placeholder="Email"
          type="email" v-model.trim="email" required
      >
      <div class="password-input-container">
        <img
            v-if="!isPasswordHidden" @click="switchPasswordVisibility"
            class="hide password-icon" src="@/../public/hide.png" alt=""
        >
        <img
            v-else @click="switchPasswordVisibility"
            class="show password-icon" src="@/../public/show.png" alt=""
        >
        <input
            :class="[{'error-input': !isPasswordsMatch}, 'sign-up-form-input password-input']"
            placeholder="Пароль" @input="isPasswordsMatch = true"
            ref="sign-up-password-input"
            type="password" v-model.trim="password" required
        >
      </div>
      <div class="password-input-container">
        <img
            v-if="!isPasswordHidden" @click="switchPasswordVisibility"
            class="hide password-icon" src="@/../public/hide.png" alt=""
        >
        <img
            v-else @click="switchPasswordVisibility"
            class="show password-icon" src="@/../public/show.png" alt=""
        >
        <label
            v-if="!isPasswordsMatch"
            for="confirm-password-input"
            class="confirm-password-label"
        >Пароли не совпадают</label>
        <input
            :class="[{'error-input': !isPasswordsMatch}, 'sign-up-form-input password-input']"
            placeholder="Подтверждение пароля" @input="isPasswordsMatch = true"
            id="confirm-password-input" ref="sign-up-password-input"
            type="password" v-model.trim="passwordConfirmation" required
        >
      </div>

      <RouterLink to="/" @click="popupsStore.signInPopupIsOpen = true">
        Уже зарегистрированы?
      </RouterLink>

      <input
          class="sign-up-form-button" value="Регистрация"
          type="submit" form="sign-in-form"
      >
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

.sign-up-form-container {
  width: 480px;

  background-color: $bg-beige;
  padding: 48px;
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
  .sign-up-form-input {
    @include input;
  }

  .sign-up-form-input.error-input {
    @include input;
    border-color: rgba(255, 0, 0, 0.4);
    background-color: rgba(255, 0, 0, 0.03);
  }

  > *:not(:first-child) {
    margin-top: 32px;
  }
}

.password-input-container {
  position: relative;
}

.password-icon {
  height: 26px;
  cursor: pointer;
  opacity: 0.6;

  position: absolute;
  right: 17px;
  top: 50%;
  transform: translate(0, -50%);
}

.confirm-password-label {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translate(-50%, 0);
  color: red;
}

.sign-up-form-button{
  @include menu-button;
  background-color: $bg-blue;
  color: $text-blue;
}
</style>