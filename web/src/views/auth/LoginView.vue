<script setup lang="ts">
import FormLogin from '~/components/auth/FormLogin.vue'
import AuthStatus from '~/components/auth/AuthStatus.vue'
import FormForgotPassword from '~/components/auth/FormForgotPassword.vue'
import FormRegister from '~/components/auth/FormRegister.vue'
</script>
<template>
  <section>
    <AuthStatus />
    <form-login />
    <FormForgotPassword />
    <FormRegister />
  </section>
</template>
<style></style>
