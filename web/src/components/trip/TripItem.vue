<script setup lang="ts">
import { computed } from 'vue'
import { Trip } from '@journiz/api-types'
import { useDateFormat } from '@vueuse/core'
import SquareButton from '~/components/buttons/SquareButton.vue'
import icons from '~/assets/icons'

const props = defineProps<{ trip: Trip }>()
const emit = defineEmits(['openPodium', 'openTrip'])

const MarkerIcon = computed(() => icons.marker)

const date = useDateFormat(props.trip.updated, 'DD/MM/YYYY')
</script>
<template>
  <div class="content w-full flex px-6 py-4 bg-green-dark/4 rounded-xl">
    <div class="flex-1 flex flex-col mr-8">
      <div class="name text-green-dark font-medium text-base">
        {{ trip.name }}
      </div>
      <div class="w-full flex text-green font-normal text-base">
        <div
          v-if="trip.expand?.journey?.basecampName"
          class="basecamp flex items-center mr-2 font-medium"
        >
          <MarkerIcon /> {{ trip.expand.journey.basecampName }}
        </div>
        <div v-if="trip.date" class="flex items-center font-medium">
          <span class="i-uil:play"></span>
          Joué le {{ date }}
        </div>
      </div>
    </div>
    <div class="w-auto flex gap-2">
      <SquareButton
        icon="podium"
        :activated="true"
        @click="emit('openPodium')"
      />
      <!--      <SquareButton-->
      <!--        v-if="complete"-->
      <!--        :activated="true"-->
      <!--        icon="podium"-->
      <!--        color="secondary"-->
      <!--      />-->
      <SquareButton icon="edit" color="secondary" @click="emit('openTrip')" />
      <!--      <SquareButton-->
      <!--        icon="trash"-->
      <!--        color="secondary"-->
      <!--        @click="emit('deleteJourney')"-->
      <!--      />-->
    </div>
  </div>
</template>

<style scoped>
.content {
  max-width: 822px;
}
.basecamp {
  min-width: 96px;
}
</style>
