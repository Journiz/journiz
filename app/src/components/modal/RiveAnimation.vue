<script lang="ts" setup="">
import { onMounted, onUnmounted, ref } from 'vue'
import { Rive, Layout } from '@rive-app/canvas'

const props = defineProps<{
  name: string
}>()
const canvas = ref()
let rive: Rive | undefined
onMounted(() => {
  rive = new Rive({
    src: '/rive/' + props.name + '.riv',
    canvas: canvas.value,
    autoplay: true,
    // layout: new Layout({ fit: 'fitHeight', alignment: 'center' }),
  })
})

onUnmounted(() => {
  rive?.cleanup()
  rive = undefined
})
</script>
<template>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>
