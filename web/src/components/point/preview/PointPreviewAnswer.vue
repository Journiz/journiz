<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { computed } from 'vue'
import Button from '@journiz/app/src/components/design-system/Button.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const props = defineProps<{
  point: Point
}>()
const answers = computed(() => {
  if (props.point.answerType !== 'choice') return []
  return (
    props.point.answer as Extract<
      typeof props.point.answer,
      { id?: string; text?: string; isCorrect?: boolean }[]
    >
  ).slice(0, 4)
})
</script>
<template>
  <div v-if="point.answerType === 'choice'" class="col gap-2">
    <button
      v-for="answer in answers"
      :key="answer.id"
      class="text-left px-6 py-5 rounded-lg shadow btn-animation disabled:opacity-50 bg-white"
    >
      {{ answer.text }}
    </button>
    <DefaultButton class="w-full !py-5 mt-4">Valider</DefaultButton>
  </div>
  <div v-else-if="point.answerType === 'text'" class="col gap-2">
    <textarea
      class="outline-none p-4 rounded-lg shadow resize-none h-40"
      placeholder="Écrivez votre réponse ici"
    ></textarea>
    <DefaultButton class="w-full !py-5 mt-4">Valider</DefaultButton>
  </div>
  <div v-else-if="point.answerType === 'image'" class="col">
    <DefaultButton class="mb-2 mt-4 !py-4 w-full">
      Prendre une photo
    </DefaultButton>
    <DefaultButton class="!py-4 w-full"> Galerie</DefaultButton>
  </div>
  <div v-else-if="point.answerType === 'audio'" class="col items-center gap-2">
    <button class="btn-animation select-none relative group mt-6">
      <span
        class="text-white w-20 h-20 flex items-center justify-center rounded-full transition duration-150 relative bg-green group-active:bg-red"
      >
        <span class="i-uil:microphone block text-32px"></span>
      </span>
    </button>
    <span class="italic font-light text-sm">Maintenir pour enregistrer</span>
    <DefaultButton class="mb-2 mt-4 !py-4 w-full"> Valider </DefaultButton>
  </div>
  <div
    v-else-if="point.answerType === 'location'"
    class="col gap-2 text-center"
  >
    <p class="text-black/80 font-light italic text-sm mt-6">
      Rendez vous à ce lieu et appuyez sur la bouton. Attention, une erreur vous
      fera perdre des points !
    </p>
    <DefaultButton class="mb-2 mt-4 !py-4 w-full"> On y est ! </DefaultButton>
  </div>
</template>
