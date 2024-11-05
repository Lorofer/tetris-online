<script setup lang="ts">

import DefaultHeader from "@/components/DefaultHeader.vue";
import OnlinePlayers from "@/components/OnlinePlayers.vue";
</script>

<template>
  <DefaultHeader/>
  <main>
    <OnlinePlayers/>
  </main>
</template>

<style scoped lang="scss">
main{
  display: grid;
  place-items: center;
}
</style>
