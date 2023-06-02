<script setup lang="ts">
import { ref } from 'vue'
import FormLogin from '~/components/auth/FormLogin.vue'
import FormForgotPassword from '~/components/auth/FormForgotPassword.vue'
import FormRegister from '~/components/auth/FormRegister.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
const displayMissingPwd = ref(false)
const displayRegister = ref(false)
</script>
<template>
  <section class="bg-white-off h-screen">
    <div class="flex bg-white-off h-full">
      <div class="left w-1/2 h-full flex items-center">
        <form-login
          v-if="!displayMissingPwd"
          @displayMissingPassword="displayMissingPwd = true"
        />
        <FormForgotPassword v-if="displayMissingPwd" />
      </div>
      <div class="right w-1/2 h-full flex items-center">
        <FormRegister />
      </div>
      <div
        class="absolute z-1 bg-red left-0 top-0 w-1/2 h-full transition flex items-center justify-center duration-700"
        :class="displayRegister ? 'translate-x-0' : 'translate-x-full'"
      >
        <img
          class="object-cover object-center w-full h-full absolute top-0 left-0"
          src="../../assets/images/backgroundImage/bg-login.jpg"
          alt="Illustration login"
        />
        <DefaultButton
          class="relative"
          color="white"
          @click="displayRegister = !displayRegister"
        >
          {{ !displayRegister ? "S'inscrire" : 'Se connecter' }}
        </DefaultButton>
      </div>
    </div>
  </section>
</template>
<style></style>
