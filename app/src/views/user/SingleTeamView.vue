<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useAnswers, useConversations } from '@journiz/composables'
import Header from '~/components/design-system/Header.vue'
import Page from '~/components/Page.vue'
import { useUserStore } from '~/stores/user'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { getColor } from '~/composables/useThemeColor'
import Button from '~/components/design-system/Button.vue'

const store = useUserStore()
const teamId = useRoute().params.teamId
const team = computed(() =>
  store.trip?.expand?.teams?.find((t) => t.id === teamId)
)
const { data: conversations, loading } = useConversations({
  filter: `team.trip="${store.trip?.id}" && team.id="${teamId}"`,
})
const conversation = computed(() => conversations.value[0])
const router = useIonRouter()
if (!team.value) {
  if (router.canGoBack()) router.back()
  else router.replace({ name: 'user-trip-tabs' })
}
const goToTeamChat = () => {
  router.push({
    name: 'user-chat-conversation',
    params: {
      conversationId: conversation.value.id,
    },
  })
}
const { data: answers } = useAnswers({
  filter: `team="${teamId}"`,
})
</script>
<template>
  <Page class="flex flex-col h-screen overflow-hidden">
    <Header
      :title="team.name"
      subtitle="Informations de l’équipe"
      :back-to="{ name: 'user-trip-tabs' }"
    />
    <div class="grow bg-beige-light px-6 flex flex-col overflow-hidden">
      <div class="w-full pt-4">
        <TeamAvatar class="h-20 w-20 mx-auto" :team="team" :border="true" />
      </div>
      <div class="flex items-center justify-center gap-5 mt-3">
        <div
          class="flex items-center justify-center bg-white rounded-full h-8 w-8"
        >
          <div
            class="rounded-full h-3 w-3"
            :style="{ backgroundColor: getColor(team.color as any ?? 'green') }"
          ></div>
        </div>
        <div
          class="custom-shadow bg-white flex items-center p-3 gap-2 border rounded-xl grow-0 w-36"
          :style="{
          borderColor: getColor(team.color as any ?? 'green'),
        }"
        >
          <div class="i-mdi:star-four-points-circle-outline h-4 w-4" />
          <div class="font-bold whitespace-nowrap grow text-center">
            {{ team.score }} points
          </div>
        </div>
      </div>
      <div class="flex bg-red rounded-xl p-4 color-white mt-6 justify-between">
        <div class="flex items-center">
          <span class="i-uil:question text-xl" />
          <span>Enigmes résolues</span>
        </div>
        <div>
          {{ answers.length }} / {{ store.journey?.points.length ?? 0 }}
        </div>
      </div>
      <h3 class="block flex items-center">
        <span class="i-fluent:people-team-24-regular text-xl h-6 w-6 mr-2" />
        <span class="text-lg">Membres de l’équipe</span>
      </h3>
      <div
        v-if="team.members"
        class="grow overflow-hidden flex flex-col overflow-scroll"
      >
        <div
          v-for="(member, i) in team.members"
          :key="member"
          class="rounded-xl bg-white px-4 py-4 mb-3 flex items-center justify-between"
        >
          <span>{{ member }}</span>
          <span
            v-if="i === 0 && team.batteryLevel"
            class="flex items-center text-sm"
            :class="team.batteryLevel < 15 ? 'text-red' : ''"
          >
            <span class="i-uil:mobile-android text-base"></span>
            <span> {{ team.batteryLevel }} % </span>
          </span>
        </div>
      </div>
      <Button
        v-if="conversations && !loading"
        class="mb-4 mt-8"
        color="green"
        @click="goToTeamChat"
        >Contacter l'équipe</Button
      >
    </div>
  </Page>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
}
</style>
