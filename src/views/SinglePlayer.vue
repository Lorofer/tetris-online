<script setup>
import SinglePlayerField from "@/components/SinglePlayerField.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
</script>

<template>
  <DefaultHeader/>
  <main>
    <SinglePlayerField/>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  place-items: center;
}
</style>
