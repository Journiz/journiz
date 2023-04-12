import { defineStore } from 'pinia'
import { useJourney, usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useJourneyStore = defineStore('journey', () => { 

  const {data: journey, loading, setId, update} = useJourney()

  const pb = usePocketBase()

  const newJourney = async (id: string, name: string) => {
    const data = {
      "user": id,
      "name": name,
      "basecampName": '',
      "basecampLatitude": null,
      "basecampLongitude": null,
      "indoor": false,
      "tags": [],
      "duration": null,
      "safeZone": null,
      "points": []
    };
    try {
      const record = await pb.collection('journey').create(data);
      return record.id
    } catch (e) { 
      console.log(e)
    }
    return false
  }

  const setBasecamp = async (name: string, long: string, lat: string) => {    
    journey.value.basecampName = name
    journey.value.basecampLongitude = long
    journey.value.basecampLatitude = lat
    await update()
  }  

  return {
    newJourney,
    setBasecamp,
    journey,
    loading,
    setId
  }
});