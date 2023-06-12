<script lang="ts" setup="">
import { Point } from '@journiz/api-types'
import { useFileUrl } from '@journiz/composables'
import { toRefs } from 'vue'
const props = defineProps<{
  point: Point
}>()
const { point } = toRefs(props)
const mediaUrl = useFileUrl(point, 'media')
</script>
<template>
  <div class="col gap-4 text-center">
    <img
      v-if="mediaUrl"
      :src="mediaUrl"
      alt=""
      class="w-full h-50 object-contain"
    />
    <div v-else class="w-full h-50 bg-red/50"></div>
    <p class="font-light">{{ point.description }}</p>
    <p class="font-bold text-theme">{{ point.question }}</p>
  </div>
</template>
