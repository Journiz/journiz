import { ZodType } from 'zod'
import { Record } from 'pocketbase'
import {
  makeRecordComposable,
  RecordComposable,
  RecordComposableData,
} from './makeRecordComposable'
import { subscribeIndirectExpand } from './realtimeUtils/subscribeIndirectExpand'
import { useSubscriptions } from './realtimeUtils/useSubscriptions'
import { subscribeMainRecord } from './realtimeUtils/subscribeMainRecord'
import { subscribeMultipleDirectExpand } from './realtimeUtils/subscribeMultipleDirectExpand'
import { getCollectionName } from './realtimeUtils/directExpands'
import { updateDirectExpandsFromRootRecord } from './realtimeUtils/updateDirectExpandsFromRootRecord'
import { subscribeSingleDirectExpand } from './realtimeUtils/subscribeSingleDirectExpand'

/**
 * This function creates a composable that contains the same data from the makeRecordComposable function, but with a
 * realtime data. The returned ref will be reactive to any changes made to the record in the database.
 * This also works for expanded data, but only for the first level of expansion.
 * @param collection
 * @param schema
 * @param lazy
 */

export function makeRealtimeRecordComposable<Schema extends ZodType>(
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

  return (initialId?: string | null): RecordComposableData<Schema> => {
    const {
      data,
      loading,
      refresh: refreshSource,
      rawData,
      update,
      updateLoading,
      setId: setSourceId,
    } = useRecord(initialId)

    const { registerSubscription, unsubscribeAll } = useSubscriptions()

    /**
     * Binds the realtime data to the record
     */
    const bind = async () => {
      if (!data.value || !rawData.value) {
        return
      }
      // Start by clearing the current subscriptions
      unsubscribeAll()

      const updateCallbacks: ((oldVal: Record, newVal: Record) => void)[] = []
      const mainRecordSubscription = await subscribeMainRecord(
        rawData,
        collection,
        (oldVal, newVal) => {
          updateCallbacks.forEach((c) => c(oldVal, newVal))
        },
        unsubscribeAll
      )
      registerSubscription(mainRecordSubscription)

      const recordExpandData = rawData.value?.expand
      if (recordExpandData) {
        for (const [key, expandValue] of Object.entries(recordExpandData)) {
          // If the expanded data is multiple
          if (Array.isArray(recordExpandData[key])) {
            // If it's an indirect expand
            if (key.includes('(')) {
              const collectionSubscription = await subscribeIndirectExpand(
                rawData,
                key,
                recordExpandData
              )
              registerSubscription(collectionSubscription)
            } else {
              const collectionName = getCollectionName(
                expandValue as Record[],
                key
              )
              const directUpdateSubscription =
                await subscribeMultipleDirectExpand(
                  rawData,
                  key,
                  collectionName,
                  recordExpandData
                )
              registerSubscription(directUpdateSubscription)

              // Handle when relation property changes on root record
              updateCallbacks.push(async (oldVal, newVal) => {
                await updateDirectExpandsFromRootRecord(
                  oldVal,
                  newVal,
                  key,
                  expandValue,
                  collectionName
                )
              })
            }
          } else {
            // watch single record
            const singleExpandSubscription = await subscribeSingleDirectExpand(
              expandValue as Record,
              key,
              rawData
            )
            registerSubscription(singleExpandSubscription)
          }
        }
      }
    }

    if (initialId && initialId !== 'undefined') {
      refreshSource().then(bind)
    }

    const refresh = async () => {
      unsubscribeAll()
      await refreshSource()
      await bind()
    }

    const setId = async (id?: string | null) => {
      unsubscribeAll()
      await setSourceId(id)
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
