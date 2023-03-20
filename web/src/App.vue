<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// usePocketBase()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
