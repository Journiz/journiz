<script setup>
import { ref, defineEmits } from 'vue'
import SearchBar from '~/components/SearchBar.vue'
import ResearchResultLine from '~/components/ResearchResultLine.vue'
const accessToken =
  'pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg'
const researchResult = ref([])
const selectedId = ref([])
const emit = defineEmits(['selectMarker'])
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
