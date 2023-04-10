<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const invalidInput = ref(false)

const store = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  const success = await store.login(email.value, password.value)
  if (success) {
    invalidInput.value = false
    return router.push('/')
  }
  invalidInput.value = true
  loading.value = false
}
</script>

<template>
  <h1>Form Login</h1>
  <form @submit.prevent="login">
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
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <button>Connexion</button>
  </form>
</template>
