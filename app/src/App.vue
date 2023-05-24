<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { useUserStore } from './stores/user'
import { useTeamStore } from './stores/team/team'
import { useThemeColor } from '~/composables/useThemeColor'

if (['ios', 'android'].includes(Capacitor.getPlatform())) {
  StatusBar.setStyle({
    style: Style.Light,
  })
  StatusBar.setBackgroundColor({ color: '#ffffff' })
}
useUserStore().refresh()
useTeamStore()
const themeColor = useThemeColor()
</script>
<template>
  <IonApp id="journiz-app" :scroll-x="false" :scroll-y="false">
    <IonRouterOutlet />
  </IonApp>
</template>
<style>
#journiz-app {
  --color-theme: v-bind(themeColor);
}
</style>
