import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import UserChat from '../views/UserChat.vue'
import Login from '../views/user/Login.vue'
import UserTabs from '../views/user/UserTabs.vue'
import { useUserStore } from '../stores/user'
import JoinTrip from '../views/team/JoinTrip.vue'
import CreateTeam from '../views/team/CreateTeam.vue'
import { useTripStore } from '../stores/team/trip'
import JoinTeam from '../views/team/JoinTeam.vue'
import PocGeolocation from '~/views/PocGeolocation.vue'
import Notif from '~/views/Notif.vue'

const redirectIfLoggedIn = () => {
  if (useUserStore().isLoggedIn()) {
    return { name: 'user-home' }
  }
}

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
      beforeEnter: redirectIfLoggedIn,
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
    {
      path: '/user-login',
      name: 'user-login',
      component: Login,
      beforeEnter: redirectIfLoggedIn,
    },
    {
      path: '/user/',
      component: UserTabs,
      beforeEnter: () => {
        if (!useUserStore().isLoggedIn()) {
          return { name: 'user-login' }
        }
      },
      children: [
        {
          path: '',
          redirect: 'home',
        },
        {
          path: 'home',
          name: 'user-home',
          component: () => import('~/views/user/TabHome.vue'),
        },
        {
          path: 'tab2',
          component: () => import('~/views/user/TabHome.vue'),
        },
        {
          path: 'tab3',
          component: () => import('~/views/user/TabHome.vue'),
        },
      ],
    },
    {
      path: '/join-trip',
      name: 'join-trip',
      component: JoinTrip,
    },
    {
      path: '/join',
      redirect: () => {
        const store = useTripStore()
        if (store.trip?.status === 'pairing') {
          return { name: 'create-team' }
        }
        if (store.trip?.status === 'playing') {
          return { name: 'join-team' }
        }
        console.log(store.trip)
        return { name: 'join-trip' }
      },
    },
    {
      path: '/create-team',
      name: 'create-team',
      component: CreateTeam,
      beforeEnter: () => {
        const store = useTripStore()
        if (!store.trip) {
          return { name: 'join-trip' }
        }
        // When playing, we no longer allow to create teams
        if (store.trip?.status === 'playing') {
          return { name: 'join-team' }
        }
      },
    },
    {
      path: '/join-team',
      name: 'join-team',
      component: JoinTeam,
      beforeEnter: (to) => {
        const store = useTripStore()
        if (!store.trip) {
          return { name: 'join-trip' }
        }
      },
    },
  ],
})

export default router
