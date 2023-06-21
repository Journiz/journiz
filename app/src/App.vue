<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import { useTeamStore } from './stores/team/team'
import { useThemeColor } from '~/composables/useThemeColor'
import AppModal from '~/components/modal/AppModal.vue'
import { useGeolocationStore } from '~/stores/geolocation'
import DevTool from '~/components/DevTool.vue'

if (['ios', 'android'].includes(Capacitor.getPlatform())) {
  StatusBar.setStyle({
    style: Style.Light,
  })
  StatusBar.setBackgroundColor({ color: '#ffffff' })
}
useUserStore().refresh()
useTeamStore()
const themeColor = useThemeColor()

onMounted(() => {
  useGeolocationStore().requestPermission()
})
</script>
<template>
  <IonApp id="journiz-app" :scroll-x="false" :scroll-y="false">
    <IonRouterOutlet />
    <AppModal />
    <DevTool />
  </IonApp>
</template>
<style>
#journiz-app {
  --color-theme: v-bind(themeColor);
}
</style>
