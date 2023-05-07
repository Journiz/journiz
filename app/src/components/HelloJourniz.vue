<script lang="ts" setup>
import logo from '~/assets/logo/text.svg?raw'
import Button from '~/components/design-system/Button.vue'
</script>
<template>
  <div
    class="flex flex-col items-center px-12 pb-8 justify-end text-green-dark gap-6"
  >
    <div class="w-52" v-html="logo"></div>
    <p class="text-center px-4 font-light">
      Rejoignez votre prochain parcours dès maintenant !
    </p>
    <div class="flex flex-col gap-3 w-full">
      <Button color="green" :to="{ name: 'join' }">Je suis un élève</Button>
      <Button :to="{ name: 'user-login' }">Je suis un prof</Button>
    </div>
  </div>
</template>
