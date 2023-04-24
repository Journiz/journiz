<script setup lang="ts">
import { Point as PointType } from '@journiz/api-types'
import SquareButton from '~/components/buttons/SquareButton.vue'

defineProps<{ point: PointType }>()

const emit = defineEmits(['deletePoint', 'editPoint'])
</script>
<template>
  <div class="content w-full flex px-6 py-4 bg-white rounded-xl">
    <div class="flex-1 flex flex-col mr-8">
      <div class="name text-blue-900 font-bold text-base">
        {{ point.name }}
      </div>
      <div class="w-full flex text-blue-900 font-normal text-base">
        <div v-if="point.answerType" class="basecamp flex items-center">
          {{ point.answerType }}&nbsp;
        </div>
        <div v-if="point.score" class="basecamp flex items-center">
          - {{ point.score.toString() }} pts
        </div>
      </div>
    </div>
    <div class="w-auto flex gap-2">
      <SquareButton icon="edit" @click="emit('editPoint')" />
      <SquareButton icon="trash" @click="emit('deletePoint')" />
    </div>
  </div>
</template>

<style>
.content {
  max-width: 822px;
}
</style>
