<script lang="ts" setup="">
const emit = defineEmits(['next'])
</script>
<template>
  <div class="bg-red">
    <div>Name</div>
    <button @click="emit('next')">Next</button>
  </div>
</template>
