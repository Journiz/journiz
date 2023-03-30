<script lang="ts" setup="">
import { computed, ref } from 'vue'
import { IonLabel, IonItem, IonInput, useIonRouter } from '@ionic/vue'
import { Dialog } from '@capacitor/dialog'
import { useTripStore } from '../../stores/team/trip'
const tripCode = ref('')
const canSubmit = computed(() => tripCode.value.length === 4)

const store = useTripStore()
const router = useIonRouter()
const join = async () => {
  const joined = await store.joinTrip(tripCode.value)
  if (!joined) {
    await Dialog.alert({
      title: 'Partie introuvable',
      message:
        "Cette sortie Journiz n'a pas été trouvée. Avez-vous entré le bon numéro ?",
      buttonTitle: 'Je réessaye !',
    })
    return
  }
  console.log('next here')
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
      <ion-item>
        <ion-label>Code de partie</ion-label>
        <ion-input
          v-model="tripCode"
          placeholder=""
          type="text"
          enterkeyhint="enter"
          inputmode="numeric"
          maxlength="4"
        ></ion-input>
      </ion-item>
      <IonButton :disabled="!canSubmit" @click="join">Rejoindre</IonButton>
    </IonContent>
  </IonPage>
</template>
