<script lang="ts" setup>
defineProps<{
  members: string[]
  batteryLevel?: number
}>()
</script>
<template>
  <div v-if="members" class="overflow-hidden flex flex-col overflow-scroll">
    <div
      v-for="(member, i) in members"
      :key="member"
      class="rounded-xl bg-white px-4 py-4 mb-3 flex items-center justify-between"
    >
      <span>{{ member }}</span>
      <span
        v-if="i === 0 && batteryLevel"
        class="flex items-center text-sm"
        :class="batteryLevel < 15 ? 'text-red' : ''"
      >
        <span class="i-uil:mobile-android text-base"></span>
        <span> {{ batteryLevel }} % </span>
      </span>
    </div>
  </div>
</template>
