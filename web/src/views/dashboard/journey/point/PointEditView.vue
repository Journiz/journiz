<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'
import EditPointLocation from '~/components/point/EditPointLocation.vue'
import EditPointContent from '~/components/point/EditPointContent.vue'
import EditPointTrigger from '~/components/point/EditPointTrigger.vue'
import PageTitle from '~/components/PageTitle.vue'
import { waitForEndLoading } from '~/utils/waitForEndLoading'
import { usePointStore } from '~/stores/point'

const store = usePointStore()
store.setId(useRoute().params.pointId as string)
const { loading } = storeToRefs(store)
await waitForEndLoading(loading)

// passer en props
const answerType = ref('')
const answerLocation = ref({})

const pointTrigger = ref('')
const step = ref(0)
const trigger = ref('false')

const handlePointTrigger = (value: string) => {
  console.log(value)
  pointTrigger.value = value
}

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
    <section v-if="step == 0" class="h-full">
      <div v-if="store.point" class="flex flex-col h-full">
        <header class="flex items-center justify-between gap-8">
          <TextInput
            v-model="store.point.name"
            label="Nom du point"
          ></TextInput>
          <div class="flex">
            <DefaultButton :loading="store.loading" @click="nextStep"
              >Enregistrer
            </DefaultButton>
          </div>
        </header>
        <EditPointLocation :point="store.point" />
      </div>
    </section>
    <section v-if="step == 1" class="h-full">
      <header class="flex items-center justify-between gap-8">
        <page-title class="mb-10">{{ store.point.name }}</page-title>
        <div class="flex">
          <DefaultButton :loading="store.loading" @click="prevStep"
            >Prev
          </DefaultButton>
          <DefaultButton :loading="store.loading" @click="nextStep"
            >Enregistrer
          </DefaultButton>
        </div>
      </header>
      <EditPointContent />
    </section>
    <section v-if="step == 2" class="h-full">
      <header class="flex items-center justify-between gap-8">
        <page-title class="mb-10">{{ store.point.name }}</page-title>
        <div class="flex">
          <DefaultButton :loading="store.loading" @click="prevStep"
            >Prev
          </DefaultButton>
          <DefaultButton :loading="store.loading" @click="nextStep"
            >Enregistrer
          </DefaultButton>
        </div>
      </header>
      <EditPointTrigger
        :point="store.point"
        @pointTrigger="handlePointTrigger"
        @update:isTrigger="trigger = $event"
      />
    </section>
    <section v-else>Chargement</section>
  </article>
</template>
