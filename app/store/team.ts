import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', () => {
  // Pour le moment l'id de la team est statique tant qu'on n'a pas la structure globale
  const {
    data: team,
    refresh,
    loading,
    update,
    updateLoading,
  } = useTeam('bth1emonizvk3bh')
  // Ici on mettra toutes les actions pour une team genre répondre à une question etc
  return {
    team,
    loading,
    updateLoading,
    update,
    refresh,
  }
})
