<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Point } from '@journiz/api-types'
import { useFileUrl, usePocketBase } from '@journiz/composables'
import { storeToRefs } from 'pinia'
import SelectInput from '~/components/forms/SelectInput.vue'
import HintInputs from '~/components/point/editPointInputs/HintInputs.vue'
import ChoicesInputs from '~/components/point/editPointInputs/ChoicesInputs.vue'
import { usePointStore } from '~/stores/point'
import TextareaInput from '~/components/forms/TextareaInput.vue'
import NumberInput from '~/components/forms/NumberInput.vue'
import MediaSlider from '~/components/point/editPointInputs/MediaSlider.vue'
import SquareButton from '~/components/buttons/SquareButton.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

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

const penaltyByHint = computed(() => {
  return Math.round((store.point?.score ?? 0) / 4)
})
const { point } = storeToRefs(store)
const mediaUrl = useFileUrl(point, 'media' as never)

const removeMedia = () => {
  if (store.point) {
    store.point.media = ''
  }
}

const pb = usePocketBase()
const addFileLoading = ref(false)
const onAddFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    addFileLoading.value = true
    const data = new FormData()
    data.append('media', file)
    await pb.collection('point').update(store.point!.id, data)
    await store.refresh()
    addFileLoading.value = false
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
    <div v-if="mediaUrl" class="mt-4 mb-4 flex flex-col">
      <label class="text-black font-medium mb-2">Visuel de la question</label>
      <div
        class="bg-white rounded-md h-46 relative overflow-hidden rounded-lg custom-shadow group"
      >
        <img
          :src="mediaUrl"
          alt=""
          class="inset-0 w-full h-full object-cover"
        />
        <DefaultButton
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
          color="secondary"
          @click="removeMedia"
        >
          <span class="i-uil:trash"></span>
          Supprimer l'image
        </DefaultButton>
      </div>
    </div>
    <MediaSlider
      v-else
      v-model="store.point.fallbackMedia"
      label="Visuel de la question"
      class="mt-2 mb-4"
    />
    <div class="flex items-center mb-4">
      <p>{{ mediaUrl ? 'Remplacer' : 'Ou remplacer' }} le visuel par &nbsp;</p>
      <SquareButton
        class="mr-2"
        color="secondary"
        icon="photo"
        :loading="addFileLoading"
        @click="addMedia('photo')"
      />
      <!--      <p>ou &nbsp;</p>-->
      <!--      <SquareButton-->
      <!--        class="mr-2"-->
      <!--        color="secondary"-->
      <!--        icon="audio"-->
      <!--        @click="addMedia('audio')"-->
      <!--      />-->
      <!--      <p>ou &nbsp;</p>-->
      <!--      <SquareButton-->
      <!--        class="mr-2"-->
      <!--        color="secondary"-->
      <!--        icon="video"-->
      <!--        @click="addMedia('video')"-->
      <!--      />-->
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        :accept="accept"
        @change="onAddFile"
      />
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
    <HintInputs
      v-model="store.point.hint"
      :penalty="penaltyByHint"
      class="overflow-auto mt-4"
    />
  </div>
</template>
<style scoped>
.explanation {
  @apply text-sm font-light italic text-black/80;
}
</style>
