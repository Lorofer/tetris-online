<script setup lang="ts">
import { usePlayersStore } from "@/stores/playersStore"
const playersStore = usePlayersStore();

async function foo(){}
</script>

<template>
<div class="online-players-container">
  <div class="online-players-header">
    <img src="../../public/online-players.svg" alt="">
    <p>Игроки онлайн</p>
  </div>
  <ul class="online-players-list">
    <li class="online-players-list-item" v-for="player in playersStore.playersObj">
      <p class="online-players-list-nickname">{{ player['nickname'] }}</p>
      <button
          :class="[
              'online-players-list-btn',
              {
                'online': player['status'] == 'online',
                'playing': player['status'] == 'playing'
              }
          ]"
          v-on="player['status'] == 'online' ? {'click': foo} : {}"
      >
        {{ player['status'] == 'online' ? 'Пригласить' : 'Играет' }}
      </button>
    </li>
  </ul>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

.online-players-container {
  width: 522px;
  height: 608px;
  background-color: $bg-beige;
  border-radius: 24px;
  padding: 32px;

  @media screen and (max-height: 960px){
    height: 550px;
  }
}

.online-players-header {
  display: flex;
  justify-content: center;

  p {
    font-size: 28px;
    margin-left: 16px;
  }
}

::-webkit-scrollbar{
  background: rgba(0, 0, 0, 0);
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: $light-grey;
  border-radius: 2px;
}
.online-players-list {
  padding: 0 16px;
  margin: 32px 16px;
  max-height: calc(100% - 98px);
  overflow-y: scroll;

  .online-players-list-item {
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    .online-players-list-btn{
      width: 128px;
      height: 24px;
      border-radius: 4px;
      font-size: 16px;
    }
    .online-players-list-btn.online{
      background-color: $bg-blue;
      color: $text-blue;
      cursor: pointer;
    }
    .online-players-list-btn.playing{
      background-color: $bg-grey;
      color: $text-grey;
    }
  }
  .online-players-list-item:not(:first-child) {
    margin-top: 24px;
  }
}
</style>