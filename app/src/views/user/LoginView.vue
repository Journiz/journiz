<script lang="ts" setup="">
import {
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  useIonRouter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import TextInput from '~/components/forms/TextInput.vue'
import Page from '~/components/Page.vue'
import Header from '~/components/design-system/Header.vue'
import Button from '~/components/design-system/Button.vue'

const store = useUserStore()
const router = useIonRouter()

const email = ref('mike')
const password = ref('mikemikemike')
const error = ref()
const loading = ref(false)
const login = async () => {
  loading.value = true
  const success = await store.login(email.value, password.value)
  if (success) {
    return router.navigate('/user', 'root', 'replace')
  }
  error.value = 'Mot de passe incorrect.'
  loading.value = false
}
</script>
<template>
  <Page class="justify-center h-full">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-login.jpg"
      alt="Background"
    />
    <div class="px-8">
      <h2
        class="relative color-green-dark text-2xl font-black text-center mb-10"
      >
        Connexion
      </h2>
      <TextInput
        v-model="email"
        class="mb-4"
        label="Identifiant"
        svg-name="people"
        :no-display-required-stars="true"
      />
      <TextInput
        v-model="password"
        label="Mot de passe"
        type="password"
        svg-name="lock"
        :no-display-required-stars="true"
      />
      <p v-if="error" class="relative text-red p-2">{{ error }}</p>
      <Button class="relative w-full mt-6" color="theme" @click="login"
        >Connexion</Button
      >
    </div>
  </Page>
</template>
