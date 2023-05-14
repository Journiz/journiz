<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { useUserStore } from './stores/user'
import { useTeamStore } from './stores/team/team'

if (['ios', 'android'].includes(Capacitor.getPlatform())) {
  StatusBar.setStyle({
    style: Style.Light,
  })
  StatusBar.setBackgroundColor({ color: '#ffffff' })
}
useUserStore().refresh()
useTeamStore()
</script>
<template>
  <IonApp :scroll-x="false" :scroll-y="false">
    <IonRouterOutlet />
  </IonApp>
</template>
<style></style>
