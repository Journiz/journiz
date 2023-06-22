<script setup lang="ts">
import { computed, PropType } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Sortable from '~/components/forms/Sortable.vue'

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
          <div v-if="answerType === 'choice'" class="gap-2 relative">
            <label class="whitespace-nowrap font-light mr-8" for="checkbox"
              >Bonne réponse ?
            </label>
            <input
              v-model="answer.isCorrect"
              class="custom-checkbox"
              type="checkbox"
            />
            <div>
              <svg
                width="27"
                height="19"
                viewBox="0 0 27 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="path"
                  d="M1.5 10.165L8.14996 16.878C8.68628 17.414 9.55265 17.414 10.089 16.878L25.5001 1.37012"
                  stroke="#FF6147"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
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
<style lang="scss" scoped>
.custom-checkbox {
  position: absolute;
  opacity: 0;
  z-index: 1;
  right: 0;
  height: 24px;
  width: 24px;
  &:hover {
    cursor: pointer;
  }
  & + div {
    position: absolute;
    right: 0;
    display: inline-block;
    vertical-align: text-top;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 5px;
    filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
    &:hover {
      cursor: pointer;
    }
  }
  & + div svg {
    position: absolute;
    left: 5px;
    .path {
      stroke-dasharray: 34;
      stroke-dashoffset: 34;
      transition: all 0.3s;
    }
  }
  &:checked + div svg {
    .path {
      stroke-dashoffset: 0;
    }
  }
}
</style>
