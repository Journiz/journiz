<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { useUserStore } from './stores/user'
import { useTeamStore } from './stores/team/team'
import { useTripStore } from './stores/team/trip'
if (['ios', 'android'].includes(Capacitor.getPlatform())) {
  StatusBar.setStyle({
    style: Style.Light,
  })
}
useUserStore().refresh()
useTeamStore()
useTripStore()
</script>
<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
<style></style>
