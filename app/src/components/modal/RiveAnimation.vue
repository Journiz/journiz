<script lang="ts" setup="">
import { onMounted, onUnmounted, ref } from 'vue'
import { Rive } from '@rive-app/canvas'

const props = defineProps<{
  name: string
}>()
const canvas = ref()
let rive: Rive | undefined
const loaded = ref(false)
onMounted(() => {
  rive = new Rive({
    src: '/rive/' + props.name + '.riv',
    canvas: canvas.value,
    autoplay: true,
    // layout: new Layout({ fit: 'fitHeight', alignment: 'center' }),
  })
  // @ts-expect-error wrong types in rive
  rive.on('load', () => {
    loaded.value = true
  })
})

onUnmounted(() => {
  rive?.cleanup()
  rive = undefined
})
</script>
<template>
  <canvas
    ref="canvas"
    width="500"
    height="500"
    class="transition duration-200 transform"
    :class="{ 'opacity-0 scale-50': !loaded }"
  ></canvas>
</template>
