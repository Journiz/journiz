import { createRouter, createWebHistory } from 'vue-router'
import { usePocketBase } from '@journiz/composables'
import HomeView from '../views/HomeView.vue'
import Auth from '../views/Auth.vue'
import FormForgotPassword from '../views/FormForgotPassword.vue'

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
      name: 'Reset password',
      component: FormForgotPassword,
      props: true,
    },
  ],
})

// router.beforeEach(async (to, from) => {
//   const pb = usePocketBase()
//   const isAuthenticated = pb.authStore.isValid
//   // try {
//   //   await pb.collection('users').authRefresh()
//   // } catch (err) {
//   //   console.log(err)
//   // }
//   if (to.name !== 'Login' && !isAuthenticated) {
//     router.push({ name: 'Login' })
//   }
//   if (isAuthenticated) {
//     router.push({ name: 'Home' })
//   }
// })

export default router
