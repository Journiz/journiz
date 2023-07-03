<script setup lang="ts">
import { usePocketBase } from '@journiz/composables'
import { onMounted, ref } from 'vue'
import { useJourneyStore } from '~/stores/journey'
import CommunityPointWindow from '~/components/point/CommunityPointWindow.vue'

const pb = usePocketBase()

const props = defineProps({
  basecampLatitude: {
    type: Number,
    required: true,
  },
  basecampLongitude: {
    type: Number,
    required: true,
  },
})

const resultList = ref<any[]>([])
const currentItem = ref<object>({})
const windowVisible = ref<boolean>(false)

onMounted(async () => {
  const radius = 0.02

  // Calcul des coordonnées limites de la zone géographique
  const minLongitude = props.basecampLongitude - radius
  const maxLongitude = props.basecampLongitude + radius
  const minLatitude = props.basecampLatitude - radius
  const maxLatitude = props.basecampLatitude + radius
  // Construction de la requête avec le filtre des coordonnées
  const filter = `longitude >= ${minLongitude} && longitude <= ${maxLongitude} && latitude >= ${minLatitude} && latitude <= ${maxLatitude}`

  const store = useJourneyStore()
  const pointsInJourneyIds =
    store.journey?.expand?.points?.map((p) => p.id) ?? []

  // Exécution de la requête pour récupérer les points dans la zone géographique
  const result = await pb.collection('point').getList(1, 3, {
    filter,
  })

  // Utilisation des points récupérés
  resultList.value = result.items.filter(
    (p) => !pointsInJourneyIds.includes(p.id)
  )
})

const setCurrentItem = (item: object) => {
  currentItem.value = item
  windowVisible.value = true
}

const closeWindow = () => {
  windowVisible.value = false
}
</script>
<template>
  <div>
    <h3
      v-if="resultList.length > 0"
      class="community--title text-black font-medium mt-8 mb-2"
    >
      Ajouter un point proposé par la communauté
    </h3>
    <div class="community--slider">
      <div
        v-for="item in resultList"
        :key="item.id"
        class="community--slide rounded-lg bg-white hover:cursor-pointer"
        @click="setCurrentItem(item)"
      >
        <div class="community--slide-button p-4">
          <p class="community--question">"{{ item.question }}"</p>
          <p class="community--answerType font-medium">{{ item.answerType }}</p>
          <p class="community--name">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <CommunityPointWindow
      class="z-20"
      :class="windowVisible ? '' : 'opacity-0 pointer-events-none'"
      :item="currentItem"
      @closeWindow="closeWindow"
    />
  </div>
</template>

<style>
.community--title {
  font-size: 1.2em;
}
.community--slider {
  display: flex;
  flex-direction: row;
}
.community--slide {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 30%;
  flex: 0 0 30%;
  max-width: 30%;
  margin-right: 3%;
}
.community--slide-button {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  aspect-ratio: 130/118;

  box-shadow: 0px 1px 3px 0px rgba(0, 35, 30, 0.16);
}
.community--slide-detail {
  display: none;
}
.community--question {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: '…"';
  font-size: 0.8em;
}
.community--answerType {
  text-transform: uppercase;
}
.community--name {
  font-size: 0.8em;
  display: inline-flex;
}
.community--name {
  padding-left: 15px;
  position: relative;
  text-align: left;
  width: fit-content;
  margin: 0 auto;
}
.community--name:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='13' viewBox='0 0 11 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath id='Vector' d='M5.60714 0C4.25314 0.00160656 2.95505 0.540195 1.99762 1.49762C1.04019 2.45505 0.501607 3.75314 0.5 5.10714C0.5 9.47705 5.14286 12.7778 5.34054 12.9161C5.41872 12.9707 5.51178 13 5.60714 13C5.7025 13 5.79556 12.9707 5.87374 12.9161C6.07143 12.7778 10.7143 9.47705 10.7143 5.10714C10.7127 3.75314 10.1741 2.45505 9.21666 1.49762C8.25924 0.540195 6.96115 0.0016064 5.60714 0ZM5.60748 3.25017C5.97479 3.25017 6.33385 3.35909 6.63926 3.56315C6.94466 3.76722 7.1827 4.05726 7.32326 4.39661C7.46382 4.73596 7.5006 5.10937 7.42894 5.46962C7.35728 5.82987 7.18041 6.16078 6.92068 6.42051C6.66096 6.68024 6.33004 6.85711 5.96979 6.92877C5.60954 7.00043 5.23613 6.96365 4.89679 6.82309C4.55744 6.68252 4.26739 6.44449 4.06333 6.13908C3.85926 5.83368 3.75034 5.47462 3.75034 5.10731C3.75033 4.86343 3.79836 4.62193 3.89169 4.39661C3.98502 4.17128 4.12182 3.96655 4.29427 3.7941C4.46672 3.62164 4.67146 3.48485 4.89678 3.39152C5.1221 3.29819 5.3636 3.25016 5.60748 3.25017Z' fill='%2317403B' /%3E%3C/svg%3E");
}
</style>
