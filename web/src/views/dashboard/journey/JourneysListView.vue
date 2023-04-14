<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJourneys } from '@journiz/composables'
import PageTitle from '~/components/PageTitle.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import { useUserStore } from '~/stores/user'
import { useJourneyStore } from '~/stores/journey'
import JourneyItem from '~/components/journey/JourneyItem.vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'

const router = useRouter()
const userStore = useUserStore()
const journeyStore = useJourneyStore()

const {
  data: journeys,
  loading,
  refresh,
} = useJourneys({
  filter: `user="${userStore.user!.id}"`,
  sort: '-created',
})

const deleteJourney = async (id: string) => {
  console.log('delete journey', id)
  const success = await journeyStore.deleteJourney(id)
  if (success) {
    await refresh()
  }
}
await waitForEndLoading(loading)
</script>

<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Mes parcours</page-title>
    <default-button class="mb-6" @click="router.push('parcours/creation')"
      >Nouveau parcours</default-button
    >
    <div class="flex flex-col gap-4">
      <JourneyItem
        v-for="journey in journeys"
        :key="journey.id"
        :journey="journey"
        @delete-journey="deleteJourney(journey.id)"
        @edit-journey="router.push('/dashboard/parcours/' + journey.id)"
      />
    </div>
    <!--    <JourneyLine-->
    <!--      journey-name="Sortie à Grenoble"-->
    <!--      basecamp-name="Hôtel de ville"-->
    <!--    />-->
  </article>
</template>
