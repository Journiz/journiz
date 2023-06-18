<script lang="ts" setup="">
import { type Component, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import Page from '~/components/Page.vue'
import CustomizeHat from '~/components/team/customize/CustomizeHat.vue'
import CustomizeName from '~/components/team/customize/CustomizeName.vue'
import CustomizeColor from '~/components/team/customize/CustomizeColor.vue'
import CustomizeWarCry from '~/components/team/customize/CustomizeWarCry.vue'
import Back from '~/components/router/Back.vue'
import BackButton from '~/components/router/BackButton.vue'
import useSlideTransition from '~/composables/useSlideTransition'
import { backWithDefault } from '~/utils/routerUtils'
import line from '~/assets/img/backgrounds/bg-line-1.svg'

const tabs: Component[] = [
  CustomizeName,
  CustomizeColor,
  CustomizeHat,
  CustomizeWarCry,
]
const currentTab = ref(0)

const transitionName = useSlideTransition(currentTab)
const router = useIonRouter()
const next = () => {
  if (currentTab.value === tabs.length - 1) {
    backWithDefault(router, { name: 'team-waiting' })
    return
  }
  currentTab.value++
}
</script>
<template>
  <Page class="bg-beige-light relative">
    <div
      class="absolute top-0 left-0 h-full w-4/1 relative transition duration-300 ease-out-quint"
      :style="{
        transform: `translateX(-${currentTab * 25}%)`,
      }"
    >
      <img :src="line" class="w-full h-full object-contain" />
    </div>
    <transition :name="transitionName">
      <component
        :is="tabs[currentTab]"
        class="absolute top-0 left-0 w-full h-full px-2/20 pt-28 pb-8 overflow-y-auto step-bg"
        :class="'step-' + currentTab"
        @next="next"
        @prev="currentTab--"
      ></component>
    </transition>
    <div class="absolute top-safe mt-2 left-6">
      <Back v-if="currentTab === 0" :default-to="{ name: 'team' }" />
      <BackButton v-else @click="currentTab--" />
    </div>
  </Page>
</template>
<style></style>
