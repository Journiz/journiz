import { Record } from 'pocketbase'
import { Ref } from 'vue'
import { usePocketBase } from '../../src/data/usePocketBase'

export const subscribeSingleDirectExpand = async (
  record: Record,
  key: string,
  rawData: Ref<Record | null>
) => {
  const pb = usePocketBase()
  return await pb
    .collection(record.collectionName)
    .subscribe(record.id, (data) => {
      if (rawData.value) {
        rawData.value.expand[key] = data.record
      }
    })
}
