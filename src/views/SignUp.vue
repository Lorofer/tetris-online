<script setup lang="ts">
import DefaultHeader from "@/components/DefaultHeader.vue";
import SignUpForm from "@/components/SignUpForm.vue";
</script>

<template>
  <DefaultHeader/>
  <main>
    <SignUpForm/>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  place-items: center;
}
</style>
