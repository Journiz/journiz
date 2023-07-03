<script setup lang="ts">
import DefaultButton from '~/components/buttons/DefaultButton.vue'

const emit = defineEmits(['closeWindow'])

const answerTypeIndex = {
  choice: 'QCM',
  photo: 'Photo',
  text: 'Texte',
  image: 'Image',
  location: 'Position',
  audio: 'Enregistrement audio',
}

defineProps<{
  item?: object
}>()
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
      v-if="item"
      class="relative max-w-3xl py-11 px-35 bg-beige-light rounded-xl custom-shadow w-full"
    >
      <img
        class="absolute left-0 top-0 object-cover object-center w-full h-full"
        src="../../assets/images/backgroundImage/bgWindowCommunity.png"
        alt="Background"
      />
      <div class="relative">
        <h3 class="text-2xl font-bold mt-2 text-center">{{ item.name }}</h3>
        <div class="mb-6 text-center">{{ item.score }} pts</div>
        <div v-if="item.description" class="mb-4">
          <span class="font-bold">Énoncé</span> <br />{{ item.description }}
        </div>
        <div class="mb-4">
          <span class="text-red mb-2">Question</span> <br />
          <span class="font-medium">{{ item.question }}</span>
        </div>
        <div class="flex mb-8">
          <div v-if="item.answerType" class="w-fit flex flex-col">
            <div>Réponses</div>
            <div>{{ answerTypeIndex[item.answerType] }}</div>
          </div>
          <div v-if="item.hint" class="w-fit flex flex-col">
            <div v-if="item.hint.count > 0">Indices</div>
            <div v-for="hint in item.hint" :key="hint">{{ hint }}</div>
          </div>
        </div>

        <DefaultButton class="mx-auto" color="secondary"
          >Modifier et ajouter ce point</DefaultButton
        >
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
