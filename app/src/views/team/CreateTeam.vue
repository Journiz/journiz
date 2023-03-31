<script lang="ts" setup=""></script>
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Accueil team</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="false" :scroll-x="false">
      <div class="flex flex-col h-full items-start">
        CreateTeam
        <IonButton router-link="/join-team"
          >Rejoindre une équipe existante</IonButton
        >
      </div>
    </IonContent>
  </IonPage>
</template>
