<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'

const props = defineProps<{
  point: Point
  validationLoading: boolean
}>()
const emit = defineEmits<{
  answer: [data: string]
}>()
const answer = ref('')
</script>
<template>
  <div class="flex flex-col">
    <textarea
      v-model="answer"
      class="outline-none p-4 rounded-lg shadow resize-none h-40"
      placeholder="Écrivez votre réponse ici"
    ></textarea>
    <Button
      color="theme"
      class="mt-4"
      :disabled="!answer"
      :loading="validationLoading"
      @click="emit('answer', answer)"
      >Valider</Button
    >
  </div>
</template>
