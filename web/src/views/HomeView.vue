<script setup lang="ts">
import HelloBackoffice from '~/components/HelloBackoffice.vue'
import Logout from '~/components/Logout.vue'
import AuthStatus from '~/components/AuthStatus.vue'
import UserData from '~/components/UserData.vue'
</script>

<template>
  <main>
    <AuthStatus />
    <h1>Dashboard</h1>
    <HelloBackoffice />
    <UserData />
    <Logout />
  </main>
</template>
