<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '~/stores/journey'
import DefaultButton from '~/components/buttons/DefaultButton.vue'
import UilFileDownload from '~icons/uil/file-download'

const time = ref('00:00')
const security = ref(false)

const router = useRouter()
const exportJourney = async () => {
  const success = await journeyStore.exportJourney(time.value, security.value)
  if (success) {
    await router.push('/dashboard/parcours')
  }
}

const journeyStore = useJourneyStore()
</script>
<template>
  <div class="pr-16">
    <div class="form-group mb-8 flex justify-between items-center">
      <label class="font-semibold mr-8" for="export-time"
        >Régler la durée du parcours
      </label>
      <input id="export-time" v-model="time" type="time" />
    </div>
    <div class="form-group mb-8 flex justify-between items-center">
      <label class="font-semibold mr-8" for="export-security"
        >Activer le périmètre à ne pas dépasser</label
      >
      <div class="relative w-18 h-8 rounded-full overflow-hidden">
        <input
          id="export-security"
          v-model="security"
          type="checkbox"
          class="checkbox"
        />
        <div class="knobs"></div>
        <div class="layer"></div>
      </div>
    </div>
    <div class="form-group">
      <label class="font-semibold mr-8">
        Télécharger les documents à distribuer
      </label>
      <DefaultButton class="mt-3" color="secondary"
        ><UilFileDownload />Autorisations de sortie</DefaultButton
      >
      <DefaultButton class="mt-3" color="secondary"
        ><UilFileDownload />Tableau de bord papier</DefaultButton
      >
    </div>
    <!-- TODO: Share link -->
  </div>
</template>
<style scoped lang="scss">
input[type='time'] {
  border: none;
  color: #2a2c2d;
  font-size: 14px;
  width: 130px;
  padding: 12px 16px;
  border-radius: 8px;
}
input[type='time']::-webkit-calendar-picker-indicator {
  width: 16px;
  height: 16px;
  background: url('../../assets/images/svg/clock.svg') no-repeat center;
  background-size: 16px 16px;
}
input[type='time']::-webkit-datetime-edit-fields-wrapper {
  display: flex;
}
input[type='checkbox'].checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  &:checked {
    background-color: #ff6147;
    + .knobs::before {
      content: 'ON';
      transform: translateX(-70%) translateY(-50%);
      color: #ffffff;
    }
    + .knobs::after {
      background-color: #fff;
      transform: translateX(24px);
      width: 5px;
      border-radius: 4px;
    }
    ~ .layer {
      background-color: #ff6147;
    }
  }
}
.knobs {
  z-index: 2;
  transition: 0.3s ease all;
  &::before {
    content: 'OFF';
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    color: #ff6147;
    transform: translateX(-20%) translateY(-50%);
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }
  &::after {
    content: '';
    background-color: #ff6147;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    position: absolute;
    z-index: 2;
    top: calc(50% - 10px);
    left: calc(50% - 2px);
    transform: translateX(-28px);
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }
}

.layer {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border: solid 3px #ff6147;
  transition: 0.3s ease all;
  z-index: 0;
  pointer-events: none;
}
</style>
