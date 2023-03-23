<script lang="ts" setup>
import { useRealtimeJourney } from '@journiz/composables'

const { data: journey } = useRealtimeJourney('r6t26b2ariy34km')
</script>
<template>
  <div class="">
    Hello Journiz backoffice
    <pre>{{ journey }}</pre>
  </div>
</template>
