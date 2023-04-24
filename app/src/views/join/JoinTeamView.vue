<script lang="ts" setup="">
import {
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
} from '@ionic/vue'
import { Team } from '@journiz/api-types'
import { useTeams } from '@journiz/composables'
import { useTeamStore } from '~/stores/team/team'

const store = useTeamStore()

const { data: teams, refresh } = useTeams({
  filter: `trip="${useTeamStore().trip?.id ?? 0}"`,
})
const handleRefresh = async (e: any) => {
  await refresh()
  e.target.complete()
}

const router = useIonRouter()
const joinTeam = async (team: Team) => {
  await store.joinTeam(team.id)
  return router.navigate('/team', 'root', 'replace')
}
</script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Rejoindre une équipe</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" class="ion-padding">
      <ion-refresher slot="fixed" @ion-refresh="handleRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item
          v-for="team in teams"
          :key="team.id"
          button
          :detail="false"
          @click="joinTeam(team)"
        >
          <ion-label>{{ team.name }}</ion-label>
        </ion-item>
      </ion-list>
    </IonContent>
  </IonPage>
</template>
