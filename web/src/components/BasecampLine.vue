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
  <div class="bg-blue-200 p-3 flex rounded-xl mb-3 items-center w-fit">
    <IconMarker class="mr-3 color-blue-600 h-5 w-auto" />
    <div class="color-blue-70">Point de raliement : {{ basecampName }}</div>
    <IconEdit
      class="ml-3 color-blue-500 h-5 w-auto cursor-pointer"
      @click="emit('editBasecamp')"
    />
  </div>
</template>
