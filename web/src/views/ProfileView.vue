<script lang="ts" setup="">
import PageTitle from '~/components/PageTitle.vue'
import FormUserProfile from '~/components/profile/FormUserProfile.vue'
import OverviewProfile from '~/components/profile/OverviewProfile.vue'
</script>
<template>
  <article class="py-4 h-screen">
    <div class="flex h-full item-stretch pl-16 pr-4">
      <div class="w-1/2 pt-8">
        <page-title class="mb-10">Mon profil</page-title>
        <OverviewProfile />
      </div>
      <FormUserProfile class="w-1/2" />
    </div>
  </article>
</template>
