<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { usePocketBase } from '../../../../packages/composables'
import PointItem from '~/components/point/PointItem.vue'
import PageTitle from '~/components/PageTitle.vue'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import { useJourneyStore } from '~/stores/journey'
import BasecampLine from '~/components/BasecampLine.vue'

const store = useJourneyStore()
const router = useRouter()
const pb = usePocketBase()

async function deletePoint(id: string) {
  try {
    await pb.collection('point').delete(id)
    await store.refresh()
  } catch (e) {
    console.log(e)
  }
}

// const editPoint = async (id: string) => {
//   await console.log('edit point', id)
// }
</script>

<template>
  <article class="pt-10 pb-6">
    <BasecampLine
      v-if="store.journey"
      :basecamp-name="store.journey.basecampName"
      @editBasecamp="router.push({ name: 'basecamp-journey' })"
    />
    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.journey">
      <div class="flex flex-col gap-4">
        <!-- <pre>{{ store.journey.expand.points }}</pre> -->
        <PointItem
          v-for="point in store.journey.expand!.points"
          :key="point.id"
          :point="point"
          @edit-point="
            $router.push({ name: 'edit-point', params: { pointId: point.id } })
          "
          @delete-point="deletePoint(point.id)"
        />
      </div>
    </div>
  </article>
</template>
