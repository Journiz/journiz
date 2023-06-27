<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import CustomHeader from '~/components/layout/CustomHeader.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'

import { useJourneyStore } from '~/stores/journey'
import SelectInput from '~/components/forms/SelectInput.vue'
import TextInput from '~/components/forms/TextInput.vue'
import { useUserStore } from '~/stores/user'

const selectChoices = [
  { value: 'français', content: 'Français' },
  { value: 'english', content: 'Anglais' },
  { value: 'spanish', content: 'Espagnol' },
]
const router = useRouter()

const userStore = useUserStore()
const journeyStore = useJourneyStore()

const name = ref('')
const city = ref('')

const newJourney = async () => {
  const journeyId = await journeyStore.newJourney(
    userStore.user!.id,
    name.value,
    city.value
  )
  if (journeyId) {
    await router.push({
      name: 'basecamp-journey',
      params: { journeyId },
    })
  }
}
</script>
<template>
  <form class="relative pt-10 px-16 h-full w-full" @submit.prevent="newJourney">
    <img
      class="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none"
      src="../../../assets/images/backgroundImage/formJourneyBg.png"
      alt="Background"
    />
    <CustomHeader title="Informations du nouveau parcours" class="mb-19" />

    <div class="m-w-full w-131 bg-beige py-10 px-18 mx-auto rounded-md">
      <h2 class="text-center font-medium text-xl mb-8">Où allez-vous ?</h2>
      <TextInput v-model="name" class="mb-4" label="Nom du parcours" />
      <TextInput v-model="city" class="mb-4" label="Ville" />
      <SelectInput
        class="mb-4"
        :choices="selectChoices"
        empty-quote="Choisir une langue"
        label="Langue"
        name="lang"
      />
      <default-button
        class="mx-auto"
        type="submit"
        :loading="false"
        variant="fill"
        >Suivant</default-button
      >
    </div>
  </form>
</template>
