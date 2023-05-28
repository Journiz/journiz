<script setup lang="ts">
import { ref, toRefs, defineEmits, watch, onMounted } from 'vue'
import { Point as PointType } from '@journiz/api-types'
import { useJourneyStore } from '~/stores/journey'
import SelectInput from '~/components/forms/SelectInput.vue'

const props = defineProps<{
  point: PointType
}>()
const emit = defineEmits(['pointTrigger', 'update:isTrigger'])

const { point } = toRefs(props)
const trigger = ref('false')
const pointTrigger = ref('')

const store = useJourneyStore()
const pts = store.journey.expand.points
const selectPoints: any = []

pts.forEach((element: any) => {
  if (props.point.id !== element.id) {
    selectPoints.push({ value: element.id, content: element.name })
  }
})

onMounted(() => {
  if (point.value.trigger) {
    trigger.value = 'true'
  }
})

watch(trigger, (newVal) => {
  emit('update:isTrigger', newVal)
})

function pointSelected(value: string) {
  console.log(value)
  emit('pointTrigger', value)
}
</script>

<template>
  <div>
    <div class="flex bg-green color-white py-6 px-4 rounded-lg justify-between">
      <p>{{ point.name }} - {{ point.answerType }}</p>
      <p>{{ point.score }} pts</p>
    </div>
    <div>
      <p class="mt-8 mb-5 font-bold">
        Ce point devient visible pour les participants quand :
      </p>
      <div>
        <div class="flex mb-3">
          <input
            id="dependance-false"
            v-model="trigger"
            class="mr-3"
            type="radio"
            name="dependance-false"
            value="false"
          />
          <label class="font-light cursor-pointer" for="dependance-false"
            >la partie commence</label
          >
        </div>
        <div class="flex">
          <input
            id="dependance-true"
            v-model="trigger"
            class="mr-3"
            type="radio"
            name="dependance-true"
            value="true"
          />
          <label class="font-light cursor-pointer" for="dependance-true"
            >un autre point a été résolu</label
          >
        </div>
      </div>
      <div :class="trigger == 'true' ? '' : 'opacity-40 pointer-events-none'">
        <SelectInput
          :choice="point.trigger"
          :choices="selectPoints"
          empty-quote="Choisir"
          name="dependance"
          @selected="pointSelected"
        />
      </div>
    </div>
  </div>
</template>
