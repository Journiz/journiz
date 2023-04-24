<script lang="ts" setup>
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'

const pb = usePocketBase()

const status = ref('')
const Authstatus = ref(pb.authStore.isValid)
// if (Authstatus.value) {
//   status.value = 'Connecté '
// } else {
//   status.value = 'Déconnecté '
// }
</script>

<template>
  <h2 class="status">{{ status }}</h2>
  <h2 v-if="Authstatus" class="connected">&#x2713; Connecté</h2>
  <h2 v-if="!Authstatus" class="not-connected">&#10006; Déconnecté</h2>
</template>

<style>
.connected {
  color: green;
}
.not-connected {
  color: red;
}
</style>
