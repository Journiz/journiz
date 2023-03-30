<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePocketBase } from '@journiz/composables'

const invalidInput = ref(false)
const email = ref('')
const password = ref('')

const pb = usePocketBase()
const router = useRouter()

async function login() {
  email.value = email.value.toLowerCase()
  try {
    await pb.collection('users').authWithPassword(email.value, password.value)
    invalidInput.value = false
    router.push('/')
  } catch (err) {
    invalidInput.value = true
  }
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
