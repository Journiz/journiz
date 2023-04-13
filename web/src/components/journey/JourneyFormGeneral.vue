<script setup>
import TextInput from '~/components/forms/TextInput.vue'
import SelectInput from '~/components/forms/SelectInput.vue'

const selectChoices = [
  { value: 'français', content: 'Français' },
  { value: 'anglais', content: 'Anglais' },
  { value: 'espagnole', content: 'Espagnole' },
]
</script>
<template>
  <form class="m-w-full w-md bg-blue-200 py-10 px-18 mx-auto rounded-md">
    <TextInput label="Nom du parcours" name="name" />
    <TextInput label="Ville" name="town" />
    <SelectInput
      :choices="selectChoices"
      empty-quote="Choisir une langue"
      label="Langue"
      name="lang"
    />
  </form>
</template>
