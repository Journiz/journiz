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

const store = usePointStore()
const router = useRouter()
store.setId(useRoute().params.pointId as string)
const { loading } = storeToRefs(store)
await waitForEndLoading(loading)

// passer en props
const answerType = ref('')
const answerLocation = ref({})

const pointTrigger = ref('')
const step = ref(0)
const trigger = ref('false')

function nextStep() {
  if (step.value === 0) {
    // console.log(step)
  }
  if (step.value === 1) {
    if (answerType.value) {
      store.point.answerType = answerType.value
    }
    if (answerType.value === 'location') {
      store.point.answer = answerLocation.value
    }
    if (answerType.value === 'text' || answerType.value === 'choice') {
      store.point.answer = answers.value
    }
  }
  if (step.value === 2) {
    if (trigger.value === 'true') {
      store.point.trigger = pointTrigger.value
    }
    if (trigger.value === 'false') {
      store.point.trigger = null
    }
  }
  step.value += 1
  if (step.value > 2 || step.value < 0) {
    step.value = 0
  }

  saveChanges()
  if (step.value === 2) {
    console.log('end')
    // redirection view liste de points
  }
}
function prevStep() {
  step.value -= 1
  if (step.value > 2 || step.value < 0) {
    step.value = 0
  }
  store.update()
}

async function saveChanges() {
  console.log(pointTrigger.value)
  try {
    await store.update()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <article class="pt-10 px-16 h-full">
    <header class="flex items-center justify-between gap-8">
      <page-title v-if="step !== 0" class="mb-10">{{
        store.point.name
      }}</page-title>
      <TextInput
        v-if="step == 0"
        v-model="store.point.name"
        label="Nom du point"
      ></TextInput>
      <div class="flex">
        <SquareButton
          class="mr-3"
          icon="back"
          color="white"
          :loading="store.loading"
          @click="prevStep"
        />
        <DefaultButton :loading="store.loading" @click="nextStep"
          >Enregistrer
        </DefaultButton>
      </div>
    </header>
    <PointNavbar
      class="mb-2"
      @routeToPath="
        (pathName) => {
          router.push({ name: pathName })
        }
      "
    />
    <RouterView />
  </article>
</template>
