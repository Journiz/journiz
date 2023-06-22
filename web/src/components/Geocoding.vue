<script setup>
import { ref, defineEmits, watch } from 'vue'
import SearchBar from '~/components/SearchBar.vue'
import ResearchResultLine from '~/components/ResearchResultLine.vue'
import CheckboxInput from '~/components/forms/CheckboxInput.vue'
const accessToken =
  'pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg'
const researchResult = ref([])
const selectedId = ref([])
const emit = defineEmits(['selectMarker', 'changeHasLocation'])
const props = defineProps({
  hasLocation: Boolean,
})
const hasLocation = ref(props.hasLocation)
watch(hasLocation, () => {
  emit('changeHasLocation', hasLocation)
})
const doResearch = async (searchValue) => {
  const result = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${accessToken}`
  ).then(function (response) {
    return response.json()
  })
  researchResult.value = result.features
}
const select = (line) => {
  selectedId.value = line.id
  emit('selectMarker', line)
}
</script>
<template>
  <div class="p-7 bg-white rounded-xl">
    <SearchBar
      class="mb-3"
      label="Rechercher une adresse"
      @makeResearch="doResearch"
    />
    <div class="flex items-center gap-2">
      <div class="relative w-6 h6">
        <CheckboxInput v-model="hasLocation" />
      </div>
      <span class="text-sm font-light">
        Ce point n’est pas lié à un lieu géographique
      </span>
    </div>
    <div class="max-h-[40vh] overflow-auto">
      <ResearchResultLine
        v-for="line in researchResult"
        :key="line.id"
        :data="line"
        :is-selected="line.id === selectedId"
        @click="select(line)"
      />
    </div>
  </div>
</template>
