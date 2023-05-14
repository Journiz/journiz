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
        <div class="absolute w-full h-20 bottom-0 bg-blue/20">
          <ion-tab-bar>
            <ion-tab-button tab="tab1" href="/user/trip/home">
              <span class="tab-icon i-uil:cog"></span>
              <span class="tab-text">Paramètres</span>
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
  --background: #00000000;
  position: relative;
  height: 100%;
  //  border-radius: 16px;
  //  width: 92%;
  //  border-top: none;
  //  margin: 0 auto;
  //  height: 55px;
}

ion-tab-button {
  --color: #d4d4d4;

  .tab-icon {
    @apply text-24px mb-2;
  }
}
ion-tab-button.tab-selected {
}
</style>
