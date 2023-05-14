<script setup lang="ts">
import { computed } from 'vue'
import { Journey as JourneyType } from '@journiz/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'
import icons from '~/assets/icons'

defineProps<{ journey: JourneyType }>()

const MarkerIcon = computed(() => icons.marker)

const complete = computed(() => {
  // TODO: Get related trips and check if there are completed ones
  return false
  // return props.journey === 'complete'
})

const emit = defineEmits(['deleteJourney', 'editJourney'])
</script>
<template>
  <div class="content w-full flex px-6 py-4 bg-white rounded-xl">
    <div class="flex-1 flex flex-col mr-8">
      <div class="name text-blue-900 font-bold text-base">
        {{ journey.name }}
      </div>
      <div class="w-full flex text-blue-900 font-normal text-base">
        <div v-if="journey.basecampName" class="basecamp flex items-center">
          <MarkerIcon />{{ journey.basecampName }}
        </div>
        <div v-if="journey.tags" class="tags mt-3">
          <div v-for="tag in journey.tags" :key="tag" class="flex items-center">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-auto flex gap-2">
      <SquareButton v-if="!complete" icon="play" :activated="true" />
      <SquareButton v-if="!complete" icon="qr" />
      <SquareButton v-if="complete" :activated="true" icon="podium" />
      <SquareButton icon="edit" @click="emit('editJourney')" />
      <SquareButton icon="share" />
      <SquareButton icon="trash" @click="emit('deleteJourney')" />
    </div>
  </div>
</template>

<style>
.content {
  max-width: 822px;
}
</style>
