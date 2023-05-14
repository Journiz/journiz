<script setup lang="ts">
import { usePoint } from '@journiz/composables'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'
import EditPointLocation from '~/components/point/EditPointLocation.vue'

const pointId = useRoute().params.pointId as string
const { data: point, update, updateLoading } = usePoint(pointId)
const saved = ref(false)
const save = () => {
  update()
  saved.value = true
}
</script>

<template>
  <article class="pt-10 px-16 h-full">
    <section v-if="point" class="flex flex-col h-full">
      <header class="flex items-center justify-between gap-8">
        <TextInput v-model="point.name" label="Nom du point"></TextInput>
        <div class="flex gap-2">
          <DefaultButton :loading="updateLoading" @click="save"
            >Enregistrer
          </DefaultButton>
          <DefaultButton :disabled="!saved" @click="$router.back()"
            >Terminer
          </DefaultButton>
        </div>
      </header>
      <EditPointLocation :point="point" />
    </section>
    <section v-else>Chargement</section>
  </article>
</template>
