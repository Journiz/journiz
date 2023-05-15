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
  <div
    class="relative bg-green-dark h-full w-47 pt-41 pb-10 flex flex-col justify-between"
  >
    <img
      class="absolute bottom-0 left-0 right-0 object-contain"
      src="../assets/images/svg/bg-navbar.svg"
      alt="Navbar background"
    />
    <div class="relative flex flex-wrap items-end justify-end w-content">
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
    </div>
    <div class="relative px-4">
      <router-link to="profil">
        <div
          class="text-center p-2 bg-white-off rounded-lg text-green-dark font-black text-lg"
        >
          {{ userStore.user.username }}
        </div>
      </router-link>
      <div
        class="flex text-white-off font-extralight items-center justify-center mt-5 text-md cursor-pointer"
        @click="logout"
      >
        <IconSignout class="mr-1" />
        Se déconnecter
      </div>
    </div>
  </div>
</template>
