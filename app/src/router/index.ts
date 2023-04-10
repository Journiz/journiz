import { createRouter, createWebHistory } from '@ionic/vue-router'
import { useUserStore } from '~/stores/user'
import { useTeamStore } from '~/stores/team/team'
import { pinia } from '~/main'

const redirectIfLoggedIn = () => {
  if (useUserStore(pinia).isLoggedIn()) {
    return { name: 'user-home' }
  }
  const teamStore = useTeamStore(pinia)
  if (teamStore.team) {
    return { name: 'team' }
  }
  if (teamStore.trip) {
    return { name: 'create-team' }
  }
}
const redirectIfNotLoggedIn = () => {
  if (!useUserStore(pinia).isLoggedIn()) {
    return { name: 'user-login' }
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
      component: () => import('~/views/HomeView.vue'),
      beforeEnter: redirectIfLoggedIn,
    },
    /**
     * UserLogin
     */
    {
      path: '/user-login',
      name: 'user-login',
      component: () => import('~/views/user/LoginView.vue'),
      beforeEnter: redirectIfLoggedIn,
    },
    /**
     * User
     */
    {
      path: '/user/',
      component: () => import('~/views/user/UserHomeView.vue'),
      name: 'user-pick-trip',
      beforeEnter: [redirectIfNotLoggedIn],
    },
    {
      path: '/user/trip',
      component: () => import('~/views/user/trip/TripTabsView.vue'),
      beforeEnter: [
        redirectIfNotLoggedIn,
        () => {
          const store = useUserStore(pinia)
          if (!store.trip) {
            return { name: 'user-pick-trip' }
          }
        },
      ],
      children: [
        {
          path: '',
          redirect: '/user/trip/home',
        },
        {
          path: 'home',
          name: 'user-home',
          component: () => import('~/views/user/trip/TabHomeView.vue'),
        },
        {
          path: 'tab2',
          component: () => import('~/views/user/trip/TabHomeView.vue'),
        },
        {
          path: 'chat',
          component: () => import('~/views/user/trip/TabChatView.vue'),
          children: [
            {
              path: '',
              component: () =>
                import('~/views/user/chat/ConversationsListView.vue'),
            },
            {
              path: ':conversationId',
              component: () => import('~/views/user/chat/ConversationView.vue'),
            },
          ],
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
        const store = useTeamStore(pinia)
        if (store.trip) {
          return { name: 'create-team' }
        }
        return { name: 'join-trip' }
      },
    },
    {
      path: '/join-trip',
      name: 'join-trip',
      component: () => import('~/views/join/JoinTripView.vue'),
    },
    {
      path: '/join/create-team',
      name: 'create-team',
      component: () => import('~/views/join/CreateTeamView.vue'),
      beforeEnter: () => {
        const store = useTeamStore(pinia)
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
      component: () => import('~/views/join/JoinTeamView.vue'),
      beforeEnter: () => {
        const store = useTeamStore(pinia)
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
      component: () => import('~/views/team/TeamHomeView.vue'),
      beforeEnter: () => {
        const store = useTeamStore(pinia)
        if (!store.team) {
          return { name: 'join-trip' }
        }
      },
      children: [],
    },
    {
      path: '/team/chat',
      name: 'team-chat',
      component: () => import('~/views/team/TeamChatView.vue'),
      beforeEnter: () => {
        const store = useTeamStore(pinia)
        if (!store.team) {
          return { name: 'join-trip' }
        }
      },
    },
    {
      path: '/notification/chat/:conversationId',
      name: 'chat-notif',
      redirect: (to) => {
        if (useUserStore(pinia).isLoggedIn() && to.params.conversationId) {
          return `/user/trip/chat/${to.params.conversationId}`
        }
        return '/team/chat'
      },
    },

    /**
     * POC Routes that will be deleted
     */
    {
      path: '/geolocation',
      name: 'geolocation',
      component: () => import('~/views/PocGeolocation.vue'),
    },
    {
      path: '/notif',
      name: 'notif',
      component: () => import('~/views/Notif.vue'),
    },
    {
      path: '/user-chat',
      name: 'user-chat',
      component: () => import('~/views/UserChat.vue'),
    },
  ],
})

export default router
