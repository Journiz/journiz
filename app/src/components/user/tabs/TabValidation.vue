<script lang="ts" setup="">
import Header from '~/components/design-system/Header.vue'
import { useUserStore } from '~/stores/user'
import ValidateTeamItem from '~/components/user/validate/ValidateTeamItem.vue'
const store = useUserStore()
</script>
<template>
  <div v-if="store.trip" class="flex-grow h-full flex flex-col bg-beige-light">
    <Header
      :title="store.trip.name"
      subtitle="Validation"
      :back-to="{ name: 'user-trip-tabs' }"
    />
    <div class="px-6 pt-6 pb-32 overflow-y-auto flex flex-col gap-4">
      <ValidateTeamItem
        v-for="team in store.trip.expand.teams"
        :key="team.id"
        :team="team"
      />
    </div>
  </div>
</template>
