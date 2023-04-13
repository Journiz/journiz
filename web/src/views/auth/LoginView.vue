<script setup lang="ts">
import FormLogin from '~/components/Auth/FormLogin.vue'
import AuthStatus from '~/components/Auth/AuthStatus.vue'
import FormForgotPassword from '~/components/Auth/FormForgotPassword.vue'
import FormRegister from '~/components/Auth/FormRegister.vue'
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
