<script setup lang="ts">
import { ref, toRefs, defineProps, watch, onMounted } from 'vue'
import { Point as PointType } from '@journiz/api-types'
import TextInput from '~/components/forms/TextInput.vue'
import SelectInput from '~/components/forms/SelectInput.vue'
import ChoicesInputs from '~/views/dashboard/journey/point/editPointInputs/ChoicesInputs.vue'

const props = defineProps<{
  point: PointType
}>()
const emit = defineEmits([
  'update:answerType',
  'update:answers',
  'update:answerLocation',
])
const { point } = toRefs(props)
const answerType = ref('choice')
const answers = ref<any[]>([])
const answerLocation = ref({ lng: 0, lat: 0 })

watch(
  answers,
  (newVal) => {
    console.log('update answers')
    emit('update:answers', newVal)
  },
  {
    deep: true,
  }
)
watch(
  answerLocation,
  (newVal) => {
    emit('update:answerLocation', newVal)
  },
  {
    deep: true,
  }
)

onMounted(() => {
  if (point.value.answerType) {
    answerType.value = point.value.answerType
  }
  if (point.value.answer) {
    if (answerType.value === 'text' || answerType.value === 'choice') {
      answers.value = point.value.answer as any
    }
    if (answerType.value === 'location') {
      answerLocation.value = point.value.answer as any
    }
  }
})

const selectChoices = [
  { value: 'image', content: 'Image' },
  { value: 'text', content: 'Text' },
  { value: 'choice', content: 'QCM' },
  { value: 'location', content: 'Un lieu' },
]

function handleSelected(value: string) {
  console.log(value)
  answerType.value = value
  emit('update:answerType', answerType.value)
}
</script>
<template>
  <div>
    <SelectInput
      :choice="point.answerType"
      :choices="selectChoices"
      empty-quote="Choisir un mode de réponse"
      label="Type de réponse"
      name="answer"
      @selected="handleSelected"
    />
    <div>
      <label for="point-score">Score</label>
      <input id="point-score" v-model="point.score" type="number" />
    </div>
    <!-- Mettre un Textarea -->
    <TextInput v-model="point.question" label="Énoncé" />
    <div v-if="answerType == 'image'"></div>
    <div v-if="answerType == 'location'">
      <input v-model="answerLocation.lng" type="number" label="Longitude" />
      <input v-model="answerLocation.lat" type="number" label="Latitude" />
    </div>
    <div v-if="['choice', 'text'].includes(answerType)">
      <ChoicesInputs v-model="answers" :answer-type="answerType" />
    </div>
  </div>
</template>
