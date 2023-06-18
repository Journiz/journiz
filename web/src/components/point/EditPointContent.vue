<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Point } from '@journiz/api-types'
import SelectInput from '~/components/forms/SelectInput.vue'
import HintInputs from '~/components/point/editPointInputs/HintInputs.vue'
import ChoicesInputs from '~/components/point/editPointInputs/ChoicesInputs.vue'
import { usePointStore } from '~/stores/point'
import TextareaInput from '~/components/forms/TextareaInput.vue'
import NumberInput from '~/components/forms/NumberInput.vue'
import MediaSlider from '~/components/point/editPointInputs/MediaSlider.vue'
import SquareButton from '~/components/buttons/SquareButton.vue'

const store = usePointStore()

const selectChoices = [
  { value: 'image', content: 'Image' },
  { value: 'text', content: 'Text' },
  { value: 'choice', content: 'QCM' },
  { value: 'location', content: 'Emplacement du point' },
]

function handleSelected(value: string) {
  if (store.point && value) {
    store.point.answerType = value as NonNullable<Point['answerType']>
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
const fileInput = ref<HTMLInputElement>()
const fileType = ref('')
const accept = computed(() => {
  switch (fileType.value) {
    case 'photo':
      return 'image/*'
    case 'audio':
      return 'audio/*'
    case 'video':
      return 'video/*'
    default:
      return ''
  }
})
async function addMedia(type: string) {
  fileType.value = type
  await nextTick()
  fileInput.value?.click()
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
    <p v-if="store.point.answerType === 'test'" class="explanation">
      Les joueurs répondront sous la forme d'un texte libre que vous pourrez
      valider ou non.
    </p>
    <p v-if="store.point.answerType === 'location'" class="explanation">
      Ce point n'apparaîtra pas sur la carte, les joueurs devront trouver son
      emplacement à partir de l'énigme.
    </p>
    <p v-if="store.point.answerType === 'image'" class="explanation">
      Les joueurs répondront sous la forme d'une photo que vous pourrez valider
      ou non.
    </p>
    <MediaSlider
      v-model="store.point.fallbackMedia"
      label="Visuel de la question"
      class="mt-2 mb-4"
    />
    <div class="flex items-center mb-4">
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
      <input ref="fileInput" class="hidden" type="file" :accept="accept" />
    </div>
    <TextareaInput v-model="store.point.description" label="Énoncé" />
    <TextareaInput v-model="store.point.question" label="Question" />
    <div v-if="store.point.answerType == 'image'"></div>
    <ChoicesInputs
      v-if="['choice'].includes(store.point.answerType)"
      v-model="store.point.answer"
      class="overflow-auto"
      :answer-type="store.point.answerType"
    />
    <HintInputs v-model="store.point.hint" class="overflow-auto" />
  </div>
</template>
<style scoped>
.explanation {
  @apply text-sm font-light italic text-black/80;
}
</style>
