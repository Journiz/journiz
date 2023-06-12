<script lang="ts" setup="">
import { computed, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { Dialog } from '@capacitor/dialog'
import { useTeamStore } from '~/stores/team/team'
import Page from '~/components/Page.vue'
import JourneyPin from '~/components/join/JourneyPin.vue'
import Button from '~/components/design-system/Button.vue'
import Back from '~/components/router/Back.vue'

interface Pin {
  pin: string
}

defineProps(['modelValue'])
const emmit = defineEmits(['update:modelValue'])

const tripCode = ref<Pin>()
const canSubmit = computed(() => tripCode.value?.pin.length === 4)

const store = useTeamStore()
const router = useIonRouter()
const join = async () => {
  if (tripCode.value && canSubmit) {
    const joined = await store.joinTrip(tripCode.value.pin)
    if (!joined) {
      await Dialog.alert({
        title: 'Partie introuvable',
        message:
          "Cette sortie Journiz n'a pas été trouvée. Avez-vous entré le bon numéro ?",
        buttonTitle: 'Je réessaye !',
      })
      return
    }
    await router.replace('/join')
  }
}
</script>
<template>
  <Page class="flex-col px-7">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-pin.jpg"
      alt="Background"
    />
    <Back class="absolute z-1 left-7 top-4" />
    <div class="flex-1 flex items-center justify-center">
      <div>
        <h2
          class="relative color-green-dark text-2xl font-black text-center mb-5"
        >
          Code de la partie
        </h2>
        <div class="relative text-center mb-7 color-green-dark">
          Entrer le code de la partie que vous souhaitez rejoindre
        </div>
        <JourneyPin
          :model-value="tripCode"
          @update:modelValue="(newValue) => (tripCode = newValue)"
        />
      </div>
    </div>
    <Button class="relative mb-9" color="theme" @click="join"
      >Valider le code</Button
    >
  </Page>
</template>
