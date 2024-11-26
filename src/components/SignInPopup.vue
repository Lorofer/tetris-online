<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import {useRouter} from 'vue-router'
import Backdrop from "@/components/Backdrop.vue";

import {usePopupsStore} from "@/stores/popupsStore";
import {useUserStore} from "@/stores/userStore";
const popupsStore = usePopupsStore();
const userStore = useUserStore();

function open() {
  popupsStore.signInPopupIsOpen = true;
}
defineExpose({open});

const startClosing = ref(false);
const successful = ref(true);
async function close() {
  startClosing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 350));
  startClosing.value = popupsStore.signInPopupIsOpen = false;
  successful.value = true;
}

const router = useRouter();
async function pushToSignUp() {
  await close();
  await router.push({path: '/sign-up'});
}

const email = ref('');
const password = ref('');
async function signIn(event: Event) {
  event.preventDefault();

  try {
    userStore.email = email.value;
    userStore.password = password.value;
    await userStore.signIn();
    await close();
  } catch (err) {
    successful.value = false;
  }
}

const isPasswordHidden = ref(true);
const passwordInput = useTemplateRef<HTMLInputElement>('sign-in-password-input');
function switchPasswordVisibility(event: Event) {
  event.stopPropagation();
  isPasswordHidden.value = !isPasswordHidden.value;

  switch (isPasswordHidden.value) {
    case true:
      passwordInput.value?.setAttribute('type', 'password');
      break;
    default:
      passwordInput.value?.setAttribute('type', 'text');
  }
}
</script>

<template>
  <Backdrop v-if="popupsStore.signInPopupIsOpen" @close-popup="close"/>
  <div class="popup-container" v-if="popupsStore.signInPopupIsOpen">
    <form @submit="signIn" :class="[{'closing': startClosing}, 'popup-form']" id="sign-in-form">
      <input
          @input="successful = true"
          :class="[{'error': !successful}, 'sign-in-input']"
          v-model.trim="email" placeholder="Email" type="email" required
      >
      <div class="password-input-container">
        <img
            v-if="isPasswordHidden" @click="switchPasswordVisibility"
            class="hide password-icon" src="@/../public/hide.png" alt=""
        >
        <img
            v-else @click="switchPasswordVisibility"
            class="show password-icon" src="@/../public/show.png" alt=""
        >
        <input
            @input="successful = true" ref="sign-in-password-input"
            :class="[{'error': !successful}, 'sign-in-input', 'sign-in-password-input']"
            v-model.trim="password" placeholder="Пароль" type="password" required
        >
      </div>

      <span v-if="successful" class="separator"></span>
      <p v-else class="text-separator">Неправильный email или пароль</p>

      <div class="links">
        <input class="sign-in-button" type="submit" value="Войти" form="sign-in-form">
        <div class="text-container">
          <p>Если у вас нет аккаунта</p>
          <a @click="pushToSignUp">Создать аккаунт</a>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

@keyframes open {
  from {
    transform: translate(0, -30%) rotateX(45deg);
    opacity: 0;
  }
  to {
    transform: translate(0, 0) rotateX(0);
  }
}

@keyframes close {
  from {
    transform: translate(0, 0) rotateX(0);
    opacity: 1;
  }
  to {
    transform: translate(0, -30%) rotateX(45deg);
  }
}

.popup-container {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 352px;
  height: 448px;
  perspective: 800px;
}

.popup-form {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $bg-beige;
  border-radius: 24px;
  padding: 48px;
  text-align: center;

  animation: open 0.35s ease-in-out;

  > *:not(:first-child) {
    margin-top: 48px;
  }
}

.closing {
  animation: close 0.35s ease-in-out;
  opacity: 0;
}

.sign-in-input {
  @include input;
}

.sign-in-input::placeholder {
  font-size: 20px;
}

.password-input-container {
  position: relative;
}

.sign-in-password-input {
  padding: 12px 50px 12px 17px;
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

.error {
  border-color: rgba(255, 0, 0, 0.4);
  background-color: rgba(255, 0, 0, 0.03);
}

.separator {
  @include separator;
  background-color: $separator-grey;
}

.text-separator {
  display: block;
  position: relative;
  height: 2px;
  line-height: 2px;
  color: $text-grey;
}

.links {
  height: 112px;
  background-color: #fff;
  border-radius: 16px;

  .sign-in-button {
    @include menu-button;
    background-color: $bg-blue;
    color: $text-blue;
  }

  .text-container {
    margin: 9px 0;
    text-align: center;

    a {
      color: $text-blue;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>