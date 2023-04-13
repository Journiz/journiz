<script setup>
import { ref } from 'vue'
import SearchBar from '~/components/SearchBar.vue'
const accessToken =
  'pk.eyJ1IjoiY3JldG9udiIsImEiOiJjbGV5b2Fld2QwNnh4M3JvOGIxNHZ5a3VkIn0.WdHz6eP4SsoCqMuejCRpRg'
const researchResult = ref([])
const doResearch = async (searchValue) => {
  const result = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${accessToken}`
  ).then(function (response) {
    return response.json()
  })
  researchResult.value = result.features
}
</script>
<template>
  <div>
    <SearchBar label="Recherche" @makeResearch="doResearch" />
    <div v-for="line in researchResult">{{ line.place_name }}</div>
  </div>
</template>
