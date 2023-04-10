<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const store = useUserStore()
const email = ref('')

const newPassword = async () => {
  email.value = email.value.toLowerCase()
  const success = await store.newPassword(email.value)
  console.log(success)
}
</script>

<template>
  <h1>Nouveau mot de passe</h1>
  <form @submit.prevent="newPassword">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text" placeholder="email" />
    </div>
    <button>Confirmer</button>
  </form>
</template>
