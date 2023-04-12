<script setup lang="ts">
import HelloBackoffice from '~/components/HelloBackoffice.vue'
import Logout from '~/components/Auth/Logout.vue'
import AuthStatus from '~/components/Auth/AuthStatus.vue'
import UserData from '~/components/UserData.vue'
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <main class="bg-primary-200 w-screen h-screen flex">
    Landing page
    <!--    <Sidebar />-->
    <!--    <AuthStatus />-->
    <!--    <h1>Dashboard</h1>-->
    <!--    <HelloBackoffice />-->
    <!--    <UserData />-->
    <Logout />
    <!--    <a href="/new-journey">Créer un Parcour</a>-->
  </main>
</template>
