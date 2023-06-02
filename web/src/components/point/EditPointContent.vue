<script setup lang="ts">
import { ref } from 'vue'
import { useFileUrl, usePoint } from '@journiz/composables'
import { any } from 'zod'
import SelectInput from '~/components/forms/SelectInput.vue'
import HintInputs from '~/components/point/editPointInputs/HintInputs.vue'
import ChoicesInputs from '~/components/point/editPointInputs/ChoicesInputs.vue'
import { usePointStore } from '~/stores/point'
import TextareaInput from '~/components/forms/TextareaInput.vue'
import NumberInput from '~/components/forms/NumberInput.vue'
import MediaSlider from '~/components/point/editPointInputs/MediaSlider.vue'
import SquareButton from '~/components/buttons/SquareButton.vue'

const store = usePointStore()

const answerType = ref('choice')

const selectChoices = [
  { value: 'image', content: 'Image' },
  { value: 'text', content: 'Text' },
  { value: 'choice', content: 'QCM' },
  { value: 'location', content: 'Un lieu' },
]

function handleSelected(value: string) {
  if (store.point) {
    store.point.answerType = value as 'image' | 'text' | 'choice' | 'location'
    save()
  }
}

function handleScoreChange(newScore: number) {
  if (store.point) {
    store.point.score = newScore
    save()
  }
}
async function save() {
  try {
    await store.update()
  } catch (e) {
    console.log(e)
  }
}

function addMedia(type: string) {
  console.log(type)
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
        :model-value="store.point.score"
        label="Score"
        @update:modelValue="handleScoreChange"
      />
    </div>
    <MediaSlider label="Visuel de la question" class="mt-2 mb-5" />
    <div class="flex">
      <p>Ou remplacer le visuel par &nbsp;</p>
      <SquareButton
        class="mr-2"
        color="secondary"
        icon="minus"
        @click="addMedia('photo')"
      />
      <p>ou &nbsp;</p>
      <SquareButton
        class="mr-2"
        color="secondary"
        icon="minus"
        @click="addMedia('audio')"
      />
      <p>ou &nbsp;</p>
      <SquareButton
        class="mr-2"
        color="secondary"
        icon="minus"
        @click="addMedia('video')"
      />
    </div>
    <TextareaInput v-model="store.point.description" label="Énoncé" />
    <TextareaInput v-model="store.point.question" label="Question" />
    <div v-if="answerType == 'image'"></div>
    <ChoicesInputs
      v-if="['choice', 'text'].includes(answerType)"
      v-model="store.point.answer"
      class="overflow-auto"
      :answer-type="answerType"
    />
    <HintInputs v-model="store.point.hint" class="overflow-auto" />
  </div>
</template>
