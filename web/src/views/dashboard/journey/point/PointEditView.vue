<script setup lang="ts">
import { ref } from 'vue'
import { usePoint } from '@journiz/composables'
import { useRoute } from 'vue-router'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'
import EditPointLocation from '~/components/point/EditPointLocation.vue'
import EditPointContent from '~/components/point/EditPointContent.vue'
import EditPointTrigger from '~/components/point/EditPointTrigger.vue'
import PageTitle from '~/components/PageTitle.vue'

const pointId = useRoute().params.pointId as string
const { data: point, update, updateLoading } = usePoint(pointId)

// passer en props
const answerType = ref('')
const answers = ref([])
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
    console.log(step)
  }
  if (step.value === 1) {
    if (answerType.value) {
      point.value.answerType = answerType.value
    }
    if (answerType.value === 'location') {
      point.value.answer = answerLocation.value
    }
    if (answerType.value === 'text' || answerType.value === 'choice') {
      point.value.answer = answers.value
    }
  }
  if (step.value === 2) {
    if (trigger.value === 'true') {
      point.value.trigger = pointTrigger.value
    }
    if (trigger.value === 'false') {
      point.value.trigger = null
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
  update()
}

async function saveChanges() {
  console.log(pointTrigger.value)
  try {
    await update()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <article class="pt-10 px-16 h-full">
    <section v-if="step == 0" class="h-full">
      <div v-if="point" class="flex flex-col h-full">
        <header class="flex items-center justify-between gap-8">
          <TextInput v-model="point.name" label="Nom du point"></TextInput>
          <div class="flex">
            <DefaultButton :loading="updateLoading" @click="nextStep"
              >Enregistrer
            </DefaultButton>
          </div>
        </header>
        <EditPointLocation :point="point" />
      </div>
    </section>
    <section v-if="step == 1" class="h-full">
      <header class="flex items-center justify-between gap-8">
        <page-title class="mb-10">{{ point.name }}</page-title>
        <div class="flex">
          <DefaultButton :loading="updateLoading" @click="prevStep"
            >Prev
          </DefaultButton>
          <DefaultButton :loading="updateLoading" @click="nextStep"
            >Enregistrer
          </DefaultButton>
        </div>
      </header>
      <EditPointContent
        :point="point"
        @update:answerType="answerType = $event"
        @update:answers="answers = $event"
        @update:answerLocation="answerLocation = $event"
      />
    </section>
    <section v-if="step == 2" class="h-full">
      <header class="flex items-center justify-between gap-8">
        <page-title class="mb-10">{{ point.name }}</page-title>
        <div class="flex">
          <DefaultButton :loading="updateLoading" @click="prevStep"
            >Prev
          </DefaultButton>
          <DefaultButton :loading="updateLoading" @click="nextStep"
            >Enregistrer
          </DefaultButton>
        </div>
      </header>
      <EditPointTrigger
        :point="point"
        @pointTrigger="handlePointTrigger"
        @update:isTrigger="trigger = $event"
      />
    </section>
    <section v-else>Chargement</section>
  </article>
</template>
