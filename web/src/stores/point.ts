import { defineStore } from 'pinia'
import { useJourney, usePocketBase, usePoint } from '@journiz/composables'
import { toRaw } from 'vue'

export const usePointStore = defineStore('point', () => {
  const { data: point, loading, setId, update, refresh } = usePoint()

  return {
    update,
    point,
    loading,
    refresh,
    setId,
  }
})
