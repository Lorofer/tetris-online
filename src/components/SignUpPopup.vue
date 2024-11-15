<script setup lang="ts">
import {ref} from "vue";
import Backdrop from "@/components/Backdrop.vue";

const isOpen = ref(false);
const startClosing = ref(false);

function open() {
  isOpen.value = true;
}

async function close() {
  startClosing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 350));
  startClosing.value = false;
  isOpen.value = false;
}

defineExpose({open});
</script>

<template>
  <Backdrop v-if="isOpen" @close-popup="close"/>
  <div class="popup-container" v-if="isOpen">
    <div :class="[{'closing': startClosing}, 'popup']">
      <form>
        <input class="sign-up-input" placeholder="Ник или email">
        <input class="sign-up-input" placeholder="Пароль">
      </form>
      <span class="separator"></span>
      <div class="links">
        <button>Войти</button>
        <div class="text-container">
          <p>Если у вас нет аккаунта</p>
          <a href="">Создать аккаунт</a>
        </div>
      </div>
    </div>
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

.popup {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $bg-beige;
  border-radius: 24px;
  padding: 48px;

  animation: open 0.35s ease-in-out;

  > *:not(:first-child) {
    margin-top: 48px;
  }

  form > *:not(:first-child) {
    margin-top: 48px;
  }
}

.closing {
  animation: close 0.35s ease-in-out;
  opacity: 0;
}

.sign-up-input {
  width: 100%;
  height: 48px;
  border-radius: 16px;
  border: 1px solid $separator-grey;
  padding: 12px 17px;
  font-size: 20px;
}

.sign-up-input::placeholder {
  font-size: 20px;
}

.separator {
  @include separator;
  background-color: $separator-grey;
}

.links {
  height: 112px;
  background-color: #fff;
  border-radius: 16px;

  button {
    @include menu-button;
    background-color: $bg-blue;
    color: $text-blue;
  }

  .text-container {
    margin: 9px 0;
    text-align: center;
  }
}
</style>