<script setup lang="ts">
import FormLogin from '~/components/FormLogin.vue'
import AuthStatus from '~/components/AuthStatus.vue'
import FormForgotPassword from '~/components/FormForgotPassword.vue'
import FormRegister from '~/components/FormRegister.vue'
</script>

<template>
  <section>
    <AuthStatus />
    <form-login />
    <FormForgotPassword />
    <FormRegister />
  </section>
</template>

<style>
form {
  background-color: #f4f4f4;
  padding: 15px 30px;
  margin: 0px 0px 30px 0px;
  border-radius: 15px;
  width: fit-content;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
input {
  background-color: #fff;
  border-radius: 10px;
  padding: 5px 10px !important;
}
input::placeholder {
  padding: 5px 10px;
}
button {
  background-color: #000 !important;
  color: #fff !important;
  border-radius: 10px !important;
  padding: 5px 10px !important;
  margin: 15px auto !important;
  width: 100%;
}
</style>
