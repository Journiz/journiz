<script setup>
import { onMounted, ref, watch } from 'vue'

const currentTabIndex = defineModel('tab', {
  required: true,
})

const currentUnderlineWidth = ref(0)
const currentUnderlineTranslate = ref(0)
const itemRefs = ref([])
const items = [
  {
    name: 'Emplacement',
    icon: 'i-uil:map-marker',
  },
  {
    name: 'Contenu',
    icon: 'i-iconoir:input-field',
  },
  {
    name: 'Dépendance',
    icon: 'i-streamline:interface-hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy',
  },
]
function goToTab(item) {
  currentTabIndex.value = items.indexOf(item)
}
watch(currentTabIndex, (index) => {
  currentUnderlineWidth.value = itemRefs.value[index]?.offsetWidth
  currentUnderlineTranslate.value = itemRefs.value[index]?.offsetLeft
})
onMounted(() => {
  currentUnderlineWidth.value = itemRefs.value[0].offsetWidth
})
</script>
<template>
  <div class="relative w-full flex gap-2 border-b border-black/25">
    <div
      class="absolute bottom-0 left-0 bg-red h-2 transition-all duration-300 ease-in-out-quad"
      :style="{
        transform: 'translateX(' + currentUnderlineTranslate + 'px)',
        width: currentUnderlineWidth + 'px',
      }"
    ></div>
    <div
      v-for="(item, i) in items"
      ref="itemRefs"
      :key="item.name"
      :class="i === currentTabIndex ? 'active' : ''"
      class="nav-item relative flex items-center p-3 pr-4 cursor-pointer"
      @click="goToTab(item)"
    >
      <div
        class="h-4 mr-3"
        :class="[item.icon, i === currentTabIndex ? 'text-red' : 'text-base']"
      />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-item.active {
  //&::after {
  //  content: '';
  //  position: absolute;
  //  width: 100%;
  //  height: 8px;
  //  background-color: #ff6147;
  //  left: 0;
  //  bottom: 0;
  //}
}
</style>
