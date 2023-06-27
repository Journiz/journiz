<script lang="ts" setup="">
import { Trip } from '@journiz/api-types'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import PageTitle from '~/components/PageTitle.vue'

const props = defineProps<{
  trip: Trip
}>()
const qrCode = useQRCode(props.trip.id, {
  scale: 10,
  color: {
    light: '#00000000',
  },
})
</script>
<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <PageTitle class="mb-8">{{ trip.name }}</PageTitle>
    <span class="font-black text-2xl text-red">Connecter votre équipe</span>
    <div class="bg-white rounded-xl overflow-hidden w-1/2">
      <img :src="qrCode" alt="code" class="w-full" />
    </div>
    <span class="font-black text-xl mt-2">ou</span>
    <span class="font-black text-3xl text-red">{{ trip.shortId }}</span>
  </div>
</template>
