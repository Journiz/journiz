<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRafFn } from '@vueuse/core'
import { base64ToArrayBuffer } from '~/utils/base64ToArrayBuffer'

const props = defineProps<{
  audioData?: string
  recordingProgress?: number
}>()

const audioContext = new AudioContext()
const audio: HTMLAudioElement = new Audio()
const canPlay = ref(false)
audio.addEventListener('loadedmetadata', () => {
  canPlay.value = true
})
const isPlaying = ref(false)
audio.onplay = () => (isPlaying.value = true)
audio.onpause = () => (isPlaying.value = false)
audio.onended = () => (isPlaying.value = false)
const currentPlayPercentage = ref(0)
useRafFn(() => {
  currentPlayPercentage.value = audio.currentTime / audio.duration
})

const samplesNum = 40
const emptySamples: number[] = []
for (let i = 0; i < samplesNum; i++) {
  emptySamples.push(0)
}
const samples = ref(emptySamples)

const filterData = (audioBuffer: AudioBuffer) => {
  const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
  const samples = samplesNum // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
  const filteredData = []
  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i // the location of the first sample in the block
    let sum = 0
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize) // divide the sum by the block size to get the average
  }
  return filteredData
}
const normalizeData = (filteredData: number[]) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1)
  return filteredData.map((n) => n * multiplier)
}

const computeSamples = async (base64Audio: string) => {
  const arrayBuffer = base64ToArrayBuffer(base64Audio)
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const filteredData = filterData(audioBuffer)
  return normalizeData(filteredData)
}

watch(
  () => props.audioData,
  async (val) => {
    if (val) {
      samples.value = await computeSamples(val.split(',')[1])
      audio.src = val
      audio.load()
    } else {
      samples.value = emptySamples
    }
  }
)
const togglePlay = async () => {
  if (!audio) {
    return
  }
  if (audio.paused) {
    await audio.play()
  } else {
    await audio.pause()
  }
}
</script>
<template>
  <div class="p-4 bg-white shadow-lg rounded-xl">
    <div class="relative w-full h-8 flex">
      <button
        class="flex-shrink-0 text-theme transition-all duration-200 transform"
        :class="canPlay ? 'w-5 mr-3' : 'opacity-0 scale-0 w-0 mr-0'"
        @click="togglePlay"
      >
        <transition name="playpause" mode="out-in">
          <span
            v-if="isPlaying"
            class="block text-24px i-fluent:pause-32-filled"
          ></span>
          <span
            v-else
            class="block text-24px i-fluent:triangle-right-32-filled"
          ></span>
        </transition>
      </button>
      <div class="flex-grow flex items-center justify-between">
        <div
          v-for="(sample, i) in samples"
          :key="i"
          class="rounded-full w-3px max-h-full min-h-3px transition-all duration-200"
          :class="
            recordingProgress
              ? i / samplesNum < recordingProgress
                ? 'bg-theme'
                : 'bg-gray-300'
              : isPlaying
              ? i / samplesNum < currentPlayPercentage
                ? 'bg-theme'
                : 'bg-gray-300'
              : audioData
              ? 'bg-theme'
              : 'bg-gray-300'
          "
          :style="{
            height: sample * 100 + '%',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
