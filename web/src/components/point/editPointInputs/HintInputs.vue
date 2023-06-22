<script setup lang="ts">
import { computed, PropType } from 'vue'
import { nanoid } from 'nanoid'
import TextInput from '~/components/forms/TextInput.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import Sortable from '~/components/forms/Sortable.vue'

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
    <Sortable
      v-model="hints"
      class=""
      item-key="id"
      transition-name="drag-list"
      :sortable-options="{
        handle: '.handle',
      }"
    >
      <template #item="{ item: hint }">
        <div class="flex gap-2 items-center bg-beige px-2 rounded-xl mb-2">
          <TextInput v-model="hint.text" />
          <button class="ml-2" @click="removeChoiceHint(hint.id)">
            <span class="block i-uil:trash-alt h-6 text-2xl color-red" />
          </button>
          <button class="handle cursor-grab">
            <span class="block i-uil:draggabledots h-6 text-2xl color-red" />
          </button>
        </div>
      </template>
    </Sortable>
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
