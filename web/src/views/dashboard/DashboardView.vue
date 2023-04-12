<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <main class="bg-primary-200 w-screen h-screen flex">
    <Sidebar />
    <article class="flex-grow">
      <router-view />
    </article>
  </main>
</template>
