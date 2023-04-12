import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/LoginView.vue'
import FormForgotPassword from '../views/FormForgotPassword.vue'
import NewJourney from '../views/NewJourney.vue'
import ConfigJourney from '../views/ConfigJourney.vue'
import JourneysView from '~/views/JourneysView.vue'
import CommunityView from '~/views/CommunityView.vue'
import ProfilView from '~/views/ProfilView.vue'
import SettingsView from '~/views/SettingsView.vue'
import DashboardView from '~/views/DashboardView.vue'
import CreateJourney from '~/views/CreateJourney.vue'
import JourneyCreationBasicInfos from '~/views/JourneyCreationBasicInfos.vue'
import JourneyChooseModel from '~/views/JourneyChooseModel.vue'
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
      component: () => import('~/views/LoginView.vue'),
    },
    {
      path: '/new-password',
      name: 'ResetPassword',
      component: FormForgotPassword,
      props: true,
    },
    {
      path: '/new-journey',
      name: 'NewJourney',
      component: NewJourney,
    },
    {
      path: '/journey',
      name: 'ConfigJourney',
      component: ConfigJourney,
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
          redirect: '/dashboard/parcours',
        },
        {
          path: 'parcours',
          name: 'journeys',
          component: JourneysView,
        },
        {
          path: 'communaute',
          name: 'community',
          component: CommunityView,
        },
        {
          path: 'parametres',
          name: 'setting',
          component: SettingsView,
        },
        {
          path: 'profil',
          name: 'profil',
          component: ProfilView,
        },
        {
          path: 'creation',
          name: 'create',
          component: CreateJourney,
          children: [
            {
              path: 'informations',
              name: 'basic-infos',
              component: JourneyCreationBasicInfos,
            },
            {
              path: 'modele',
              name: 'model',
              component: JourneyChooseModel,
            },
          ],
        },
      ],
    },
  ],
})

export default router
