<script setup>
import IconMarker from '~icons/uil/location-point'
import IconEdit from '~icons/uil/edit'
const emit = defineEmits(['editBasecamp'])
defineProps({
  basecampName: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div
    class="bg-white p-3 flex rounded-xl mb-3 items-center w-fit drop-shadow-md"
  >
    <div class="mr-3 color-green-dark/80 text-5 h-5 w-auto">
      <div class="i-uil:home-alt"></div>
    </div>
    <div class="color-green-dark font-medium">
      Point de raliement : {{ basecampName }}
    </div>
    <IconEdit
      class="ml-3 color-green h-5 w-auto cursor-pointer"
      @click="emit('editBasecamp')"
    />
  </div>
</template>
