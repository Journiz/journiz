<script lang="ts" setup>
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'

const pb = usePocketBase()
const id = ref(pb.authStore.model?.id)
const username = ref(pb.authStore.model?.username)
const emailVisibility = ref(pb.authStore.model?.emailVisibility)
const email = ref(pb.authStore.model?.email)
const created = ref(pb.authStore.model?.created)
const updated = ref(pb.authStore.model?.updated)
const avatar = ref(pb.authStore.model?.avatar)
</script>

<template>
  <p>Id : {{ id }}</p>
  <p>Username : {{ username }}</p>
  <p>Email Visibility : {{ emailVisibility }}</p>
  <p>Email : {{ email }}</p>
  <p>Date création : {{ created }}</p>
  <p>Dernière update : {{ updated }}</p>
  <p>Avatar : {{ avatar }}</p>
</template>
