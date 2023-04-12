<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'

const invalidInput = ref(false)
const password = ref('')
const confirmPassword = ref('')

const store = useUserStore()
const route = useRoute()
const token: any = route.query.token

const resetPassword = async () => {
  const success = await store.resetPassword(
    token,
    password.value,
    confirmPassword.value
  )
  if (success) {
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
        type="password"
        placeholder="confirmPassword"
      />
    </div>
    <p v-if="invalidInput">Les mots de passe doivent être identiques.</p>
    <button>Réinitialiser le mot de passe</button>
  </form>
</template>
