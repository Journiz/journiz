import { onUnmounted } from 'vue'
import { ZodObject } from 'zod'
import { Record } from 'pocketbase'
import { cloneDeep } from '@journiz/api-types'
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

  return (initialId?: string | null): RecordComposableData<Schema> => {
    const {
      data,
      loading,
      refresh,
      rawData,
      update,
      updateLoading,
      setId: staticSetId,
    } = useRecord(initialId)

    let unsubscribes: (() => void)[] = []

    const bind = async () => {
      if (!data.value) {
        return
      }

      const updateCallbacks: ((oldVal: any) => void)[] = []
      const un = await pb
        .collection(collection)
        .subscribe(data.value.id, (e) => {
          if (e.action === 'update') {
            const oldVal = cloneDeep(rawData.value)
            e.record.expand = Object.assign(
              {},
              e.record.expand,
              rawData.value?.expand ?? {}
            )
            rawData.value = e.record
            updateCallbacks.forEach((c) => c(oldVal))
          }
        })
      unsubscribes.push(un)

      const expand = rawData.value?.expand
      if (rawData.value && expand) {
        for (const [key, expandValue] of Object.entries(expand)) {
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
              const expandedArray = expandValue as DirectExpandArrayMeta<Record>
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
              // Handle when relation property changes (added or deleted id)
              updateCallbacks.push(async (oldVal: any) => {
                const oldArray = oldVal[key]
                const newArray = rawData.value![key]
                const addedIds = newArray.filter(
                  (x: string) => !oldArray.includes(x)
                )
                const removedIds = oldArray.filter(
                  (x: string) => !newArray.includes(x)
                )
                for (const id of removedIds) {
                  const index = expandValue.findIndex(
                    (r: Record) => r.id === id
                  )
                  expandValue.splice(index, 1)
                }
                for (const id of addedIds) {
                  const record = await pb.collection(collectionName).getOne(id)
                  expandValue.push(record)
                }
                // We sort the expanded array to match the order in the ids array
                expandValue.sort(
                  (a: Record, b: Record) =>
                    newArray.indexOf(a.id) - newArray.indexOf(b.id)
                )
              })
            }
          } else {
            // watch single record
            const v = expandValue as Record
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

    if (initialId && initialId !== 'undefined') {
      console.log('initial dfetch ' + collection, typeof initialId)
      refresh().then(bind)
    }
    const setId = async (id?: string | null) => {
      unsubscribeAll()
      await staticSetId(id)
      if (id) {
        await bind()
      }
    }

    return {
      data,
      loading,
      refresh,
      rawData,
      update,
      updateLoading,
      setId,
    }
  }
}
