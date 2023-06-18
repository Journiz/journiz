<script setup lang="ts">
import { computed, PropType } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const emit = defineEmits(['addHint', 'removeHint', 'update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const hints = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

function addChoiceHint() {
  hints.value = [
    ...hints.value,
    {
      id: nanoid(),
      text: '',
      isCorrect: false,
    },
  ]
}
function removeChoiceHint(id: string) {
  hints.value = hints.value.filter((a) => a.id !== id)
}
</script>
<template>
  <div>
    <div class="font-medium text-sm">Indices</div>
    <div
      v-for="hint in hints"
      :key="hint.id"
      class="flex gap-2 items-center bg-beige px-2 rounded-xl mb-2"
    >
      <TextInput v-model="hint.text" />
      <button class="ml-2" @click="removeChoiceHint(hint.id)">
        <div class="i-uil:trash-alt h-6 text-2xl color-red" />
      </button>
      <button>
        <div class="i-uil:draggabledots h-6 text-2xl color-red" />
      </button>
    </div>
    <DefaultButton class="ml-auto" color="secondary" @click="addChoiceHint"
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
