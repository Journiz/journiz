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
  <section class="pr-8">
    <div class="flex gap-4 w-full">
      <div class="rounded-xl p-8 bg-red color-white text-center w-1/2">
        <p class="text-4xl font-bold mb-4">{{ journeys.length }}</p>
        <p class="font-bold">Parcours créés</p>
      </div>
      <div class="rounded-xl p-8 bg-green color-white text-center w-1/2">
        <p class="text-4xl font-bold mb-4">{{ records.length }}</p>
        <p class="font-bold">Sortie jouées</p>
      </div>
    </div>
    <div
      class="relative w-full mt-4 rounded-lg p-10 text-center overflow-hidden"
    >
      <img
        class="object-center object-cover w-full h-full absolute top-0 left-0"
        src="../../assets/images/backgroundImage/bg-profil.png"
        alt="Background"
      />
      <p class="relative">
        Partager vos parcours afin que d’autres professeurs puissent en
        bénéficier
      </p>
      <default-button
        class="relative mx-auto mt-7"
        type="submit"
        :loading="false"
        variant="fill"
        color="secondary"
        >Découvrir la communauté</default-button
      >
    </div>
  </section>
</template>
