<script setup lang="ts">
import { defineModel } from 'vue'
import TextInput from '~/components/forms/TextInput.vue'

const members = defineModel<string[]>('members', {
  default: () => [''],
})

const addMemberInput = () => {
  members.value.push('')
}
</script>
<template>
  <div class="flex flex-col pb-4 overflow-hidden">
    <div class="max-h-full overflow-scroll">
      <div v-if="members">
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
      </div>
    </div>
    <div class="pt-6 h-18">
      <div
        class="h-12 w-12 flex items-center justify-center text-white text-lg bg-green rounded-xl mx-auto"
        @click="addMemberInput"
      >
        +
      </div>
    </div>
  </div>
</template>
