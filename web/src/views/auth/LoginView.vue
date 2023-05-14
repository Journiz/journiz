<script setup lang="ts">
import { ref } from 'vue'
import FormLogin from '~/components/auth/FormLogin.vue'
import AuthStatus from '~/components/auth/AuthStatus.vue'
import FormForgotPassword from '~/components/auth/FormForgotPassword.vue'
import FormRegister from '~/components/auth/FormRegister.vue'
const displayMissingPwd = ref(false)
const displaySubscribe = ref(false)
</script>
<template>
  <section>
    <AuthStatus />
    <form-login
      v-if="!displayMissingPwd && !displaySubscribe"
      @display-missing-password="displayMissingPwd = true"
      @display-subscribe="displaySubscribe = true"
    />
    <FormForgotPassword v-if="displayMissingPwd" />
    <FormRegister v-if="displaySubscribe" />
  </section>
</template>
<style></style>
