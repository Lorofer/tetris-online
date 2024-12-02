<script setup lang="ts">
import {onMounted} from "vue";

import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore();

onMounted(() => {
  if(!localStorage.getItem('token')){
    userStore.isAuthorisation = false;
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
