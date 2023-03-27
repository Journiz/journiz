import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import UserChat from '../views/UserChat.vue'
import PocGeolocation from '~/views/PocGeolocation.vue'
import Notif from '~/views/Notif.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/geolocation',
      name: 'geolocation',
      component: PocGeolocation,
    },
    {
      path: '/notif',
      name: 'notif',
      component: Notif,
    },
    {
      path: '/user-chat',
      name: 'user-chat',
      component: UserChat,
    },
  ],
})

export default router
