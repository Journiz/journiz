import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GeoTrackView from '~/views/GeoTrackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/geotrack',
      name: 'geotrack',
      component: GeoTrackView,
    },
  ],
})

export default router
