<script lang="ts" setup="">
import { useIonRouter, IonModal, IonToolbar, IonButtons } from '@ionic/vue'
import { ref } from 'vue'
import { useLogout } from '../../composables/useLogout'
import PickTrip from '../../components/user/PickTrip.vue'
import { useUserStore } from '../../stores/user'
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
