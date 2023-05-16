<script setup lang="ts">
import { ref, toRefs, defineProps, watch, onMounted } from 'vue'
import { Point as PointType } from '@journiz/api-types'
import TextInput from '~/components/forms/TextInput.vue'
import SelectInput from '~/components/forms/SelectInput.vue'

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
const answerLocation = ref({ long: 0, lat: 0 })
const long = ref('')
const lat = ref('')

watch(
  answers,
  (newVal) => {
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
      answers.value = point.value.answer as any[]
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
  answerType.value = value
  emit('update:answerType', answerType.value)
  if (answerType.value === 'image') {
    console.log('choice')
  }
  if (answerType.value === 'location') {
    console.log('location')
  }
}

function addChoiceAnswer() {
  answers.value.push(['', false])
  point.value.answer = answers.value
}

function removeChoiceAnswer(index) {
  answers.value.splice(index, 1)
  point.value.answer = answers.value
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
      <input v-model="answerLocation.long" type="number" label="Longitude" />
      <input v-model="answerLocation.lat" type="number" label="Latitude" />
    </div>
    <div v-if="['choice', 'text'].includes(answerType)">
      <label for="">Réponses</label>
      <div v-for="(answer, index) in answers" :key="index">
        <TextInput v-model="answer[0]" label="" />
        <div v-if="answerType === 'choice'">
          <label for="checkbox">Bonne réponse ? </label>
          <input v-model="answer[1]" type="checkbox" />
        </div>
        <button @click="removeChoiceAnswer(index)">Supprimer la réponse</button>
      </div>
      <button @click="addChoiceAnswer">Ajouter une réponse</button>
    </div>
  </div>
</template>
