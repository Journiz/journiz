<script setup lang="ts">
import { useRouter } from 'vue-router'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
const router = useRouter()

const emit = defineEmits(['closeWindow'])
</script>
<template>
  <div
    class="glass-bg absolute top-0 left-0 w-screen h-screen flex items-center justify-center p-4"
  >
    <div
      class="absolute w-full h-full top-0 left-0"
      @click="emit('closeWindow')"
    />
    <div
      class="relative max-w-3xl py-12 px-20 bg-beige-light rounded-xl custom-shadow w-full flex-col flex min-h-[640px] max-h-full"
    >
      <img
        class="absolute left-0 top-0 object-cover object-center w-full h-full"
        src="../../assets/images/backgroundImage/bgShareWindow.png"
        alt="Background"
      />
      <div class="relative">
        <h3 class="text-2xl font-bold mb-6 text-center">
          Vous souhaitez partager ce parcours à la communauté ?
        </h3>
        <div class="mb-6 text-center px-12">
          Ajouter un description et une image à ce parcours pour aider les
          autres professeurs visualiser votre parcours
        </div>
        <DefaultButton color="secondary" class="mb-8 mx-auto"
          >Ajouter une image d'aperçu
          <span class="i-material-symbols:photo-camera-outline" />
        </DefaultButton>
        <textarea
          class="rounded-lg shadow grow mb-5 w-full resize-none p-5"
          placeholder="Voici un parcours créé pour mes élèves de 1ere..."
          rows="10"
        />
        <div class="flex justify-center gap-2">
          <DefaultButton
            color="secondary"
            @click="router.push({ name: 'communityDetail' })"
          >
            Partager
          </DefaultButton>
          <DefaultButton @click="emit('closeWindow')"> Annuler </DefaultButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.glass-bg {
  background: rgba(255, 255, 255, 0.23);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.custom-shadow {
  box-shadow: 0px 1px 3px 0px rgba(0, 35, 30, 0.16);
}
</style>
