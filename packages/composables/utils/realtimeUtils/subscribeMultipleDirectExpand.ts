import { Record } from 'pocketbase'
import { Ref } from 'vue'
import { usePocketBase } from '../../src/data/usePocketBase'

export const subscribeMultipleDirectExpand = async (
  rawData: Ref<Record | null>,
  key: string,
  collectionName: string,
  recordExpandData: { [p: string]: Record | Array<Record> }
) => {
  const pb = usePocketBase()

  return await pb.collection(collectionName).subscribe('*', (data) => {
    if (data.action !== 'update') return
    const isConcerned = rawData.value?.[key].includes(data.record.id)
    if (isConcerned) {
      const existingRecordIndex = recordExpandData[key].findIndex(
        (r: Record) => r.id === data.record.id
      )
      ;(recordExpandData[key] as Record[])[existingRecordIndex] = data.record
    }
  })
}
