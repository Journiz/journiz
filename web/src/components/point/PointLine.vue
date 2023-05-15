<script setup lang="ts">
import { Point as PointType } from '../../../../packages/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'

defineProps<{ point: PointType }>()

const emit = defineEmits(['deletePoint', 'editPoint'])
</script>
<template>
  <div :class="point.trigger ? 'pl-6' : ''">
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
</template>

<style>
.content {
  max-width: 822px;
}
</style>
