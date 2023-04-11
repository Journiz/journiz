<script setup>
import { computed } from 'vue'
import SquareButton from '~/components/SquareButton.vue'
import icons from '~/assets/icons'
const props = defineProps({
  journeyName: {
    type: String,
    required: true,
  },
  basecampName: {
    type: String,
  },
  tags: {
    type: Array,
  },
  complete: {
    type: Boolean,
    default: false,
  },
})
const MarkerIcon = computed(() => icons.marker)
const todo = () => {
  console.log('TODO 🧠')
}
</script>
<template>
  <div class="content w-full flex px-6 py-4 bg-white rounded-xl">
    <div class="flex-1 flex flex-col mr-8">
      <div class="name text-blue-900 font-bold text-base">
        {{ props.journeyName }}
      </div>
      <div class="w-full flex text-blue-900 font-normal text-base">
        <div v-if="basecampName" class="basecamp flex items-center">
          <MarkerIcon />{{ basecampName }}
        </div>
        <div v-if="props.tags" class="tags mt-3">
          <div v-for="tag in props.tags" class="flex items-center">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-auto flex gap-2">
      <SquareButton
        v-if="!complete"
        icon="play"
        :activated="true"
        :action="todo"
      />
      <SquareButton v-if="!complete" icon="qr" :action="todo" />
      <SquareButton
        v-if="complete"
        :activated="true"
        icon="podium"
        :action="todo"
      />
      <SquareButton icon="edit" :action="todo" />
      <SquareButton icon="share" :action="todo" />
      <SquareButton icon="trash" :action="todo" />
    </div>
  </div>
</template>

<style>
.content {
  max-width: 822px;
}
</style>
