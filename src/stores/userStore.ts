import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useApiStore} from "@/stores/apiStore";

export const useUserStore = defineStore('user', () => {
    const apiStore = useApiStore();

    const isAuthorisation = ref(true);

    const nickname = ref('');
    const email = ref('');
    const password = ref('');

    async function signUp(){
        try {
            let resp = await fetch(`${apiStore.api}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nickname": nickname.value,
                    "email": email.value,
                    "password": password.value
                })
            });
            if(!resp.ok){
                throw new Error('Bad Request');
            }
            let obj = await resp.json();
            localStorage.setItem("token", await obj['accessToken']);
        } catch (err) {
            throw err;
        }
    }

    async function signIn(){
        try{
            let resp = await fetch(`${apiStore.api}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value
                })
            });
            if(!resp.ok){
                throw new Error('Bad Request');
            }
            let obj = await resp.json();
            localStorage.setItem("token", await obj['accessToken']);
        } catch(err) {
            throw err;
        }
    }

    return {nickname, email, password, signIn, signUp};
});