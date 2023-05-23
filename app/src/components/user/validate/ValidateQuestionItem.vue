<script lang="ts" setup="">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref } from 'vue'

const detailOpen = ref(false)
</script>
<template>
  <div class="flex flex-col gap-8">
    <div class="border border-green-dark rounded-lg flex flex-col">
      <button
        class="w-full py-4 px-8 text-center text-lg font-medium relative"
        @click="detailOpen = !detailOpen"
      >
        Le lac
        <span
          class="absolute block right-3 top-1/2 transform -translate-y-1/2 i-fluent:caret-down-24-filled text-28px transition duration-200"
          :class="detailOpen ? 'rotate-180' : ''"
        ></span>
      </button>
      <CollapseTransition
        :duration="300"
        easing="cubic-bezier(0.77, 0, 0.175, 1)"
      >
        <div v-show="detailOpen">
          <div class="mx-6 my-4">
            Le lac d'Annecy est un joyau naturel situé dans les Alpes
            françaises, réputé pour ses eaux cristallines et son cadre
            exceptionnel entouré de montagnes. Prenez une photo devant le lieu
            suivant : <br /><br />
            Il lit énormément, discret et silencieux, certains y gagne
            naturellement en sérénité
          </div>
        </div>
      </CollapseTransition>
    </div>
    <div class="font-light text-center">L'équipe a répondu:</div>
    <img src="https://picsum.photos/1920/1080" class="rounded-lg" />
  </div>
</template>
