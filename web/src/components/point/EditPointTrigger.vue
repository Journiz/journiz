<script setup lang="ts">
import { ref, toRefs, defineEmits } from 'vue'
import { Point as PointType } from '@journiz/api-types'
import { useJourneyStore } from '~/stores/journey'
import SelectInput from '~/components/forms/SelectInput.vue'

const props = defineProps<{
  point: PointType
}>()
const { point } = toRefs(props)
const trigger = ref('false')
const pointTrigger = ref('')

const store = useJourneyStore()
const pts = store.journey.expand.points
const selectPoints: any = []

pts.forEach((element: any) => {
  selectPoints.push({ value: element.id, content: element.name })
})

const emitPointTrigger = defineEmits(['pointTrigger'])

function pointSelected(value) {
  pointTrigger.value = value
  emitPointTrigger('pointTrigger', pointTrigger.value)
}
</script>

<template>
  <div>
    <div>
      <p>{{ point.name }} - {{ point.answerType }}</p>
      <p>{{ point.score }} pts</p>
    </div>
    <div>
      <p>Ce point devient visible pour les participants quand</p>
      <div>
        <pre>{{ trigger }}</pre>
        <input
          v-model="trigger"
          type="radio"
          name="dependance-false"
          value="false"
        />
        <label for="dependance-false">la partie commence</label>
        <input
          v-model="trigger"
          type="radio"
          name="dependance-true"
          value="true"
        />
        <label for="dependance-true">un autre point a été résolu</label>
      </div>
      <div v-if="trigger == 'true'">
        <!-- Mettre select avec tous les point du journey exept this -->
        <SelectInput
          :choice="point.trigger"
          :choices="selectPoints"
          empty-quote="Choisir"
          label=""
          name="dependance"
          @selected="pointSelected"
        />
      </div>
    </div>
  </div>
</template>
