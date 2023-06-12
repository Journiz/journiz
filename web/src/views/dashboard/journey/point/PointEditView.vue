<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Point } from '@journiz/api-types'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'
import PointNavbar from '~/components/point/PointNavbar.vue'
import PageTitle from '~/components/PageTitle.vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
import { usePointStore } from '~/stores/point'
import SquareButton from '~/components/buttons/SquareButton.vue'

const store = usePointStore()
const router = useRouter()
const route = useRoute()
store.setId(route.params.pointId as string)
const { loading } = storeToRefs(store)
await waitForEndLoading(loading)

// passer en props
const answerType = ref<Point['answerType']>()
const answerLocation = ref<{ lng: number; lat: number }>()

const pointTrigger = ref('')

function save() {
  saveChanges()
  console.log('save')
  if (route.name === 'point-dependency') {
    router.push({ name: 'edit-journey' })
  } else if (route.name === 'point-position') {
    router.push({ name: 'point-content' })
  } else if (route.name === 'point-content') {
    router.push({ name: 'point-dependency' })
  }
}
function quit() {
  const result = confirm(
    'Vos changements ne serront pas sauvegardé. Voulez-vous vraiment quitter la page ?'
  )
  if (result) {
    router.push({ name: 'edit-journey' })
  }
}
onBeforeRouteLeave((to, from, next) => {
  console.log('save route ')
  saveChanges()
  next()
})

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
      <page-title v-if="route.name !== 'point-position'" class="mb-10">{{
        store.point.name
      }}</page-title>
      <TextInput
        v-if="route.name == 'point-position'"
        v-model="store.point.name"
        label="Nom du point"
      ></TextInput>
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
    <PointNavbar
      class="mb-2 h-auto"
      @routeToPath="
        (pathName) => {
          router.push({ name: pathName })
        }
      "
    />
    <RouterView />
  </article>
</template>
