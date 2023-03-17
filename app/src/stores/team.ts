import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRealtimeTeam } from '@journiz/nuxt-common/composables/useTeam'

export const useTeamStore = defineStore('team', () => {
  // Pour le moment l'id de la team est statique tant qu'on n'a pas la structure globale
  const idRef = ref<string>()
  const setId = (id: string) => {
    idRef.value = id
  }

  const {
    data: team,
    refresh,
    loading,
    update,
    updateLoading,
  } = useRealtimeTeam(idRef)

  return {
    setId,
    team,
    loading,
    updateLoading,
    update,
    refresh,
  }
})
