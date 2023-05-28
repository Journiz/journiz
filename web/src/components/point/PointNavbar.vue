<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['routeToPath'])
const currentUnderlineWidth = ref()
const currentUnderlineTranslate = ref('0px')
const itemRefs = ref()
const route = useRoute()
const items = [
  {
    name: 'Emplacement',
    icon: 'i-uil:map-marker',
    pathName: 'point-position',
  },
  {
    name: 'Contenu',
    icon: 'i-uil:map-marker',
    pathName: 'point-content',
  },
  {
    name: 'Dépendance',
    icon: 'i-uil:map-marker',
    pathName: 'point-dependency',
  },
]
function goToTab(item) {
  currentUnderlineWidth.value = item.offsetWidth + 'px'
  currentUnderlineTranslate.value = item.offsetLeft + 'px'
  emit('routeToPath', item.pathName)
}
onMounted(() => {
  currentUnderlineWidth.value = itemRefs.value[0].offsetWidth + 'px'
})
</script>
<template>
  <div class="relative w-full flex gap-2 border-b border-black/25">
    <div
      class="absolute bottom-0 left-0 bg-red h-2 transition"
      :style="{
        transform: 'translateX(' + currentUnderlineTranslate + 'px)',
        width: currentUnderlineWidth + 'px',
      }"
    />
    <div
      v-for="item in items"
      ref="itemRefs"
      :key="item.name"
      :class="item.pathName === route.name ? 'active' : ''"
      class="nav-item relative flex items-center p-3 cursor-pointer"
      @click="goToTab(item)"
    >
      <div class="h-3 text-base" :class="item.icon" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-item.active {
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    background-color: #ff6147;
    left: 0;
    bottom: 0;
  }
}
</style>
