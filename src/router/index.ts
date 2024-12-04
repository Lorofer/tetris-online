import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Pvp from '../views/Pvp.vue'
import SignUp from '../views/SignUp.vue'
import SinglePlayer from "@/views/SinglePlayer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
      props: true
    },
    {
      path: '/pvp',
      name: 'pvp',
      component: Pvp
    },
    {
      path: '/single-player',
      name: 'single-player',
      component: SinglePlayer
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
  ]
})

export default router
