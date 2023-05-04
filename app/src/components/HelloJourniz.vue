<script lang="ts" setup>
import logo from '~/assets/logo/text.svg?raw'
</script>
<template>
  <div
    class="flex flex-col items-center px-12 justify-end text-green-dark gap-4"
  >
    <div class="w-52" v-html="logo"></div>
    <p class="text-center px-4">
      Rejoignez votre prochain parcours dès maintenant !
    </p>
  </div>
</template>
