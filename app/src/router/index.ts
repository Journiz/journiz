import { createRouter, createWebHistory } from '@ionic/vue-router'
import { Trip } from '@journiz/api-types'
import { useUserStore } from '~/stores/user'
import { useTeamStore } from '~/stores/team/team'
import { pinia } from '~/main'

const redirectIfLoggedIn = () => {
  if (useUserStore(pinia).isLoggedIn()) {
    return { name: 'user-trip-tabs' }
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

const teamGuard = () => {
  const store = useTeamStore(pinia)
  if (!store.team) {
    return { name: 'join-trip' }
  }
}

const teamPhaseRedirects = {
  pairing: 'team-waiting',
  playing: 'team',
  finishing: 'team',
  finished: 'team-podium',
}
const teamPhaseGuard = (allowedPhases: Trip['status'][]) => {
  return () => {
    const store = useTeamStore(pinia)
    if (store.trip?.status && !allowedPhases.includes(store.trip.status)) {
      return { name: teamPhaseRedirects[store.trip.status] }
    }
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
      path: '/user/trip-recap',
      component: () => import('~/views/user/TripRecapView.vue'),
      name: 'user-trip-recap',
      beforeEnter: [redirectIfNotLoggedIn],
    },
    {
      path: '/user/trip',
      name: 'user-trip-tabs',
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
    },
    {
      path: '/user/trip/validate/:teamId',
      name: 'user-trip-validate-team',
      component: () => import('~/views/user/validation/ValidateTeamView.vue'),
      beforeEnter: [redirectIfNotLoggedIn],
    },
    {
      path: '/user/trip/chat/:conversationId',
      name: 'user-chat-conversation',
      component: () => import('~/views/user/chat/ConversationView.vue'),
    },

    /**
     * Join for teams
     */
    {
      path: '/join',
      name: 'join',
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
      path: '/team/waiting',
      name: 'team-waiting',
      component: () => import('~/views/team/TeamWaitingView.vue'),
      beforeEnter: [teamGuard, teamPhaseGuard(['pairing'])],
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('~/views/team/TeamHomeView.vue'),
      beforeEnter: [teamGuard, teamPhaseGuard(['playing', 'finishing'])],
    },
    {
      path: '/team/chat',
      name: 'team-chat',
      component: () => import('~/views/team/TeamChatView.vue'),
      beforeEnter: [teamGuard],
    },
    {
      path: '/team/customize',
      name: 'team-customize',
      component: () => import('~/views/team/TeamCustomizeView.vue'),
      beforeEnter: [teamGuard, teamPhaseGuard(['pairing'])],
    },
    {
      path: '/team/point/:pointId',
      name: 'team-point',
      component: () => import('~/views/team/TeamPointView.vue'),
      beforeEnter: [teamGuard, teamPhaseGuard(['playing'])],
    },
    {
      path: '/notification/chat/:conversationId',
      name: 'chat-notif',
      redirect: (to) => {
        if (useUserStore(pinia).isLoggedIn() && to.params.conversationId) {
          return `/user/trip/chat/${to.params.conversationId}`
        }
        return {
          name: 'team-chat',
        }
      },
    },
  ],
})

export default router
