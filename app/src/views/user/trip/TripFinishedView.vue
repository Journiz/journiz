<script lang="ts" setup="">
import { computed } from 'vue'
import { Team } from '@journiz/api-types'
import Page from '~/components/Page.vue'
import TeamAvatar from '~/components/team/TeamAvatar.vue'
import { useUserStore } from '~/stores/user'

const store = useUserStore()
const teams = computed(() => {
  const array = store.trip?.expand?.teams
  return array?.sort(compareFn)
})

const compareFn = (a: Team, b: Team) => {
  if (a.score < b.score) {
    return 1
  }
  if (a.score > b.score) {
    return -1
  }
  return 0
}
</script>
<template>
  <Page class="bg-beige-light px-6 flex flex-col">
    <div class="text-xl font-black mx-auto mt-10">Classement final</div>
    <div v-if="teams" class="relative flex flex-wrap pt-20">
      <Transition name="bg" :appear="true">
        <img
          style="transition-delay: 1s"
          class="absolute left-0 top-0 w-auto h-48"
          src="../../../assets/img/backgrounds/bg-ranking.png"
          alt="Background"
        />
      </Transition>
      <div
        v-for="(team, i) in teams?.slice(0, 3)"
        :key="team.id"
        class="flex"
        :class="[
          i === 0 ? 'w-full justify-center z-1' : 'w-1/2 -mt-1/3',
          i === 2 ? 'justify-end' : '',
        ]"
      >
        <Transition :name="i === 0 ? 'central' : 'side'" :appear="true">
          <div
            :class="i === 0 ? 'w-46/100' : 'w-76/100'"
            class="aspect-square text-center"
          >
            <div class="relative mb-2">
              <div
                v-if="i === 0"
                class="absolute bg-beige-light top-0 left-0 w-full h-full rounded-full scale-105"
              />
              <TeamAvatar class="relative" :team="team" />
              <div
                class="absolute top-0 w-8 h-8 bg-green rounded-full flex items-center justify-center color-white font-extrabold"
                :class="[
                  i === 0 ? 'left-1/2 -translate-x-1/2 -translate-y-1/2' : '',
                  i === 2 ? 'right-0' : '',
                ]"
              >
                {{ i + 1 }}
              </div>
            </div>
            <div class="px-2">
              <span class="font-medium">{{ team.name }}</span> <br />
              <span class="font-light">{{ team.score }} pts</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div
      v-if="(teams.length ?? 0) > 3"
      class="grow mt-8 w-full overflow-scroll mb-4"
    >
      <div v-if="teams" class="flex flex-col overflow-scroll h-full">
        <div
          v-for="(team, i) in teams?.slice((teams?.length - 3) * -1)"
          :key="team.id"
          class="relative ml-3"
        >
          <Transition name="list" :appear="true">
            <div
              :style="`transition-delay: ${1 + i / 2}s`"
              class="relative w-full flex items-center border-2 border-green-dark bg-white rounded-lg mt-3 py-3 pl-2 pr-6 mb-1"
            >
              <div
                class="absolute -top-3 -left-3 w-6 h-6 bg-green rounded-full flex items-center justify-center color-white font-extrabold"
              >
                {{ i + 4 }}
              </div>
              <TeamAvatar class="relative h-8 w-8 mr-2" :team="team" />
              <span class="grow font-medium">{{ team.name }}</span>
              <span class="w-fit font-light">{{ team.score }} points</span>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Page>
</template>
<style lang="scss">
.central-enter-active,
.central-leave-active,
.side-enter-active,
.side-leave-active,
.bg-enter-active,
.bg-leave-active {
  transition: all 1s ease-in-out;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.bg-enter-from,
.bg-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.side-enter-from,
.side-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.central-enter-from,
.central-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.list-enter-from,
.list-leave-to {
  transform: translatex(-10px);
  opacity: 0;
}
</style>
