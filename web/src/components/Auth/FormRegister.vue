<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const invalidInput = ref(false)
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const router = useRouter()
const store = useUserStore()

const register = async () => {
  loading.value = true
  email.value = email.value.toLowerCase()

  const success = await store.register(
    username.value,
    email.value,
    password.value,
    confirmPassword.value
  )
  if (success) {
    console.log(success)
    invalidInput.value = false
    return router.push('/login')
  }
  invalidInput.value = true
  loading.value = false
}
</script>

<template>
  <h1>Form Register</h1>
  <form @submit.prevent="register">
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" placeholder="email" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text" placeholder="email" />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="password"
      />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Mot de passe</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="confirmPassword"
      />
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <button>Je m'inscris</button>
  </form>
</template>
