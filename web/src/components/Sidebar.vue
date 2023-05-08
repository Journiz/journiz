<script setup>
import { useRouter } from 'vue-router'
import IconSignout from '~icons/uil/sign-out-alt'
import { useUserStore } from '~/stores/user'
import SidebarMenuItem from '~/components/layout/SidebarMenuItem.vue'

const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
  await userStore.logout()
  await router.push('/')
}
</script>

<template>
  <div class="bg-green-dark h-full w-47 pt-24 pb-10">
    <div class="flex flex-wrap items-end justify-end w-content">
      <SidebarMenuItem
        icon="journey"
        name="Vos parcours"
        path="/dashboard/parcours"
      />
      <SidebarMenuItem
        icon="folder"
        name="Modèles"
        path="/dashboard/communaute"
      />
      <!-- <button class="min-w-41" @click="logout">
        <div class="flex flex-row text-white-off items-center">
          <icon-signout class="sidebar-icon mr-2" />
          <span class="text-xs">Déconnexion</span>
        </div>
      </button> -->
    </div>
  </div>
</template>
