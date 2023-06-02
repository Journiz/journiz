<script lang="ts" setup="">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'

const store = useUserStore()
const teams = computed(() => store.trip?.expand?.teams ?? [])
// https://www.notion.so/journiz/Affichage-quipe-en-liste-quipe-single-69aebac3a6a54789a79fbf348b5c8e2d?pvs=4
</script>
<template>
  <div v-if="teams" class="bg-beige h-full">
    Ici les équipes, by Vincent® (attention au padding de la bottom bar, le
    composant passe derrière)
  </div>
</template>
