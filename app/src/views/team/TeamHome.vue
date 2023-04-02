<script lang="ts" setup="">
import { useIonRouter } from '@ionic/vue'
import { useTeamStore } from '../../stores/team/team'

const store = useTeamStore()

const router = useIonRouter()
const logout = async () => {
  try {
    await router.navigate('/home', 'root', 'replace')
    await store.logout()
  } catch (e) {
    console.error(e)
  }
}
</script>
<template>
  <IonPage>
    <IonHeader class="">
      <IonToolbar>
        <IonTitle>Accueil team</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <div v-if="store.team">Bonjour {{ store.team.name }}</div>
      <div>
        <IonButton @click="logout">Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
