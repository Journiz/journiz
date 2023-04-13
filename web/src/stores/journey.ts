import { defineStore } from 'pinia'
import { useJourney, usePocketBase } from '@journiz/composables'

export const useJourneyStore = defineStore('journey', () => {
  const { data: journey, loading, setId, update } = useJourney()

  const pb = usePocketBase()

  const newJourney = async (id: string, name: string, city: string) => {
    const data = {
      user: id,
      name,
      basecampName: city,
      basecampLatitude: null,
      basecampLongitude: null,
      indoor: false,
      tags: [],
      duration: null,
      safeZone: null,
      points: [],
    }
    try {
      const record = await pb.collection('journey').create(data)
      return record.id
    } catch (e) {
      console.log(e)
    }
    return false
  }

  const setBasecamp = async (long: number, lat: number) => {
    if (!journey.value) return false

    journey.value.basecampLongitude = long
    journey.value.basecampLatitude = lat
    try {
      await update()
      return true
    } catch (e) {
      console.log(e)
    }
    return false
  }

  const exportJourney = async (time: string, security: boolean) => {
    if (!journey.value) return false
    const timeArray = time.split(':')
    const duration =
      parseInt(timeArray[0], 10) * 60 + parseInt(timeArray[1], 10)
    journey.value.duration = duration
    // ajouter champ dans la bdd pour la zone avec l'envoie de la zone saisie sur la map
    // journey.value.duration = security
    try {
      await update()
      return true
    } catch (e) {
      console.log(e)
    }
    return false
  }

  const deleteJourney = async (id: string) => {
    console.log('oui')
    try {
      await pb.collection('journey').delete(id)
      return true
    } catch (e) {
      console.log(e)
    }
    return false
  }

  return {
    newJourney,
    setBasecamp,
    journey,
    loading,
    setId,
    deleteJourney,
    exportJourney,
  }
})
