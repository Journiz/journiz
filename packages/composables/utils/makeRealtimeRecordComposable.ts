import { isRef, onUnmounted, watch } from 'vue'
import { ZodObject } from 'zod'
import { Record } from 'pocketbase'
import { MaybeRef, resolveUnref } from '@vueuse/shared'
import { usePocketBase } from '../src/usePocketBase'
import {
  makeRecordComposable,
  RecordComposable,
  RecordComposableData,
} from './makeRecordComposable'

/**
 * This function creates a composable that contains the same data from the makeRecordComposable function, but with a
 * realtime data. The returned ref will be reactive to any changes made to the record in the database.
 * @param collection
 * @param schema
 * @param lazy
 */
export interface DirectExpandArrayMeta<T> extends Array<T> {
  collectionName?: string
}
export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(
  collection: string,
  schema: Schema,
  expand = '',
  expandDefaults: { [k: string]: () => any } = {}
): RecordComposable<Schema> {
  const useRecord = makeRecordComposable(
    collection,
    schema,
    expand,
    expandDefaults,
    true
  )
  const pb = usePocketBase()

  return (id?: MaybeRef<string | undefined>): RecordComposableData<Schema> => {
    const { data, loading, refresh, rawData, update, updateLoading } =
      useRecord(id)

    let unsubscribes: (() => void)[] = []

    const bind = async () => {
      await refresh()
      const un = await pb
        .collection(collection)
        .subscribe(resolveUnref(id)!, (e) => {
          if (e.action === 'update') {
            e.record.expand = Object.assign(
              {},
              e.record.expand,
              rawData.value?.expand ?? {}
            )
            rawData.value = e.record
          }
        })
      unsubscribes.push(un)

      const expand = rawData.value?.expand
      if (rawData.value && expand) {
        for (const [key, value] of Object.entries(expand)) {
          if (Array.isArray(expand[key])) {
            // watch collection and filter on value
            if (key.includes('(')) {
              const [collection, itemKey] = key.replace(')', '').split('(')
              // Handle adds, updates and deletion
              const unsubscribeCollection = await pb
                .collection(collection)
                .subscribe('*', (data) => {
                  const existingRecordIndex = expand[key].findIndex(
                    (r: Record) => r.id === data.record.id
                  )

                  if (data.action === 'delete' && existingRecordIndex > -1) {
                    rawData.value!.expand[key].splice(existingRecordIndex, 1)
                  } else if (data.record[itemKey] === rawData.value?.id) {
                    if (existingRecordIndex > -1) {
                      ;(rawData.value!.expand[key] as Record[])[
                        existingRecordIndex
                      ] = data.record
                    } else {
                      rawData.value!.expand[key].push(data.record)
                    }
                  } else if (existingRecordIndex > -1) {
                    rawData.value!.expand[key].splice(existingRecordIndex, 1)
                  }
                })
              unsubscribes.push(unsubscribeCollection)
            } else {
              // Handle updates of points content
              // Handle updates of own property (maybe not here)
              const expandedArray = value as DirectExpandArrayMeta<Record>
              const collectionName = expandedArray[0]
                ? expandedArray[0].collectionName
                : expandedArray.collectionName
              if (!collectionName) {
                throw new Error(
                  `Error in Realtime Composable: unable to find collection name for expanded field "${key}. Did you provide default with meta ?"`
                )
              }
              const unsubscribe = await pb
                .collection(collectionName)
                .subscribe('*', (data) => {
                  if (data.action !== 'update') return
                  const isConcerned = rawData.value?.[key].includes(
                    data.record.id
                  )
                  if (isConcerned) {
                    const existingRecordIndex = expand[key].findIndex(
                      (r: Record) => r.id === data.record.id
                    )
                    ;(expand[key] as Record[])[existingRecordIndex] =
                      data.record
                  }
                })
              unsubscribes.push(unsubscribe)
            }
          } else {
            // watch single record
            const v = value as Record
            const unsubscribeSingle = await pb
              .collection(v.collectionName)
              .subscribe(v.id, (data) => {
                if (rawData.value) {
                  rawData.value.expand[key] = data.record
                }
              })
            unsubscribes.push(unsubscribeSingle)
          }
        }
      }
    }
    const unsubscribeAll = () => {
      unsubscribes.forEach((u) => u())
      unsubscribes = []
    }
    onUnmounted(unsubscribeAll)

    if (resolveUnref(id)) {
      bind().then()
    }
    if (isRef(id)) {
      watch(id, async (newId) => {
        unsubscribeAll()
        if (!newId) return
        await bind()
      })
    }

    return {
      data,
      loading,
      refresh,
      rawData,
      update,
      updateLoading,
    }
  }
}
