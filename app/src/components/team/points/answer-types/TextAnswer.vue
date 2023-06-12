<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { ref } from 'vue'
import Button from '~/components/design-system/Button.vue'
import useTeamAnswer from '~/composables/useTeamAnswer'

const props = defineProps<{
  point: Point
}>()

const answer = ref('')
const { sendAnswer, loading: validationLoading } = useTeamAnswer(
  props.point,
  false,
  false
)
const submit = async () => {
  if (!answer.value) return
  await sendAnswer(answer.value)
}
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
      @click="submit"
      >Valider</Button
    >
  </div>
</template>
