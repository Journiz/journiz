<script lang="ts" setup>
import { ref } from 'vue'
import { usePocketBase } from '@journiz/composables'

const pb = usePocketBase()
const email = ref('')
// const password = ref('')
// const confirmPassword = ref('')

async function newPassword() {
  try {
    email.value = email.value.toLowerCase()
    await pb.collection('users').requestPasswordReset(email.value)
  } catch (err) {
    console.error(err)
  }
}
// await pb.collection('users').confirmPasswordReset(
//     'TOKEN',
//     'NEW_PASSWORD',
//     'NEW_PASSWORD_CONFIRM',
// );
</script>

<template>
  <h1>Nouveau mot de passe</h1>
  <form @submit.prevent="newPassword">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text" placeholder="email" />
    </div>
    <!-- <div class="form-group">
      <label for="password">Mot de passe</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="password"
      />
    </div>
    <div class="form-group">
      <label for="password">Conformez le mot de passe</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="confirmPassword"
        placeholder="Password"
      />
    </div> -->
    <button>Confirmer</button>
  </form>
</template>
