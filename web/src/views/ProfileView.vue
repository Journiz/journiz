<script lang="ts" setup="">
import PageTitle from '~/components/PageTitle.vue'
import FormUserProfile from '~/components/profile/FormUserProfile.vue'
import OverviewProfile from '~/components/profile/OverviewProfile.vue'
</script>
<template>
  <article class="pt-10 px-16">
    <page-title class="mb-10">Mon profil</page-title>
    <OverviewProfile />
    <FormUserProfile />
  </article>
</template>
