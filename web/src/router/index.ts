import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '../views/Auth.vue'
import FormForgotPassword from '../views/FormForgotPassword.vue'
import NewJourney from '../views/NewJourney.vue'
import ConfigJourney from '../views/ConfigJourney.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
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
  ],
})

export default router
