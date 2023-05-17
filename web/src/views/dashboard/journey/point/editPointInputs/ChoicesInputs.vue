<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'

const emit = defineEmits(['addAnswer', 'removeAnswer', 'update:modelValue'])
const props = defineProps({
  answerType: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array as PropType<any[]>,
    required: true,
  },
})
const answers = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
function addChoiceAnswer() {
  answers.value = [
    ...answers.value,
    {
      id: nanoid(),
      text: '',
      isCorrect: false,
    },
  ]
  // point.value.answer = answers.value
}
function removeChoiceAnswer(id: string) {
  answers.value = answers.value.filter((a) => a.id !== id)
  // point.value.answer = answers.value
}
</script>
<template>
  <div>
    <label for="">Réponses</label>
    <div v-for="answer in answers" :key="answer.id">
      <TextInput v-model="answer.text" label="" />
      <div v-if="answerType === 'choice'">
        <label for="checkbox">Bonne réponse ? </label>
        <input v-model="answer.isCorrect" type="checkbox" />
      </div>
      <button @click="removeChoiceAnswer(answer.id)">
        Supprimer la réponse
      </button>
    </div>
    <button @click="addChoiceAnswer">Ajouter une réponse</button>
  </div>
</template>
