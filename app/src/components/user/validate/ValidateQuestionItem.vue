<script lang="ts" setup="">
// @ts-expect-error Lib not typed
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref, toRefs } from 'vue'
import { Answer, Point } from '@journiz/api-types'
import { useFileUrl } from '@journiz/composables'
import Button from '~/components/design-system/Button.vue'

const props = defineProps<{
  answer: Answer & { pointData?: Point }
  updateLoading: boolean
}>()
const { answer } = toRefs(props)
const emit = defineEmits(['correctAnswer'])

const detailOpen = ref(false)
const mediaUrl = useFileUrl(answer, 'answerMedia')
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="border border-green-dark rounded-lg flex flex-col">
      <button
        class="w-full py-4 px-8 text-center text-lg font-medium relative"
        @click="detailOpen = !detailOpen"
      >
        {{ answer.pointData?.name }}
        <span
          class="absolute block right-3 top-1/2 transform -translate-y-1/2 i-fluent:caret-down-24-filled text-28px transition duration-200"
          :class="detailOpen ? 'rotate-180' : ''"
        ></span>
      </button>
      <CollapseTransition
        :duration="300"
        easing="cubic-bezier(0.77, 0, 0.175, 1)"
      >
        <div v-show="detailOpen">
          <div class="mx-6 my-4">
            {{ answer.pointData?.question }}
          </div>
        </div>
      </CollapseTransition>
    </div>
    <div class="font-light text-center flex flex-col gap-2">
      <p class="text-sm italic">L'équipe a répondu:</p>
      <div v-if="answer.pointData?.answerType === 'image'">
        <img :src="mediaUrl" class="rounded-lg w-full" />
      </div>
      <div v-else-if="answer.answerData">
        <p class="font-bold">"{{ answer.answerData }}"</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-2 relative transition duration-150"
      :class="updateLoading ? 'opacity-30' : ''"
    >
      <Button
        color="green"
        :class="{
          'opacity-30': answer.hasBeenValidated && !answer.isCorrect,
        }"
        @click="emit('correctAnswer', true)"
      >
        Bonne réponse
      </Button>
      <Button
        color="red"
        :class="{
          'opacity-50': answer.hasBeenValidated && answer.isCorrect,
        }"
        @click="emit('correctAnswer', false)"
      >
        Mauvaise réponse
      </Button>
      <div
        v-show="updateLoading"
        class="absolute inset-0 grid place-content-center text-red text-32px"
      >
        <div class="i-svg-spinners:180-ring"></div>
      </div>
    </div>
  </div>
</template>
