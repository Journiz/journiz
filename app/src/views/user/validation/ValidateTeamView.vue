<script lang="ts" setup="">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import ValidateQuestionItem from '~/components/user/validate/ValidateQuestionItem.vue'

const store = useUserStore()

const route = useRoute()
const team = computed(() => {
  return store.trip?.expand?.teams?.find((t) => t.id === route.params.teamId)
})
</script>
<template>
  <Page>
    <div v-if="team" class="flex-grow h-full flex flex-col bg-beige-light">
      <Header
        :title="store.trip.name"
        subtitle="Validation"
        :back-to="{ name: 'user-trip-tabs' }"
      />
      <div class="px-6 pt-8 pb-32 overflow-y-auto flex flex-col gap-4">
        <ValidateQuestionItem />
      </div>
    </div>
  </Page>
</template>
