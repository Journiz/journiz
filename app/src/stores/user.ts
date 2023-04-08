import { defineStore } from 'pinia'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { User } from '@journiz/api-types'
import { useIonRouter } from '@ionic/vue'

export const useUserStore = defineStore('user', () => {
  const pb = usePocketBase()
  const isLoggedIn = () => pb.authStore.isValid
  const user = ref<User | null>(
    isLoggedIn() ? (pb.authStore.model as unknown as User) : null
  )
  const refresh = async () => {
    try {
      await pb.collection('users').authRefresh()
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model as unknown as User
      }
    } catch (e) {
      console.info('🚶- No user logged in.')
    }
  }
  const login = async (username: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(username, password)
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model as unknown as User
        return true
      }
    } catch (e) {
      console.error('ERROR: ' + e)
    }
    return false
  }

  const logout = () => {
    const router = useIonRouter()
    pb.authStore.clear()
    user.value = null
    router.navigate('/home', 'root', 'replace')
  }

  return {
    user,
    refresh,
    login,
    isLoggedIn,
    logout,
  }
})
