<script lang="ts" setup="">
import { Team } from '@journiz/api-types'
import { useRealtimeTeam } from '@journiz/composables'
import { computed, onMounted, watch } from 'vue'
import { onIonViewDidEnter } from '@ionic/vue'
import Button from '~/components/design-system/Button.vue'
import TeamAvatar from '~/components/team/TeamAvatar.vue'

const props = defineProps<{
  team: Team
}>()
const emit = defineEmits<{
  answersNum: [num: number]
}>()
const { data: expandedTeam, loading, refresh } = useRealtimeTeam(props.team.id)
const answersCount = computed(() => {
  return expandedTeam.value?.expand?.answers?.length ?? 0
})
const pendingAnswersCount = computed(() => {
  return (
    expandedTeam.value?.expand?.answers?.filter(
      (answer) => !answer.hasBeenValidated
    )?.length ?? 0
  )
})

watch(pendingAnswersCount, () => {
  emit('answersNum', answersCount.value)
})
onMounted(() => {
  emit('answersNum', answersCount.value)
})

onIonViewDidEnter(() => {
  refresh()
})
</script>
<template>
  <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <TeamAvatar class="w-8 h-8" :team="team" />
      <span class="font-bold">{{ team.name }}</span>
    </div>
    <div class="relative">
      <Button
        :disabled="!loading && answersCount === 0"
        color="green"
        :to="{ name: 'user-trip-validate-team', params: { teamId: team.id } }"
        >Voir les réponses</Button
      >
      <span
        v-if="pendingAnswersCount > 0"
        class="block absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-red text-white rounded-full transform -translate-y-1/2 translate-x-1/4"
        >{{ pendingAnswersCount }}</span
      >
    </div>
  </div>
</template>
