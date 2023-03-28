<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { useUserStore } from './stores/user'
if (['ios', 'android'].includes(Capacitor.getPlatform())) {
  StatusBar.setStyle({
    style: Style.Light,
  })
}
useUserStore().refresh()
</script>
<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
<style></style>
