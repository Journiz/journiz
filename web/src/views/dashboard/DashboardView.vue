<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <main class="bg-primary-200 w-screen h-screen flex">
    <Sidebar />
    <article class="flex-grow">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in">
          <Suspense>
            <component :is="Component" :key="route.path" />
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </transition>
      </router-view>
    </article>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
