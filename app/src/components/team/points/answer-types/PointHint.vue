<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  point: Point
}>()
const openHints = useStorage('openHints-' + props.point.id, 0)
const penaltyByHint = Math.round(props.point.score / 4)

const selectedHint = ref<number>(-1)
const openHint = (index: number) => {
  if (index + 1 > openHints.value) {
    alert('warn')
    openHints.value!++
  }
  selectedHint.value = index
}
</script>
<template>
  <div class="mt-2 flex flex-col">
    <div
      class="grid gap-x-2"
      :class="point.hint.length > 1 ? 'grid-cols-2' : ''"
    >
      <button
        class="tab-btn border-2 text-theme border-theme"
        :class="selectedHint === 0 ? 'open' : ''"
        @click="openHint(0)"
      >
        Indice 1
      </button>
      <button
        v-if="point.hint.length > 1"
        class="tab-btn border-2 text-green-dark border-green-dark"
        :class="selectedHint === 1 ? 'open' : ''"
        @click="openHint(1)"
      >
        Indice 2
      </button>
      <div
        class="border-l-2 border-r-2 border-theme h-3"
        :class="selectedHint === 0 ? 'opacity-100' : 'opacity-0'"
      ></div>
      <div
        v-show="point.hint.length > 1"
        class="border-l-2 border-r-2 border-green-dark h-3 -mt-px"
        :class="selectedHint === 1 ? 'opacity-100' : 'opacity-0'"
      ></div>
    </div>
    <div
      v-if="selectedHint > -1"
      class="border border-2 border-t-0 text-center p-4 rounded-b-xl -mt-px relative flex flex-col gap-2"
      :class="selectedHint === 0 ? 'border-theme' : 'border-green-dark'"
    >
      <span
        class="half-border"
        :class="
          selectedHint === 0 ? 'left-half bg-theme' : 'left-0 bg-green-dark'
        "
      >
      </span>
      <span class="font-light">
        {{ point.hint[selectedHint].text }}
      </span>
      <span class="font-medium text-theme text-center">
        - {{ penaltyByHint }} points
      </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tab-btn {
  border-style: solid;
  @apply font-medium text-center rounded-xl py-5 px-6;
  &.open {
    @apply border-b-0 rounded-b-0;
  }
}

.half-border {
  @apply absolute top-0 h-0.5;
  width: calc(50% + 6px);
  &.left-half {
    left: calc(50% - 6px);
  }
}
</style>
