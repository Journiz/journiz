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
    <ion-content :fullscreen="true" :scroll-x="false" :scroll-y="false">
      <ion-tabs mode="ios">
        <ion-router-outlet style="--offset-bottom: 50px"></ion-router-outlet>
        <div class="absolute w-full h-16 bg-blue bottom-2">
          <ion-tab-bar>
            <ion-tab-button tab="tab1" href="/user/trip/home" translucen="true">
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
        </div>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>
<style lang="scss">
ion-tab-bar {
  --background: #00000044;
  position: relative;
  height: 100%;
  //  border-radius: 16px;
  //  width: 92%;
  //  border-top: none;
  //  margin: 0 auto;
  //  height: 55px;
}
</style>
