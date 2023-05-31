<script lang="ts" setup="">
import { useJourneys, usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const userStore = useUserStore()
const pb = usePocketBase()

const { data: journeys, loading } = useJourneys({
  filter: `user="${userStore.user!.id}"`,
})

const records = await pb.collection('trip_to_user').getFullList({
  filter: `user="${userStore.user!.id}"`,
})
</script>
<template>
  <section>
    <div>
      <p>{{ journeys.length }}</p>
      <p>Parcours créés</p>
    </div>
    <div>
      <p>{{ records.length }}</p>
      <p>Sortie jouées</p>
    </div>
    <div>
      <p>
        Partager vos parcours afin que d’autres professeurs puissent en
        bénéficier
      </p>
      <default-button
        type="submit"
        :loading="false"
        variant="fill"
        color="secondary"
        >Découvrir la communauté</default-button
      >
    </div>
  </section>
</template>
