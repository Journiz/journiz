<script lang="ts" setup>
import { usePocketBase } from '@journiz/composables'
import { useRouter } from 'vue-router'

const pb = usePocketBase()
const router = useRouter()

function logout() {
  try {
    pb.authStore.clear()
  } catch (err) {
    console.log(err)
  }
  router.push('/login')
}
</script>

<template>
  <form @submit.prevent="logout">
    <button>Logout</button>
  </form>
  <a href="/login">Login page</a>
</template>
