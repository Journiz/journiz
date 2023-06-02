<script lang="ts" setup="">
import { ref } from 'vue'
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/design-system/Button.vue'
import RiveAnimation from '~/components/modal/RiveAnimation.vue'

const title = ref('titre')
const text = ref(
  `Gardez toujours un œil sur votre environnement et assurez-vous d'être à l'arrêt en toute sécurité avant de consulter votre téléphone.`
)
</script>
<template>
  <Modal>
    <div class="w-full flex flex-col gap-6">
      <h1 class="text-base font-black m-0 text-center">{{ title }}</h1>
      <div class="w-full h-48 grid place-content-center">
        <RiveAnimation class="h-full w-full" name="test" />
      </div>
      <p class="font-light text-sm text-center">{{ text }}</p>
      <div class="flex flex-col w-full">
        <Button>Hey</Button>
      </div>
    </div>
  </Modal>
</template>
