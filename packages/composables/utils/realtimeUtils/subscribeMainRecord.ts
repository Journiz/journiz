import { cloneDeep } from '@journiz/api-types'
import { Ref } from 'vue'
import { Record } from 'pocketbase'
import { usePocketBase } from '../../src/data/usePocketBase'

export const subscribeMainRecord = async (
  rawData: Ref<Record | null>,
  collection: string,
  onUpdated: (oldVal: Record, newVal: Record) => void,
  onDeleted: () => void
) => {
  const pb = usePocketBase()
  if (!rawData.value) {
    throw new Error('An error occured: rawData should not be null.')
  }
  return await pb.collection(collection).subscribe(rawData.value.id, (e) => {
    if (e.action === 'update') {
      const oldVal = cloneDeep(rawData.value)
      e.record.expand = Object.assign(
        {},
        e.record.expand,
        rawData.value?.expand ?? {}
      )
      rawData.value = e.record
      onUpdated(oldVal, e.record)
    }
    if (e.action === 'delete') {
      console.warn(
        `The root record ${rawData.value?.id} from collection ${collection} was deleted, no more realtime updates from now on`
      )
      onDeleted()
    }
  })
}
