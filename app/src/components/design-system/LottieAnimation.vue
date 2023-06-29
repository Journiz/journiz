<script lang="ts" setup="">
import { ref } from 'vue'

defineProps<{
  animationName: string
}>()
const hasBeenLoaded = ref(false)
</script>
<template>
  <dotlottie-player
    class="w-full h-full transition duration-150 ease-out-quad transform"
    :class="hasBeenLoaded ? '' : 'opacity-0 scale-50'"
    :src="`/lottie/${animationName}.lottie`"
    autoplay="true"
    loop="true"
    @ready="hasBeenLoaded = true"
  />
</template>
