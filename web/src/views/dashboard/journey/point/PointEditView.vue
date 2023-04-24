<script setup lang="ts">
import { usePoint } from '@journiz/composables'
import { useRoute } from 'vue-router'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import TextInput from '~/components/forms/TextInput.vue'

const pointId = useRoute().params.pointId as string
const { data: point, update, updateLoading } = usePoint(pointId)
</script>

<template>
  <article class="pt-10 px-16">
    <section v-if="point">
      <header class="flex items-center justify-between gap-8">
        <TextInput v-model="point.name" label="Nom du point"></TextInput>
        <div class="flex">
          <DefaultButton :loading="updateLoading" @click="update"
            >Enregistrer</DefaultButton
          >
        </div>
      </header>
    </section>
    <section v-else>Chargement</section>
    <!--    <FormEditPointFirstStep />-->
  </article>
</template>
