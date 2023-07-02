<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { PointQuestion } from '@journiz/app'
import PointPreviewAnswer from '~/components/point/preview/PointPreviewAnswer.vue'
import PointPreviewHint from '~/components/point/preview/PointPreviewHint.vue'

defineProps<{
  point?: Point
}>()
</script>
<template>
  <div class="w-full h-full px-4 flex justify-center w-full">
    <div
      v-if="point"
      class="flex flex-col w-96 py-4 px-6 border-2 border-green rounded-42px overflow-y-auto bg-white"
    >
      <PointQuestion :key="point.id" class="mb-8" :point="point" />
      <PointPreviewAnswer :key="point.id" :point="point" />
      <PointPreviewHint
        v-if="point.hint?.length"
        :key="point.id"
        :point="point"
      />
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center h-full text-green opacity-50"
    >
      <span class="i-uil:eye text-36px"></span>
      <span class="mt-2 mb-16 max-w-80 text-center">
        Sélectionnez un point dans la liste voir à quoi il ressemblera dans
        l'application.
      </span>
    </div>
  </div>
</template>
