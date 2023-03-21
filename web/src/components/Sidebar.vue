<script setup>
import IconGroup from '~icons/uil/users-alt'
import IconUser from '~icons/uil/user-circle'
import IconSetting from '~icons/uil/setting'
import IconTrip from '~icons/bx/trip'
</script>

<template>
  <div class="bg-white fixed left-0 h-full top-0 w-1/12 pt-40">
    <router-link to="/journeys">
      <div class="text-center text-blue-700 mb-10">
        <icon-trip class="mx-auto mb-2 sidebar-icon" />
        <span>Vos parcours</span>
      </div>
    </router-link>
    <router-link to="/community">
      <div class="text-center text-blue-700 mb-10">
        <icon-group class="mx-auto mb-2 sidebar-icon" />
        <span>Communauté</span>
      </div>
    </router-link>
    <router-link to="/profil">
      <div class="text-center text-blue-700 mb-10">
        <icon-user class="mx-auto mb-2 sidebar-icon" />
        <span>Profil</span>
      </div>
    </router-link>
    <router-link to="/settings">
      <div class="text-center text-blue-700 mb-10">
        <icon-setting class="mx-auto mb-2 sidebar-icon" />
        <span>Paramètres</span>
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
