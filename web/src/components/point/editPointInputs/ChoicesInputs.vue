<script setup lang="ts">
import { computed, PropType } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Sortable from '~/components/forms/Sortable.vue'
import CheckboxInput from '~/components/forms/CheckboxInput.vue'

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
    <Sortable
      v-model="answers"
      class=""
      item-key="id"
      transition-name="drag-list"
      :sortable-options="{
        handle: '.handle',
        // group: 'answers',
      }"
    >
      <template #item="{ item: answer }">
        <div class="flex gap-2 items-center bg-beige px-2 rounded-xl mb-2">
          <TextInput v-model="answer.text" />
          <div v-if="answerType === 'choice'" class="gap-2 relative flex">
            <label class="whitespace-nowrap font-light mr-8" for="checkbox"
              >Bonne réponse ?
            </label>
            <CheckboxInput v-model="answer.isCorrect" />
          </div>
          <button class="ml-2" @click="removeChoiceAnswer(answer.id)">
            <span class="block i-uil:trash-alt h-6 text-2xl color-red" />
          </button>
          <button class="handle cursor-grab">
            <span class="block i-uil:draggabledots h-6 text-2xl color-red" />
          </button>
        </div>
      </template>
    </Sortable>
    <DefaultButton class="ml-auto" color="secondary" @click="addChoiceAnswer"
      >Ajouter une réponse</DefaultButton
    >
  </div>
</template>
