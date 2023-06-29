<script lang="ts" setup="">
import { Point } from '@journiz/api-types'

const props = defineProps<{
  point?: Point
}>()
</script>
<template>
  <div class="w-full h-full p-4">
    <div v-if="point"></div>
    <div
      v-else
      class="flex flex-col justify-center items-center h-full text-green opacity-50"
    >
      <span class="i-uil:eye text-36px"></span>
      <span class="mt-2 mb-16 max-w-56 text-center">
        Sélectionnez un point dans la liste pour voir un aperçu
      </span>
    </div>
  </div>
</template>
