<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
// @ts-expect-error The QRScanner package doesn't export correctly
import QrScanner from 'qr-scanner'

const emit = defineEmits(['decode', 'error'])

const stream = ref()

let qrScanner: QrScanner | null
onMounted(async () => {
  qrScanner = new QrScanner(
    stream.value,
    (result: any) => {
      emit('decode', result.data)
    },
    {
      onDecodeError: (e: any) => {
        emit('error', e)
      },
    }
  )
  try {
    await qrScanner.start()
  } catch (e) {
    emit('error', e)
  }
})
onBeforeUnmount(() => {
  qrScanner?.destroy()
  qrScanner = null
})
</script>
<template>
  <div class="overflow-hidden relative">
    <video ref="stream" class="w-full h-full object-cover"></video>
  </div>
</template>
