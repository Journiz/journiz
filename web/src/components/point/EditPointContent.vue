<script setup lang="ts">
import { ref } from 'vue'
import SelectInput from '~/components/forms/SelectInput.vue'
import ChoicesInputs from '~/components/point/editPointInputs/ChoicesInputs.vue'
import { usePointStore } from '~/stores/point'
import TextareaInput from '~/components/forms/TextareaInput.vue'
import NumberInput from '~/components/forms/NumberInput.vue'

const store = usePointStore()

const answerType = ref('choice')
const answerLocation = ref({ lng: 0, lat: 0 })

const selectChoices = [
  { value: 'image', content: 'Image' },
  { value: 'text', content: 'Text' },
  { value: 'choice', content: 'QCM' },
  { value: 'location', content: 'Un lieu' },
]

function handleSelected(value: string) {
  console.log(value)
  answerType.value = value
}
</script>
<template>
  <div>
    <div class="flex gap-12">
      <SelectInput
        class="w-full"
        :choice="store.point.answerType"
        :choices="selectChoices"
        empty-quote="Choisir un mode de réponse"
        label="Type de réponse"
        name="answer"
        @selected="handleSelected"
      />
      <NumberInput
        class="w-fit"
        :model-value="store.point.score.toString()"
        label="Score"
        @update:modelValue="
          (newScore) => (store.point.score = newScore.toString())
        "
      />
    </div>

    <!-- Mettre un Textarea -->
    <TextareaInput v-model="store.point.question" label="Énoncé" />
    <div v-if="answerType == 'image'"></div>
    <div v-if="answerType == 'location'">
      <input v-model="answerLocation.lng" type="number" label="Longitude" />
      <input v-model="answerLocation.lat" type="number" label="Latitude" />
    </div>
    <div v-if="['choice', 'text'].includes(answerType)">
      <ChoicesInputs v-model="store.point.answer" :answer-type="answerType" />
    </div>
  </div>
</template>
