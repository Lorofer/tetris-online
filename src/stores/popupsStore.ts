import {ref} from 'vue'
import {defineStore} from 'pinia'

export const usePopupsStore = defineStore('popups', () => {
    const signInPopupIsOpen = ref(false);

    return {signInPopupIsOpen};
});