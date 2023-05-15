<script setup></script>
<template>
  <h1 class="relative text-black font-bold text-3xl"><slot /></h1>
</template>
<style scoped>
h1::after {
  content: url('~/assets/images/svg/underline-h1.svg');
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  transform: translateY(50%);
}
</style>
