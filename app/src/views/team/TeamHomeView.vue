<script lang="ts" setup="">
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()

const logout = async () => {
  try {
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
