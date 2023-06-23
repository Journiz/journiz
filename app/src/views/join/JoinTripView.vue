<script lang="ts" setup="">
import { computed, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { Dialog } from '@capacitor/dialog'
import { useTeamStore } from '~/stores/team/team'
import Page from '~/components/Page.vue'
import JourneyPin from '~/components/join/JourneyPin.vue'
import Button from '~/components/design-system/Button.vue'
import Back from '~/components/router/Back.vue'
import BackButton from '~/components/router/BackButton.vue'
import QrScanner from '~/components/elements/QrScanner.vue'

interface Pin {
  pin: string
}

const tripCode = ref<Pin>()
const canSubmit = computed(() => tripCode.value?.pin.length === 4)

const store = useTeamStore()
const router = useIonRouter()
const join = async (code: string) => {
  const joined = await store.joinTrip(code)
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
const showPin = ref(false)

const showQR = ref(false)
</script>
<template>
  <Page class="flex-col px-7 text-green-dark">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      src="../../assets/img/backgrounds/bg-pin.jpg"
      alt="Background"
    />
    <BackButton
      v-if="showPin"
      class="absolute z-1 left-7 top-safe mt-4"
      @click="showPin = false"
    />
    <Back v-else class="absolute z-1 left-7 top-safe mt-4" default-to="/" />
    <transition mode="out-in">
      <div v-if="showPin" class="col flex-1 relative">
        <div class="flex-1 flex items-center justify-center">
          <div>
            <h2 class="relative text-2xl font-black text-center mb-5">
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
        <Button class="relative mb-9" color="theme" @click="join(tripCode.pin)">
          Valider le code
        </Button>
      </div>
      <div v-else class="flex-1 flex flex-col justify-center relative">
        <div class="flex flex-col gap-3 text-center">
          <span class="text-2xl font-black">Connexion</span>
          <p class="font-light mb-12">Rejoindre une partie</p>
          <Button color="green" @click="showQR = true">
            Scanner le QR Code
          </Button>
          <Button color="red" @click="showPin = true">Entrer le code</Button>
        </div>
      </div>
    </transition>
    <transition>
      <div
        v-if="showQR"
        class="absolute inset-0 w-full h-full bg-green-dark z-2"
      >
        <QrScanner class="w-full h-full" />
        <button
          class="absolute top-safe mt-6 right-6 w-10 h-10 bg-beige-light rounded-full grid place-content-center btn-animation"
          @click="showQR = false"
        >
          <span class="i-uil:multiply text-green-dark text-24px"></span>
        </button>
      </div>
    </transition>
  </Page>
</template>
