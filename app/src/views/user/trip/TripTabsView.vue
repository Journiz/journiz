<script lang="ts" setup="">
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/vue'
import { chatbox, map, cog } from 'ionicons/icons'
</script>
<template>
  <ion-page>
    <ion-content :fullscreen="false" :scroll-x="false" :scroll-y="false">
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/user/trip/home">
            <ion-icon :icon="cog" />
            <ion-label>Tab 1</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/user/trip/tab2">
            <ion-icon :icon="map" />
            <ion-label>Carte</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="chat" href="/user/trip/chat">
            <ion-icon :icon="chatbox" />
            <ion-label>Chat</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>
