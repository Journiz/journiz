<script lang="ts" setup>
import logo from '~/assets/logo/text.svg?raw'
import Button from '~/components/design-system/Button.vue'
</script>
<template>
  <div
    class="flex flex-col items-center pb-8 justify-end text-green-dark gap-6 bg-beige-light"
  >
    <div class="w-full h-auto">
        <img class="object-cover object-center w-full h-full" src="/homeImage.png" alt="home illustration">
    </div>
      <div class="w-52" v-html="logo"></div>
    <p class="text-center px-12 font-light">
      Rejoignez votre prochain parcours dès maintenant !
    </p>
    <div class="flex flex-col px-12 gap-3 w-full">
      <Button color="green" :to="{ name: 'join' }" replace
        >Je suis un élève</Button
      >
      <Button :to="{ name: 'user-login' }" replace>Je suis un prof</Button>
    </div>
  </div>
</template>
