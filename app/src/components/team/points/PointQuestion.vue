<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { useFileUrl } from '@journiz/composables'
import { computed, toRefs } from 'vue'

const props = defineProps<{
  point: Point
}>()
const { point } = toRefs(props)
const mediaUrl = useFileUrl(point, 'media')

const description = computed(() => {
  return point.value.description?.replace(/\n/g, '<br />')
})
const question = computed(() => {
  return point.value.question?.replace(/\n/g, '<br />')
})
</script>
<template>
  <div class="col gap-4 text-center">
    <img
      v-if="mediaUrl"
      :src="mediaUrl"
      alt=""
      class="w-full h-50 object-contain"
    />
    <img
      v-else
      alt=""
      class="w-full h-50 object-contain"
      :src="`/fallback-images/${point.fallbackMedia}.png`"
    />
    <p class="font-light" v-html="description"></p>
    <p class="font-bold text-theme" v-html="question"></p>
  </div>
</template>
