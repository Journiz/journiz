<script lang="ts" setup="">
import { IonRefresher, IonRefresherContent } from '@ionic/vue'
import { Team } from '@journiz/api-types'
import { useTeams } from '@journiz/composables'
import { useTeamStore } from '../../stores/team/team'
import { useTripStore } from '../../stores/team/trip'

const store = useTeamStore()

const { data: teams, refresh } = useTeams({
  filter: `trip="${useTripStore().trip?.id ?? 0}"`,
})
const handleRefresh = async (e: any) => {
  await refresh()
  e.target.complete()
}
const joinTeam = (team: Team) => {
  store.setId(team.id)
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
      Refresh
      <div>{{ teams }}</div>
    </IonContent>
  </IonPage>
</template>
