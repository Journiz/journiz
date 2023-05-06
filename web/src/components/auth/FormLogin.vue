<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TextInput from '~/components/forms/TextInput.vue'

const invalidInput = ref(false)

const store = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const emit = defineEmits(['displayMissingPassword', 'displaySubscribe'])

const login = async () => {
  loading.value = true
  console.log(email.value)
  const success = await store.login(email.value, password.value)
  if (success) {
    invalidInput.value = false
    return router.push('/dashboard')
  }
  invalidInput.value = true
  loading.value = false
}
</script>

<template>
  <form
    class="w-full max-w-520px p-13 bg-blue-300 rounded-xl mx-auto"
    @submit.prevent="login"
  >
    <div class="form-group">
      <TextInput v-model="email" label="Email" placeholder="email" />
    </div>
    <div class="form-group">
      <TextInput
        v-model="password"
        label="Mot de passe"
        placeholder="password"
        type="password"
      />
    </div>
    <div
      class="w-full flex justify-end text-blue-700 font-semibold cursor-pointer"
      @click="emit('displayMissingPassword')"
    >
      Mot de passe oublié ?
    </div>
    <div class="w-full flex justify-end text-blue-500 font-semibold">
      Vous ne possédez pas de compte ?
      <span
        class="cursor-pointer text-blue-700 ml-1"
        @click="emit('displaySubscribe')"
        >S'inscrire !</span
      >
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <button
      class="w-fit block bg-blue-800 px-8 py-3 color-white rounded-xl mt-8 mx-auto"
    >
      Connexion
    </button>
  </form>
</template>
