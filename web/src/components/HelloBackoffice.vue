<script lang="ts" setup>
import { usePocketBase } from '@journiz/composables'
const result = await usePocketBase().collection('journey').getList()
</script>
<template>
  <div class="">
    Hello Journiz backoffice
    <pre>{{ result }}</pre>
  </div>
</template>
