<script lang="ts" setup="">
import { IonToolbar, useIonRouter } from '@ionic/vue'
import PickTrip from '~/components/user/PickTrip.vue'
import { useLogout } from '~/composables/useLogout'
import { useUserStore } from '~/stores/user'

const router = useIonRouter()
const onTripChange = () => {
  router.navigate(`/user/trip`, 'forward', 'replace')
}
const logout = useLogout(useUserStore().logout)
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Choisir un parcours</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <PickTrip @trip-change="onTripChange" />
      <IonButton @click="logout">Logout</IonButton>
    </IonContent>
  </IonPage>
</template>
