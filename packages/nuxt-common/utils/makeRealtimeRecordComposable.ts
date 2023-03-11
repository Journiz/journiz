import {ref, Ref, onUnmounted} from 'vue'
import {record, z, ZodObject} from 'zod'
import {flattenExpands} from '@journiz/api-types'
import {usePocketBase} from '../composables/usePocketBase';
import {makeRecordComposable, RecordComposable, RecordComposableData} from './makeRecordComposable';
import {Record} from 'pocketbase';

/**
 * This function creates a composable that contains the same data from the makeRecordComposable function, but with a
 * realtime data. The returned ref will be reactive to any changes made to the record in the database.
 * @param collection
 * @param schema
 * @param lazy
 */
export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(
  collection: string,
  schema: Schema,
  expand = '',
  expandDefaults: { [k: string]: () => any } = {}
) {
  const useRecord = makeRecordComposable(collection, schema, expand, expandDefaults, true)
  const pb = usePocketBase()

  return (id: string): RecordComposableData<Schema> => {
    const {data, loading, refresh, rawData} = useRecord(id)

    const unsubscribes: (() => void)[] = []

    const bind = async () => {
      await refresh()
      const un = await pb.collection(collection).subscribe(id, e => {
        if (e.action === 'update') {
          e.record.expand = Object.assign({}, e.record.expand, rawData.value?.expand ?? {})
          rawData.value = e.record
        }
      })
      const expand = rawData.value?.expand
      if (rawData.value && expand) {
        for (const [key, value] of Object.entries(expand)) {
          if (Array.isArray(expand[key])) {
            // watch collection and filter on value
            if (key.includes('(')) {
              const [collection, itemKey] = key.replace(')', '').split('(')
              // Handle adds, updates and deletion
              const unsubscribeCollection = await pb.collection(collection).subscribe('*', data => {
                const existingRecordIndex = expand[key].findIndex((r: Record) => r.id === data.record.id)

                if (data.action === 'delete' && existingRecordIndex > -1) {
                  rawData.value!.expand[key].splice(existingRecordIndex, 1)
                } else if (data.record[itemKey] === rawData.value?.id) {
                  if (existingRecordIndex > -1) {
                    (rawData.value!.expand[key] as Record[])[existingRecordIndex] = data.record
                  } else {
                    rawData.value!.expand[key].push(data.record)
                  }
                } else if (existingRecordIndex > -1) {
                  rawData.value!.expand[key].splice(existingRecordIndex, 1)
                }
              })
              unsubscribes.push(unsubscribeCollection)
            }
          } else {
            // watch single record
            const v = value as Record
            const unsubscribeSingle = await pb.collection(v.collectionName).subscribe(v.id, data => {
              if (rawData.value) {
                rawData.value.expand[key] = data.record
              }
            })
            unsubscribes.push(unsubscribeSingle)
          }
        }
      }
      unsubscribes.push(un)
    }

    onUnmounted(() => unsubscribes.forEach(u => u()))
    bind().then()
    return {
      data, loading, refresh, rawData
    }

  }
}
