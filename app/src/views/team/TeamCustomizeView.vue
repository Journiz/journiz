<script lang="ts" setup="">
import { ref, watch } from 'vue'
import Page from '~/components/Page.vue'
import CustomizeHat from '~/components/team/customize/CustomizeHat.vue'
import CustomizeName from '~/components/team/customize/CustomizeName.vue'
import CustomizeColor from '~/components/team/customize/CustomizeColor.vue'
import CustomizeWarCry from '~/components/team/customize/CustomizeWarCry.vue'
import Back from '~/components/router/Back.vue'
import BackButton from '~/components/router/BackButton.vue'

const tabs = [CustomizeName, CustomizeColor, CustomizeHat, CustomizeWarCry]
const currentTab = ref(0)

const transition = ref('next-step')
watch(currentTab, (to: number, from: number) => {
  transition.value = to > from ? 'next-step' : 'prev-step'
})
</script>
<template>
  <Page>
    <transition :name="transition">
      <component
        :is="tabs[currentTab]"
        class="absolute top-0 left-0 w-full h-full px-2/20 pt-28 pb-8"
        @next="currentTab++"
        @prev="currentTab--"
      ></component>
    </transition>
    <div class="absolute top-safe mt-2 left-6">
      <Back v-if="currentTab === 0" :default-to="{ name: 'team' }" />
      <BackButton v-else @click="currentTab--" />
    </div>
  </Page>
</template>
<style scoped>
.next-step-enter-active,
.next-step-leave-active,
.prev-step-enter-active,
.prev-step-leave-active {
  @apply transition duration-300 ease-out-quart;
}

.next-step-enter-from,
.prev-step-leave-to {
  transform: translateX(100%);
}
.next-step-leave-to,
.prev-step-enter-from {
  transform: translateX(-100%);
}
</style>
