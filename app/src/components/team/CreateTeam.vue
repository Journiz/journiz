<script setup lang="ts">
import { ref } from 'vue'
import { em } from 'windicss/types/plugin/typography/utils'
import TextInput from '~/components/forms/TextInput.vue'

const emit = defineEmits(['getOwner', 'getMembers'])

const phoneOwner = ref<string>()
const members = ref<string[]>([])

const addMemberInput = () => {
  members.value.push('')
}
</script>
<template>
  <div>
    <TextInput
      v-model="phoneOwner"
      label="Joueur 1 (détenteur du téléphone)"
      svg-name="book"
      :no-display-required-stars="true"
      @keyup="emit('getOwner', phoneOwner)"
    />
    <div v-if="members">
      <TextInput
        v-for="(member, index) in members"
        :key="index"
        v-model="members[index]"
        :label="'Joueur ' + (index + 2)"
        svg-name="people"
        :no-display-required-stars="true"
        @keyup="emit('getMembers', members)"
      />
    </div>
    <div
      class="h-12 w-12 flex items-center justify-center text-white text-lg bg-green rounded-xl mx-auto mt-6"
      @click="addMemberInput"
    >
      +
    </div>
  </div>
</template>
