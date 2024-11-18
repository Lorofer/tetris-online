import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useApiStore = defineStore('api', () => {
    const api = ref('http://localhost:3000/');
    const token = ref('');

    return {api, token};
});