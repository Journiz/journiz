<script setup>
import { useRouter } from 'vue-router'
import IconGroup from '~icons/uil/users-alt'
import IconUser from '~icons/uil/user-circle'
import IconSetting from '~icons/uil/setting'
import IconSignout from '~icons/uil/sign-out-alt'
import IconTrip from '~icons/bx/trip'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
  await userStore.logout()
  await router.push('/')
}
</script>

<template>
  <div class="bg-white h-full w-24 pt-40">
    <router-link to="/dashboard/parcours">
      <div class="flex flex-col text-center text-blue-700 mb-10">
        <icon-trip class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Vos parcours</span>
      </div>
    </router-link>
    <router-link to="/dashboard/communaute">
      <div class="flex flex-col text-center text-blue-700 mb-10">
        <icon-group class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Communauté</span>
      </div>
    </router-link>
    <router-link to="/dashboard/profil">
      <div class="flex flex-col text-center text-blue-700 mb-10">
        <icon-user class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Profil</span>
      </div>
    </router-link>
    <router-link to="/dashboard/parametres">
      <div class="flex flex-col text-center text-blue-700 mb-10">
        <icon-setting class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Paramètres</span>
      </div>
    </router-link>
    <button class="w-full" @click="logout">
      <span class="flex flex-col text-center text-blue-700 mb-10">
        <icon-signout class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Déconnexion</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.sidebar-icon {
  height: 30px;
  width: auto;
}
</style>
