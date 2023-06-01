<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const invalidInput = ref(false)

const store = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const emit = defineEmits(['displayMissingPassword'])

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
  <form class="w-full max-w-520px p-13 mx-auto" @submit.prevent="login">
    <h2 class="mx-auto w-fit font-black text-3xl mb-8">Connexion</h2>
    <div class="form-group">
      <TextInput
        v-model="email"
        class="mb-6"
        label="Email"
        placeholder="email"
        svg-name="people"
        :no-display-required-stars="true"
      />
    </div>
    <div class="form-group">
      <TextInput
        v-model="password"
        label="Mot de passe"
        placeholder="password"
        type="password"
        :no-display-required-stars="true"
      />
    </div>
    <div
      class="w-full flex justify-end font-semibold cursor-pointer mt-2 hover:color-green"
      @click="emit('displayMissingPassword')"
    >
      Mot de passe oublié ?
    </div>
    <p v-if="invalidInput">Identifiant ou mot de passe incorrect</p>
    <DefaultButton class="mx-auto mt-6" color="secondary"
      >Connexion</DefaultButton
    >
  </form>
</template>
