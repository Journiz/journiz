<script lang="ts" setup="">
import { computed, ref, watch } from 'vue'
import Header from '~/components/design-system/Header.vue'
import { useUserStore } from '~/stores/user'
import ValidateTeamItem from '~/components/user/validate/ValidateTeamItem.vue'
import { useTabBadge } from '~/types/tabs'
const store = useUserStore()
const answersNums = ref([])
const totalAnswers = computed(() => {
  return answersNums.value.reduce((acc, curr) => acc + curr, 0)
})
const setBadge = useTabBadge()
watch(totalAnswers, () => {
  setBadge?.(totalAnswers.value)
})
</script>
<template>
  <div v-if="store.trip" class="flex-grow h-full flex flex-col bg-beige-light">
    <Header
      :title="store.trip.name"
      subtitle="Validation"
      :back-to="{ name: 'user-trip-tabs' }"
      :not-display-infos="true"
    />
    <div
      v-if="store.trip?.expand?.teams"
      class="px-6 pt-6 pb-32 overflow-y-auto flex flex-col gap-4"
    >
      <ValidateTeamItem
        v-for="(team, i) in store.trip.expand.teams"
        :key="team.id"
        :team="team"
        @answers-num="answersNums[i] = $event"
      />
    </div>
  </div>
</template>
