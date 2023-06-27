<script lang="ts" setup="">
import { ref } from 'vue'
import { getFileUrl, useFileUrl } from '@journiz/composables'
import { useUserStore } from '~/stores/user'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const userStore = useUserStore()

const validInput = ref(false)
const invalidInput = ref(false)
const id = ref(userStore.user?.id)
const username = ref(userStore.user?.username)
const email = ref(userStore.user?.email)
const loading = ref(false)
const avatar = getFileUrl(userStore.user, userStore.user?.avatar)

const updateUser = async () => {
  loading.value = true
  const success = await userStore.updateUser(
    id.value!,
    username.value,
    email.value
  )
  if (success) {
    console.log(success)
    invalidInput.value = false
    validInput.value = true
    return
  }
  invalidInput.value = true
  loading.value = false
}
</script>
<template>
  <section class="bg-beige p-12 rounded-xl h-full">
    <h2 class="text-2xl font-bold text-center mb-4">
      Vos informations personnels
    </h2>
    <div>
      <div class="w-36 h-36 rounded-full overflow-hidden mb-6 mx-auto">
        <img
          v-if="avatar"
          class="object-fit object-center object-cover w-full h-full"
          :src="avatar"
          alt="Avatar"
        />
      </div>
    </div>
    <form
      class="w-full max-w-520px rounded-xl mx-auto"
      @submit.prevent="updateUser"
    >
      <div class="form-group">
        <TextInput
          v-model="username"
          label="Identifiant"
          placeholder="username"
          type="text"
          :no-display-required-stars="true"
          svg-name="people"
        />
      </div>
      <div class="form-group">
        <TextInput
          v-model="email"
          label="Email"
          placeholder="email"
          type="text"
          :no-display-required-stars="true"
          svg-name="email"
        />
      </div>
      <p v-if="invalidInput">
        Erreur, l'identifiant est peut-être déjà utilisé
      </p>
      <p v-if="validInput">Les données ont bien été enregistrées</p>
      <default-button
        class="mt-4 mx-auto"
        type="submit"
        :loading="false"
        variant="fill"
        color="secondary"
        >Modifier mes informations</default-button
      >
    </form>
  </section>
</template>
