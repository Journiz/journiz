import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JourneysView from '~/views/JourneysView.vue'
import CommunityView from '~/views/CommunityView.vue'
import ProfilView from '~/views/ProfilView.vue'
import SettingsView from '~/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/parcours',
      name: 'journeys',
      component: JourneysView,
    },
    {
      path: '/communauté',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/parametres',
      name: 'setting',
      component: SettingsView,
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
    },
  ],
})

export default router
