<script setup>
import TextInput from '~/components/TextInput.vue'
</script>
<template>
  <form class="m-w-full w-md bg-blue-200 py-10 px-18 mx-auto rounded-md">
    <TextInput label="Nom du parcours" name="name" />
    <TextInput label="Ville" name="town" />
  </form>
</template>
