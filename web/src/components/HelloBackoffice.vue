<script lang="ts" setup>
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'

const pb = usePocketBase()
const email = ref('')
email.value = pb.authStore.model?.email
</script>

<template>
  <h1>Hello : {{ email }}</h1>
</template>
