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
  { value: 'anglais', content: 'Anglais' },
  { value: 'espagnole', content: 'Espagnole' },
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
  <form class="pt-10 px-16" @submit.prevent="newJourney">
    <CustomHeader title="Informations du nouveau parcours" class="mb-8">
      <default-button type="submit" :loading="false" variant="fill"
        >Suivant</default-button
      >
    </CustomHeader>

    <div class="m-w-full w-md bg-blue-200 py-10 px-18 mx-auto rounded-md">
      <TextInput v-model="name" label="Nom du parcours" />
      <TextInput v-model="city" label="Ville" />
      <SelectInput
        :choices="selectChoices"
        empty-quote="Choisir une langue"
        label="Langue"
        name="lang"
      />
    </div>
  </form>
</template>
