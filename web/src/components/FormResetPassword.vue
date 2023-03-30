<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePocketBase } from '@journiz/composables'

const invalidInput = ref(false)
const password = ref('')
const confirmPassword = ref('')

const pb = usePocketBase()
// const router = useRouter()
const route = useRoute()
const token = route.query.token

console.log(token)

async function resetPassword() {
  console.log('oui')
  if (password.value !== resetPassword.value) {
    await pb
      .collection('users')
      .confirmPasswordReset(token, password.value, confirmPassword.value)

    password.value = ''
    confirmPassword.value = ''
    invalidInput.value = false
  } else {
    invalidInput.value = true
  }
}
</script>

<template>
  <h1>Form Login</h1>
  <form @submit.prevent="resetPassword">
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
    <p v-if="invalidInput">Les mots de passe doivent être identiques.</p>
    <button>Réinitialiser le mot de passe</button>
  </form>
</template>
