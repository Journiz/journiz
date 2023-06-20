<script lang="ts" setup="">
import { useRealtimeTrip } from '@journiz/composables'
import { useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import PageTitle from '~/components/PageTitle.vue'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TeamsList from '~/components/trip/TeamsList.vue'
import PairCode from '~/components/trip/PairCode.vue'

const id = useRoute().params.tripId
const { data: trip, loading, update } = useRealtimeTrip(id as string)
const autoSave = useDebounceFn(() => {
  update()
}, 1500)

const date = computed({
  get() {
    if (!trip.value?.date) return ''
    return new Date(trip.value?.date).toISOString().split('T')[0]
  },
  set(val) {
    trip.value!.date = new Date(val).toISOString()
  },
})
const duration = computed({
  get() {
    return trip.value?.duration.toString() ?? ''
  },
  set(val: string) {
    trip.value!.duration = parseInt(val)
  },
})

const pairingOpen = ref(false)
</script>
<template>
  <div v-if="!loading && trip" class="grid grid-cols-2 h-full p-5">
    <div class="flex flex-col justify-center items-center gap-12">
      <page-title>{{ trip.name }}</page-title>
      <div class="flex flex-col max-w-80 gap-4">
        <TextInput
          v-model="trip.name"
          label="Nom de la sortie"
          @input="autoSave"
        />
        <TextInput v-model="date" type="date" label="Date" @input="autoSave" />
        <div class="relative">
          <TextInput
            v-model="duration"
            type="number"
            label="Durée (en minutes)"
            @input="autoSave"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-beige rounded-lg flex flex-col justify-center items-center p-5"
    >
      <TeamsList
        v-if="trip.expand?.teams?.length"
        class="mb-auto"
        btn-text="Modifier les équipes"
        :teams="trip.expand.teams"
        @btn-click="pairingOpen = true"
      />
      <DefaultButton v-else color="secondary"
        >Ajouter les équipes</DefaultButton
      >
    </div>
    <teleport to="body">
      <div
        v-show="pairingOpen"
        class="fixed inset-0 w-full h-full bg-beige-light grid grid-cols-2 h-full p-5"
      >
        <PairCode :trip="trip" class="h-full" />
        <div
          class="bg-beige rounded-lg flex flex-col justify-center items-center p-5"
        >
          <TeamsList
            v-if="trip.expand?.teams?.length"
            class="mb-auto"
            btn-text="Valider les équipes"
            :teams="trip.expand.teams"
            @btn-click="pairingOpen = false"
          />
        </div>
      </div>
    </teleport>
  </div>
  <div v-else class="p-5">Chargement du voyage...</div>
</template>
