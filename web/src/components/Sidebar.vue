<script setup>
import IconGroup from '~icons/uil/users-alt'
import IconUser from '~icons/uil/user-circle'
import IconSetting from '~icons/uil/setting'
import IconTrip from '~icons/bx/trip'
</script>

<template>
  <div class="bg-white h-full w-24 pt-40">
    <router-link to="/dashboard/parcours">
      <div class="text-center text-blue-700 mb-10">
        <icon-trip class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Vos parcours</span>
      </div>
    </router-link>
    <router-link to="/dashboard/communaute">
      <div class="text-center text-blue-700 mb-10">
        <icon-group class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Communauté</span>
      </div>
    </router-link>
    <router-link to="/dashboard/profil">
      <div class="text-center text-blue-700 mb-10">
        <icon-user class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Profil</span>
      </div>
    </router-link>
    <router-link to="/dashboard/parametres">
      <div class="text-center text-blue-700 mb-10">
        <icon-setting class="mx-auto mb-2 sidebar-icon" />
        <span class="text-xs">Paramètres</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.sidebar-icon {
  height: 30px;
  width: auto;
}
</style>
