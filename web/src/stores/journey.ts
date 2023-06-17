import { defineStore } from 'pinia'
import { useJourney, usePocketBase } from '@journiz/composables'
import { toRaw } from 'vue'
import { PointWithDependents } from '~/types/points'

export const useJourneyStore = defineStore('journey', () => {
  const { data: journey, loading, setId, update, refresh } = useJourney()

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
      safeZone: [],
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

  const newPoint = async () => {
    const data = {
      name: 'Nouveau Point',
      latitude: 0,
      longitude: 0,
      score: 0,
      answerType: 'image',
      question: ' ',
      answer: '',
      trigger: '',
      hint: [],
    }
    try {
      const record = await pb.collection('point').create(data)
      const success = await addPointToJourney(record.id)
      if (success) {
        return record.id
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const addPointToJourney = async (id: string) => {
    if (!journey.value) return false
    const points = journey.value.points
    const pointsToRaw = toRaw(points)
    pointsToRaw.push(id)
    journey.value.points = pointsToRaw
    try {
      await update()
      return true
    } catch (e) {
      console.log(e)
    }
    return false
  }

  const updateOrderFromNestedArray = async (source: PointWithDependents[]) => {
    const flatSorted: string[] = []
    source.forEach((point) => {
      flatSorted.push(point.id)
      if (point.dependents) {
        point.dependents.forEach((dependent) => {
          flatSorted.push(dependent.id)
        })
      }
    })
    console.log(flatSorted)
    if (journey.value) {
      journey.value.points = flatSorted
      await update()
    }
  }

  return {
    newJourney,
    setBasecamp,
    update,
    journey,
    loading,
    refresh,
    setId,
    deleteJourney,
    exportJourney,
    newPoint,
    addPointToJourney,
    updateOrderFromNestedArray,
  }
})
