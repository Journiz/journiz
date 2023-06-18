<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'
import PointNavbar from '~/components/point/PointNavbar.vue'
import PageTitle from '~/components/PageTitle.vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
import { usePointStore } from '~/stores/point'
import SquareButton from '~/components/buttons/SquareButton.vue'
import PointPosition from '~/components/point/tabs/PointPosition.vue'
import PointContent from '~/components/point/tabs/PointContent.vue'
import PointDependency from '~/components/point/tabs/PointDependency.vue'

const store = usePointStore()
const router = useRouter()
const route = useRoute()
store.setId(route.params.pointId as string)
const { loading } = storeToRefs(store)
await waitForEndLoading(loading)

// passer en props
const currentTabIndex = ref(0)
async function save() {
  if (currentTabIndex.value < 2) {
    currentTabIndex.value++
    await saveChanges()
    return
  }
  await saveChanges()
  await router.push({ name: 'edit-journey' })
}
function quit() {
  const result = confirm(
    'Vos changements ne serront pas sauvegardé. Voulez-vous vraiment quitter la page ?'
  )
  if (result) {
    router.push({ name: 'edit-journey' })
  }
}
async function saveChanges() {
  try {
    await store.update()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <article v-if="store.point" class="pt-10 px-16 h-full flex flex-col h-full">
    <header class="flex items-center justify-between gap-8 h-auto">
      <TextInput
        v-if="currentTabIndex === 0"
        v-model="store.point.name"
        label="Nom du point"
      ></TextInput>
      <page-title v-else class="mb-10">{{ store.point.name }}</page-title>
      <div class="flex">
        <SquareButton
          class="mr-3"
          icon="back"
          color="white"
          :loading="store.loading"
          @click="quit"
        />
        <DefaultButton :loading="store.loading" @click="save">
          {{ route.name == 'point-dependency' ? 'Enregistrer' : 'Suivant' }}
        </DefaultButton>
      </div>
    </header>
    <PointNavbar v-model:tab="currentTabIndex" class="mb-2 h-auto" />

    <PointPosition v-show="currentTabIndex === 0" />
    <PointContent v-show="currentTabIndex === 1" />
    <PointDependency v-show="currentTabIndex === 2" />
  </article>
</template>
