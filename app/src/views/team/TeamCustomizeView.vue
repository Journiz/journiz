<script lang="ts" setup="">
import { ref } from 'vue'
import Page from '~/components/Page.vue'
import CustomizeHat from '~/components/team/customize/CustomizeHat.vue'
import CustomizeName from '~/components/team/customize/CustomizeName.vue'
import CustomizeColor from '~/components/team/customize/CustomizeColor.vue'
import CustomizeWarCry from '~/components/team/customize/CustomizeWarCry.vue'
import Back from '~/components/router/Back.vue'
import BackButton from '~/components/router/BackButton.vue'
import useSlideTransition from '~/composables/useSlideTransition'

const tabs = [CustomizeName, CustomizeColor, CustomizeHat, CustomizeWarCry]
const currentTab = ref(0)

const transitionName = useSlideTransition(currentTab)
</script>
<template>
  <Page class="bg-beige-light">
    <transition :name="transitionName">
      <component
        :is="tabs[currentTab]"
        class="absolute top-0 left-0 w-full h-full px-2/20 pt-28 pb-8 overflow-y-auto"
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
