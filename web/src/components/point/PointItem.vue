<script setup lang="ts">
import { computed } from 'vue'
import SquareButton from '~/components/buttons/SquareButton.vue'
import { PointWithDependents } from '~/types/points'
import Sortable from '~/components/forms/Sortable.vue'

const props = defineProps<{
  point: PointWithDependents
  currentItemId: String
  level: number
}>()
const emit = defineEmits(['deletePoint', 'editPoint', 'sort-dependents'])

const dependents = computed({
  get() {
    return props.point.dependents
  },
  set(val) {
    emit('sort-dependents', val)
  },
})
</script>
<template>
  <div :class="point.trigger ? 'pl-8 pt-4' : ''">
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
      <div
        class="content w-full flex px-3 py-3 bg-white rounded-xl overflow-visible -outline-offset-1 transition-all drop-shadow-md"
        :class="
          point.id === currentItemId ? 'outline-red outline outline-1' : ''
        "
      >
        <button
          class="cursor-grab flex-shrink-0 mr-2"
          :class="`handle-${level}`"
        >
          <span class="block i-uil:draggabledots h-6 text-2xl color-red" />
        </button>
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
            @click="emit('editPoint', point.id)"
          />
          <SquareButton
            color="secondary"
            icon="trash"
            @click="emit('deletePoint', point.id)"
          />
        </div>
      </div>
    </div>

    <Sortable
      v-if="dependents?.length"
      v-model="dependents"
      class=""
      item-key="id"
      transition-name="drag-list"
      :sortable-options="{
        handle: '.handle-' + (level + 1),
      }"
    >
      <template #item="{ item: subPoint }">
        <PointItem
          :point="subPoint"
          :level="level + 1"
          :current-item-id="currentItemId"
          @edit-point="emit('editPoint', $event)"
          @delete-point="emit('deletePoint', $event)"
        />
      </template>
    </Sortable>
  </div>
</template>

<style>
.content {
  max-width: 822px;
}
</style>
