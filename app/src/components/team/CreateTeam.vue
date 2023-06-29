<script setup lang="ts">
import TextInput from '~/components/forms/TextInput.vue'

const members = defineModel<string[]>('members', {
  default: () => [''],
})

const addMemberInput = () => {
  members.value.push('')
}
const removeMemberInput = () => {
  if (members.value.length > 1) members.value.pop()
}
</script>
<template>
  <div class="flex flex-col pb-4">
    <form>
      <TransitionGroup v-if="members" :appear="true" tag="div">
        <TextInput
          v-for="(member, index) in members"
          :key="index"
          v-model="members[index]"
          :label="
            index === 0
              ? 'Joueur 1 (détenteur du téléphone)'
              : 'Joueur ' + (index + 1)
          "
          :svg-name="index === 0 ? 'book' : 'people'"
          :no-display-required-stars="true"
        />
      </TransitionGroup>
    </form>
    <div
      class="pt-6 h-18 flex gap-2 justify-center"
      :class="members.length > 1 ? '-translate-x-6' : ''"
    >
      <div
        v-if="members.length > 1"
        class="h-12 w-12 flex items-center justify-center text-white text-lg bg-theme rounded-xl"
        @click="removeMemberInput"
      >
        -
      </div>
      <div
        class="h-12 w-12 flex items-center justify-center text-white text-lg bg-green rounded-xl"
        @click="addMemberInput"
      >
        +
      </div>
    </div>
  </div>
</template>
<style>
.v-enter-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
