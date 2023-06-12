<script setup lang="ts">
import { computed } from 'vue'
import { Journey as JourneyType } from '@journiz/api-types'
import { useDateFormat } from '@vueuse/core'
import SquareButton from '~/components/buttons/SquareButton.vue'
import icons from '~/assets/icons'

const props = defineProps<{ journey: JourneyType }>()

const MarkerIcon = computed(() => icons.marker)
const EditIcon = computed(() => icons.edit)

const updateDate = useDateFormat(props.journey.updated, 'DD/MM/YYYY')

const complete = computed(() => {
  // TODO: Get related trips and check if there are completed ones
  return false
  // return props.journey === 'complete'
})

const emit = defineEmits(['deleteJourney', 'editJourney'])
</script>
<template>
  <div class="content w-full flex px-6 py-4 bg-green-dark/4 rounded-xl">
    <div class="flex-1 flex flex-col mr-8">
      <div class="name text-green-dark font-medium text-base">
        {{ journey.name }}
      </div>
      <div class="w-full flex text-green font-normal text-base">
        <div
          v-if="journey.basecampName"
          class="basecamp flex items-center mr-2 font-medium"
        >
          <MarkerIcon />{{ journey.basecampName }}
        </div>
        <div v-if="journey.updated" class="flex items-center font-medium">
          <EditIcon />
          Modifié le {{ updateDate }}
        </div>
      </div>
    </div>
    <div class="w-auto flex gap-2">
      <SquareButton v-if="!complete" icon="play" :activated="true" />
      <SquareButton v-if="!complete" icon="qr" />
      <SquareButton
        v-if="complete"
        :activated="true"
        icon="podium"
        color="secondary"
      />
      <SquareButton
        icon="edit"
        color="secondary"
        @click="emit('editJourney')"
      />
      <SquareButton icon="share" color="secondary" />
      <SquareButton
        icon="trash"
        color="secondary"
        @click="emit('deleteJourney')"
      />
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
