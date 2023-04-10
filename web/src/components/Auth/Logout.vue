<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const store = useUserStore()
const router = useRouter()

const logout = async () => {
  await store.logout()
  router.push('/login')
}
</script>

<template>
  <form @submit.prevent="logout">
    <button>Logout</button>
  </form>
  <a href="/login">Login page</a>
</template>
