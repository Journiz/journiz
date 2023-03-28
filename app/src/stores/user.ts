import { defineStore } from 'pinia'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const pb = usePocketBase()
  const isLoggedIn = () => pb.authStore.isValid
  const user = ref(isLoggedIn() ? pb.authStore.model : null)
  const refresh = async () => {
    try {
      await pb.collection('users').authRefresh()
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model
      }
    } catch (e) {
      console.info('🚶- No user logged in.')
    }
  }
  const login = async (username: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(username, password)
      if (pb.authStore.isValid) {
        user.value = pb.authStore.model
        return true
      }
    } catch (e) {
      console.error('ERROR: ' + e)
    }
    return false
  }

  const logout = () => {
    pb.authStore.clear()
    user.value = null
  }

  return {
    user,
    refresh,
    login,
    isLoggedIn,
    logout,
  }
})
