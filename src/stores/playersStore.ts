import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useApiStore} from "@/stores/apiStore";

export const usePlayersStore = defineStore('players', () => {
    const apiStore = useApiStore();

    const playersObj = ref([]);

    (async function getData() {
        let resp = await fetch(`${apiStore.api}users?status_ne=offline`);
        playersObj.value = await resp.json();
    })();

    return {playersObj}
});