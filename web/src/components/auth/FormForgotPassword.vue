<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'
import TextInput from '~/components/forms/TextInput.vue'

const store = useUserStore()
const email = ref('')

const newPassword = async () => {
  email.value = email.value.toLowerCase()
  const success = await store.newPassword(email.value)
  console.log(success)
}
</script>

<template>
  <form
    class="w-full max-w-520px p-13 bg-blue-300 rounded-xl mx-auto"
    @submit.prevent="newPassword"
  >
    <div class="form-group">
      <TextInput
        v-model="email"
        label="Email"
        placeholder="email"
        type="text"
      />
    </div>
    <button
      class="w-fit block bg-blue-800 px-8 py-3 color-white rounded-xl mt-8 mx-auto"
    >
      Confirmer
    </button>
  </form>
</template>
