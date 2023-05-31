<script setup lang="ts">
import { ref } from 'vue'
import SelectInput from '~/components/forms/SelectInput.vue'
import ChoicesInputs from '~/components/point/editPointInputs/ChoicesInputs.vue'
import { usePointStore } from '~/stores/point'
import TextareaInput from '~/components/forms/TextareaInput.vue'
import NumberInput from '~/components/forms/NumberInput.vue'
import MediaSlider from '~/components/point/editPointInputs/MediaSlider.vue'

const store = usePointStore()

const answerType = ref('choice')

const selectChoices = [
  { value: 'image', content: 'Image' },
  { value: 'text', content: 'Text' },
  { value: 'choice', content: 'QCM' },
  { value: 'location', content: 'Un lieu' },
]

function handleSelected(value: string) {
  answerType.value = value
}

function handleScoreChange(newScore: number) {
  if (store.point?.score) {
    store.point.score = newScore
  }
}
</script>
<template>
  <div v-if="store.point" class="pb-6 flex-col">
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
        @update:modelValue="handleScoreChange"
      />
    </div>
    <MediaSlider label="Visuel de la question" class="mt-2 mb-5" />
    <TextareaInput
      v-if="store.point.question"
      v-model="store.point.question"
      label="Énoncé"
    />
    <div v-if="answerType == 'image'"></div>
    <ChoicesInputs
      v-if="['choice', 'text'].includes(answerType)"
      v-model="store.point.answer"
      class="overflow-auto"
      :answer-type="answerType"
    />
  </div>
</template>
