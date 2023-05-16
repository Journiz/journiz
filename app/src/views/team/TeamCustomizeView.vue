<script lang="ts" setup="">
import { onMounted } from 'vue'
import { useTeamStore } from '~/stores/team/team'
import Page from '~/components/Page.vue'
import usePage from '~/composables/usePage'

const store = useTeamStore()
onMounted(() => {
  console.log(usePage())
  // usePage().setBackgroundColor('red')
})
</script>
<template>
  <Page> Ici on custom </Page>
</template>
