import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '~/views/dashboard/DashboardView.vue'
import { useUserStore } from '~/stores/user'
import { pinia } from '~/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('~/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: () => {
        const store = useUserStore(pinia)
        if (store.isLoggedIn()) {
          return '/dashboard'
        }
      },
      component: () => import('~/views/auth/LoginView.vue'),
    },
    {
      path: '/tmp',
      name: 'tmp',
      component: () => import('~/views/TestDrawSafeZoneView.vue'),
    },
    {
      path: '/new-password',
      name: 'ResetPassword',
      component: () => import('~/views/FormForgotPasswordView.vue'),
      props: true,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: () => {
        const store = useUserStore(pinia)
        if (!store.isLoggedIn()) {
          return '/login'
        }
      },
      children: [
        {
          path: '',
          name: 'dashboard-index',
          redirect: '/dashboard/parcours',
        },
        {
          path: 'parcours',
          name: 'journeys',
          component: () =>
            import('~/views/dashboard/journey/JourneysListView.vue'),
        },
        {
          path: 'communaute',
          name: 'community',
          component: () => import('~/views/dashboard/CommunityView.vue'),
        },
        {
          path: 'communaute/detail',
          name: 'communityDetail',
          component: () => import('~/views/dashboard/CommunityDetailView.vue'),
        },
        {
          path: 'parametres',
          name: 'setting',
          component: () => import('~/views/dashboard/SettingsView.vue'),
        },
        {
          path: 'profil',
          name: 'user-profile',
          component: () => import('~/views/ProfileView.vue'),
        },
        {
          path: 'parcours/creation',
          name: 'create',
          component: () =>
            import('~/views/dashboard/journey/CreateJourneyView.vue'),
        },
        {
          path: 'parcours/:journeyId',
          name: 'single-journey',
          component: () =>
            import('~/views/dashboard/journey/SingleJourneyView.vue'),
          children: [
            {
              name: 'edit-journey',
              path: '',
              component: () =>
                import('~/views/dashboard/journey/JourneyEditorView.vue'),
            },
            {
              name: 'basecamp-journey',
              path: 'depart',
              component: () =>
                import('~/views/dashboard/journey/JourneyBasecampView.vue'),
            },
            {
              name: 'export-journey',
              path: 'export',
              component: () =>
                import('~/views/dashboard/journey/JourneyExportView.vue'),
            },
            {
              name: 'preview-journey',
              path: 'apercu',
              component: () =>
                import('~/views/dashboard/journey/JourneyPreviewView.vue'),
            },
            {
              path: 'point/:pointId',
              name: 'edit-point',
              component: () =>
                import('~/views/dashboard/journey/point/PointEditView.vue'),
            },
          ],
        },
        {
          path: 'sorties',
          name: 'trips-list',
          component: () => import('~/views/dashboard/trip/TripsListView.vue'),
        },
        {
          path: 'sorties/:tripId',
          name: 'trip-settings',
          component: () =>
            import('~/views/dashboard/trip/TripSettingsView.vue'),
        },
        {
          path: 'sorties/podium/:tripId',
          name: 'trip-podium',
          component: () => import('~/views/dashboard/trip/TripPodiumView.vue'),
        },
      ],
    },
  ],
})

export default router
