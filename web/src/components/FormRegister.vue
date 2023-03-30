<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePocketBase } from '@journiz/composables'

const invalidInput = ref(false)
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const pb = usePocketBase()
const router = useRouter()

async function register() {
  email.value = email.value.toLowerCase()
  const data = {
    username: username.value,
    email: email.value,
    emailVisibility: true,
    password: password.value,
    passwordConfirm: confirmPassword.value,
  }

  try {
    // example create data
    await pb.collection('users').create(data)

    await pb.collection('users').requestVerification(email.value)
    // try {
    //   // (optional) send an email verification request
    // } catch (e) {
    //   console.log(e)
    // }

    invalidInput.value = false
    router.push('/login')
  } catch (err) {
    invalidInput.value = true
  }
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
        type="confirmPassword"
        placeholder="confirmPassword"
      />
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <button>Je m'inscris</button>
  </form>
</template>
