<script lang="ts" setup="">
import { ref } from 'vue'
import { useFileUrl } from '@journiz/composables'
import { useUserStore } from '../../stores/user'
import PageTitle from '~/components/PageTitle.vue'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const userStore = useUserStore()

const validInput = ref(false)
const invalidInput = ref(false)
const id = ref(userStore.user?.id)
const username = ref(userStore.user?.username)
const email = ref(userStore.user?.email)
const loading = ref(false)
const avatar = useFileUrl(userStore.user, userStore.user.avatar)

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
  <section>
    <page-title class="mb-10">Vos informations personnels</page-title>
    <form
      class="w-full max-w-520px p-13 rounded-xl mx-auto"
      @submit.prevent="updateUser"
    >
      <img v-if="avatar" :src="avatar" alt="" />
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
      <p v-if="invalidInput">
        Erreur, l'identifiant est peut-être déjà utilisé
      </p>
      <p v-if="validInput">Les données ont bien été enregistrées</p>
      <default-button
        type="submit"
        :loading="false"
        variant="fill"
        color="secondary"
        >Suivant</default-button
      >
    </form>
    <default-button
      type="submit"
      :loading="false"
      variant="fill"
      color="secondary"
      >Changer de mot de passe</default-button
    >
  </section>
</template>
