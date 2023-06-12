<script setup>
import { getFileUrl } from '@journiz/composables'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import IconSignout from '~icons/uil/sign-out-alt'
import { useUserStore } from '~/stores/user'
import SidebarMenuItem from '~/components/layout/SidebarMenuItem.vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const menuData = [
  {
    icon: 'journey',
    name: 'Vos parcours',
    path: '/dashboard/parcours',
  },
  {
    icon: 'folder',
    name: 'Modèles',
    path: '/dashboard/communaute',
  },
]
const menuItems = ref()
const menuElements = computed(() => menuItems.value?.map((c) => c.$el) ?? [])

const currentItemYTranslate = computed(() => {
  if (menuElements.value.length !== menuData.length) {
    return 0
  }
  const currentPathIndex = menuData.findIndex((d) =>
    route.path.startsWith(d.path)
  )
  if (currentPathIndex < 0) {
    return -50
  }
  return menuElements.value[currentPathIndex].offsetTop
})
const logout = async () => {
  await userStore.logout()
  await router.push('/')
}
const avatar = getFileUrl(userStore.user, userStore.user.avatar)
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
    <img
      class="absolute top-13 w-33 h-auto left-1/2 -translate-x-1/2"
      src="../assets/images/svg/logo-journiz.svg"
      alt="Logo"
    />
    <div class="relative flex flex-wrap items-end justify-end w-content">
      <div
        class="absolute bg-red h-11 min-w-41 top-0 custom-shadow invert-rounded rounded-s-lg bg-white-off transition duration-200"
        :style="{ transform: 'translateY(' + currentItemYTranslate + 'px)' }"
      />
      <SidebarMenuItem
        v-for="item in menuData"
        ref="menuItems"
        :key="item.path"
        :icon="item.icon"
        :path="item.path"
        :name="item.name"
      />
    </div>
    <div class="relative px-4">
      <router-link :to="{ name: 'user-profile' }">
        <div class="h-14 w-14 overflow-hidden rounded-full mb-4 mx-auto">
          <img
            v-if="avatar"
            class="object-fit object-center object-cover w-full h-full"
            :src="avatar"
            alt="Avatar"
          />
        </div>
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
<style scoped>
.custom-shadow {
  box-shadow: inset 0 0 0 rgba(0, 35, 30, 0.16);
}
.invert-rounded::before {
  content: '';
  position: absolute;
  background-color: transparent;
  top: -16px;
  right: 0;
  border-bottom-right-radius: 8px;
  height: 16px;
  width: 8px;
  box-shadow: 0 8px 0 0 #fbf9f4;
}
.invert-rounded::after {
  content: '';
  position: absolute;
  background-color: transparent;
  bottom: -16px;
  right: 0;
  border-top-right-radius: 8px;
  height: 16px;
  width: 8px;
  box-shadow: 0 -8px 0 0 #fbf9f4;
}
</style>
