import {ref, Ref, onUnmounted} from 'vue'
import {z, ZodObject} from 'zod'
import {flattenExpands} from '@journiz/api-types'
import {usePocketBase} from '../composables/usePocketBase';
import {makeRecordComposable, RecordComposable, RecordComposableData} from './makeRecordComposable';

/**
 * This function creates a composable that contains the same data from the makeRecordComposable function, but with a
 * realtime data. The returned ref will be reactive to any changes made to the record in the database.
 * @param collection
 * @param schema
 * @param lazy
 */
export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema, expand = '') {
  const useRecord = makeRecordComposable(collection, schema, expand, true)
  const pb = usePocketBase()

  return (id: string): RecordComposableData<Schema> => {
    const {data, loading, refresh, rawData} = useRecord(id)

    const unsubscribes: (() => void)[] = []

    const parseData = () => {
      if (rawData.value) {
        const result = flattenExpands(rawData.value)
        data.value = schema.parse(result)
      }
    }

    const bind = async () => {
      await refresh()
      const un = await pb.collection(collection).subscribe(id, e => {
        if (e.action === 'update') {
          e.record.expand = Object.assign({}, e.record.expand, rawData.value?.expand ?? {})
          rawData.value = e.record
          parseData()
        }
      })
      const expand = rawData.value?.expand ?? {}
      for (const [key, value] of Object.entries(expand)) {
        if (Array.isArray(value)) {
          // watch collection and filter on value
          if (key.includes('(')) {
            const [collection, itemKey] = key.replace(')', '').split('(')
            console.log(collection, itemKey)
            // Handle adds, updates and deletion
            const unsubscribeCollection = await pb.collection(collection).subscribe('*', data => {
              console.log(data)
            })
            unsubscribes.push(unsubscribeCollection)
          }
        } else {
          // watch single record
          const unsubscribeSingle = await pb.collection(value.collectionName).subscribe(value.id, data => {
            if (rawData.value) {
              rawData.value.expand[key] = data.record
              parseData()
            }
          })
          unsubscribes.push(unsubscribeSingle)
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
