<script setup lang="ts">
import { computed, PropType } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

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
}
function removeChoiceAnswer(id: string) {
  answers.value = answers.value.filter((a) => a.id !== id)
}
</script>
<template>
  <div>
    <div class="font-medium text-sm">Réponses</div>
    <div
      v-for="answer in answers"
      :key="answer.id"
      class="flex gap-2 items-center bg-beige px-2 rounded-xl mb-2"
    >
      <TextInput v-model="answer.text" />
      <div v-if="answerType === 'choice'" class="gap-2">
        <label class="whitespace-nowrap font-light" for="checkbox"
          >Bonne réponse ?
        </label>
        <input v-model="answer.isCorrect" type="checkbox" />
      </div>
      <button @click="removeChoiceAnswer(answer.id)">
        <div class="i-uil:trash-alt h-6 text-2xl color-red" />
      </button>
    </div>
    <DefaultButton class="ml-auto" color="secondary" @click="addChoiceAnswer"
      >Ajouter une réponse</DefaultButton
    >
  </div>
</template>
