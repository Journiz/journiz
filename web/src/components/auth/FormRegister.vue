<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TextInput from '~/components/forms/TextInput.vue'

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
  <form
    class="w-full max-w-520px p-13 bg-blue-300 rounded-xl mx-auto"
    @submit.prevent="register"
  >
    <div class="form-group">
      <TextInput
        v-model="username"
        label="Username"
        placeholder="username"
        type="text"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="email"
        label="Email"
        placeholder="email"
        type="text"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="password"
        label="Mot de passe"
        placeholder="password"
        type="password"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="confirmPassword"
        label="Confirmer le mot de passe"
        placeholder="confirmPassword"
        type="password"
      />
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <button
      class="w-fit block bg-blue-800 px-8 py-3 color-white rounded-xl mt-8 mx-auto"
    >
      Je m'inscris
    </button>
  </form>
</template>
