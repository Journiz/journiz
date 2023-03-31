<script lang="ts" setup="">
import { Team } from '@journiz/api-types'
import { useTeamStore } from '../../stores/team/team'

const store = useTeamStore()
// We will need custom api route for getting just the right teams list data

const joinTeam = (team: Team) => {
  store.setId(team.id)
}
</script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Accueil team</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="false" :scroll-x="false">
      Teams
      <pre v-if="trip?.expand?.teams">
        {{ trip.expand.teams }}
      </pre>
    </IonContent>
  </IonPage>
</template>
