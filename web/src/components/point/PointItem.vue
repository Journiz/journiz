<script setup lang="ts">
import { Point as PointType } from '../../../../packages/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'

defineProps<{ point: PointType }>()

const emit = defineEmits(['deletePoint', 'editPoint'])
</script>
<template>
  <div :class="point.trigger ? 'pl-6 pt-4' : ''">
    <div class="flex relative">
      <svg
        v-if="point.trigger"
        class="absolute w-4 h-auto -left-6 top-1/2 translate-y-[-50%]"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1"
          y1="0.5"
          x2="1"
          y2="16.5"
          stroke="#00231E"
          stroke-width="2"
        />
        <line
          x1="1"
          y1="0.5"
          x2="1"
          y2="16.5"
          stroke="#00231E"
          stroke-opacity="0.75"
          stroke-width="2"
        />
        <line y1="16.5" x2="16" y2="16.5" stroke="#00231E" stroke-width="2" />
        <line
          y1="16.5"
          x2="16"
          y2="16.5"
          stroke="#00231E"
          stroke-opacity="0.75"
          stroke-width="2"
        />
      </svg>
      <div class="content w-full flex px-3 py-3 bg-green-dark/4 rounded-xl">
        <div class="flex-1 flex flex-col mr-8">
          <div class="name text-black font-medium text-base">
            {{ point.name }}
          </div>
          <div class="w-full flex text-green font-medium text-base">
            <div v-if="point.answerType" class="flex items-center w-fit">
              {{ point.answerType }}&nbsp;
            </div>
            <div v-if="point.score" class="flex items-center">
              - {{ point.score.toString() }} pts
            </div>
          </div>
        </div>
        <div class="w-auto flex gap-2">
          <SquareButton
            color="secondary"
            icon="edit"
            @click="emit('editPoint')"
          />
          <SquareButton
            color="secondary"
            icon="trash"
            @click="emit('deletePoint')"
          />
        </div>
      </div>
    </div>
    <PointItem v-if="point.dependents[0]" :point="point.dependents[0]" />
  </div>
</template>

<style>
.content {
  max-width: 822px;
}
</style>
