import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import UserChat from '../views/UserChat.vue'
import Login from '../views/user/Login.vue'
import UserTabs from '../views/user/UserTabs.vue'
import { useUserStore } from '../stores/user'
import JoinTrip from '../views/join/JoinTrip.vue'
import CreateTeam from '../views/join/CreateTeam.vue'
import JoinTeam from '../views/join/JoinTeam.vue'
import TeamHome from '../views/team/TeamHome.vue'
import { useTeamStore } from '../stores/team/team'
import PocGeolocation from '~/views/PocGeolocation.vue'
import Notif from '~/views/Notif.vue'

const redirectIfLoggedIn = () => {
  if (useUserStore().isLoggedIn()) {
    return { name: 'user-home' }
  }
  const teamStore = useTeamStore()
  if (teamStore.team) {
    return { name: 'team' }
  }
  if (teamStore.trip) {
    return { name: 'create-team' }
  }
}

/**
 * Arborescence
 * - Home -> Redirects to UserLogin if not logged in
 *
 * - UserLogin -> Redirects to UserLogin if not logged in
 * - User -> Redirects to UserLogin if not logged in
 *    - Tabs and all user routes
 * - Join -> Redirects to UserLogin if not logged in
 *    - Join Trip
 *    - Create Team
 *    - Join Team
 * - Team -> redirects to Join if not logged in a team
 *    - Tabs and all teams routes
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => redirectIfLoggedIn() ?? '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: redirectIfLoggedIn,
    },
    /**
     * UserLogin
     */
    {
      path: '/user-login',
      name: 'user-login',
      component: Login,
      beforeEnter: redirectIfLoggedIn,
    },
    /**
     * User
     */
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

    /**
     * Join for teams
     */
    {
      path: '/join',
      redirect: () => {
        // If team logged, redirect to team
        const store = useTeamStore()
        if (store.trip) {
          return { name: 'create-team' }
        }
        return { name: 'join-trip' }
      },
    },
    {
      path: '/join-trip',
      name: 'join-trip',
      component: JoinTrip,
    },
    {
      path: '/join/create-team',
      name: 'create-team',
      component: CreateTeam,
      beforeEnter: () => {
        const store = useTeamStore()
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
      path: '/join/join-team',
      name: 'join-team',
      component: JoinTeam,
      beforeEnter: () => {
        const store = useTeamStore()
        if (!store.trip) {
          return { name: 'join-trip' }
        }
      },
    },

    /**
     * Team Routes
     */
    {
      path: '/team',
      name: 'team',
      component: TeamHome,
      beforeEnter: () => {
        const store = useTeamStore()
        if (!store.team) {
          return { name: 'join' }
        }
      },
      children: [],
    },

    /**
     * POC Routes that will be deleted
     */
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
