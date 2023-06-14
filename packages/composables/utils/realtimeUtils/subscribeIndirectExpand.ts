import PocketBase, { Record } from 'pocketbase'
import { Ref } from 'vue'
import { usePocketBase } from '../../src/data/usePocketBase'

export const subscribeIndirectExpand = async (
  rawData: Ref<Record>,
  key: string,
  recordExpandData
) => {
  const pb = usePocketBase()
  const [collection, itemKey] = key.replace(')', '').split('(')
  // Handle adds, updates and deletion
  const collectionSubscription = await pb
    .collection(collection)
    /**
     * We subscribe to all record in collection, and filter them out in the callback
     * It's worth noting that because of permissions system of pocketbase, we will only receive the records
     * that the user has access to, or that the context allows.
     */
    .subscribe('*', (data) => {
      const existingRecordIndex = recordExpandData[key].findIndex(
        (r: Record) => r.id === data.record.id
      )

      // If it'as a deletion
      if (data.action === 'delete' && existingRecordIndex > -1) {
        rawData.value!.expand[key].splice(existingRecordIndex, 1)
      }
      // If the record is related to the root record
      else if (data.record[itemKey] === rawData.value?.id) {
        // If it's simply an update
        if (existingRecordIndex > -1) {
          ;(rawData.value!.expand[key] as Record[])[existingRecordIndex] =
            data.record
        }
        // If the record is created or was added to the root record
        else {
          rawData.value!.expand[key].push(data.record)
        }
      }
      // If the has not been deleted, but moved out of the root record
      else if (existingRecordIndex > -1) {
        rawData.value!.expand[key].splice(existingRecordIndex, 1)
      }
    })
  return collectionSubscription
}
