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

  const register = async (
    Username: string,
    Email: string,
    Password: string,
    ConfirmPassword: string
  ) => {
    const data = {
      username: Username,
      email: Email,
      emailVisibility: true,
      password: Password,
      passwordConfirm: ConfirmPassword,
    }
    try {
      await pb.collection('users').create(data)
      return true
      // await pb.collection('users').requestVerification(email.value)
    } catch (e) {
      console.error('ERROR: ' + e)
      return false
    }
  }

  const newPassword = async (email: string) => {
    try {
      await pb.collection('users').requestPasswordReset(email)
      return true
    } catch (e) {
      console.error('ERROR: ' + e)
      return false
    }
  }

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await pb
        .collection('users')
        .confirmPasswordReset(token, password, confirmPassword)
      return true
    } catch (e) {
      console.error('ERROR: ' + e)
      return false
    }
  }

  return {
    user,
    refresh,
    login,
    isLoggedIn,
    logout,
    register,
    newPassword,
    resetPassword,
  }
})
