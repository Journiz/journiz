<script setup lang="ts">
import HelloBackoffice from '~/components/HelloBackoffice.vue'
import Logout from '~/components/Auth/Logout.vue'
import AuthStatus from '~/components/Auth/AuthStatus.vue'
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
