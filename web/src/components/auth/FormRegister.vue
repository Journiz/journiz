<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

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
  <form class="w-full max-w-520px p-13 mx-auto" @submit.prevent="register">
    <h2 class="mx-auto w-fit font-black text-3xl mb-8">Inscription</h2>
    <div class="form-group">
      <TextInput
        v-model="username"
        class="mb-5"
        label="Identifiant"
        placeholder="Identifiant"
        type="text"
        svg-name="people"
        :no-display-required-stars="true"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="email"
        class="mb-5"
        label="Email"
        placeholder="email"
        type="text"
        svg-name="email"
        :no-display-required-stars="true"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="password"
        class="mb-5"
        label="Mot de passe"
        placeholder="password"
        type="password"
        svg-name="lock"
        :no-display-required-stars="true"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="confirmPassword"
        label="Confirmer le mot de passe"
        placeholder="confirmPassword"
        type="password"
        svg-name="lock"
        :no-display-required-stars="true"
      />
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <DefaultButton class="mx-auto mt-6" color="secondary"
      >S'inscrire
    </DefaultButton>
  </form>
</template>
