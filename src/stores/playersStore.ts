import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const usePlayersStore = defineStore('players', () => {
    const playersObj = ref([]);

    const onlinePlayers =
        computed(() => playersObj.value.filter(player => player['status'] != "offline"));

    (async function getData() {
        let resp = await fetch('http://localhost:3000/players');
        playersObj.value = await resp.json();
    })();

    return {onlinePlayers}
});