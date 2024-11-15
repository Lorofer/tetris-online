<script setup lang="ts">
import DefaultHeader from '@/components/DefaultHeader.vue'
import MainMenu from "@/components/MainMenu.vue";
import SignUpPopup from "@/components/SignUpPopup.vue";

import {useTemplateRef} from "vue";

const popup = useTemplateRef<InstanceType<typeof SignUpPopup>>('sing-up-popup');

function openSignUpPopup(){
  popup.value?.open();
}
</script>

<template>
  <DefaultHeader/>
  <main>
    <SignUpPopup ref="sing-up-popup"/>
    <MainMenu @open-popup="openSignUpPopup"/>
  </main>
</template>

<style scoped lang="scss">
main{
  position: relative;
  display: grid;
  place-items: center;
}
</style>
