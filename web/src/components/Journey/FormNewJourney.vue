<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
const invalidInput = ref(false)
const name = ref('')
const city = ref('')
const lang = ref('')
const level = ref('')
const theme = ref('')

const router = useRouter()
const store = useUserStore()
function newJourney() {}
</script>
<template>
  <h1>Informations du nouveau parcours</h1>
  <form @submit.prevent="newJourney">
    <div class="form-group">
      <label for="name">Nom du parcours</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Visite dans Montcuq"
      />
    </div>
    <div class="form-group">
      <label for="city">Ville</label>
      <input id="city" v-model="city" type="text" placeholder="Montcuq" />
    </div>
    <div class="form-group">
      <label for="lang">Langue</label>
      <select id="lang" v-model="lang" name="lang">
        <option value="de">Deutsh</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
    </div>
    <div class="form-group">
      <label for="level">Niveau</label>
      <select id="level" v-model="level" name="level">
        <option value="2nd">2nd</option>
        <option value="1re">1re</option>
        <option value="Terminale">Terminale</option>
      </select>
    </div>
    <div class="form-group">
      <label for="theme">Thème</label>
      <select id="theme" v-model="theme" name="theme">
        <option value="Histoire">Histoire</option>
        <option value="Géopgraphie">Géographie</option>
        <option value="SVT">SVT</option>
      </select>
    </div>
    <p v-if="invalidInput">Merci de saisir tous les champs</p>
    <button>Suivant</button>
  </form>
</template>
