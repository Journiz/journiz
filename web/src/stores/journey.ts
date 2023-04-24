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
    if (!journey.value) return

    journey.value.basecampLongitude = long
    journey.value.basecampLatitude = lat
    await update()
  }

  return {
    newJourney,
    setBasecamp,
    journey,
    loading,
    setId,
  }
})
