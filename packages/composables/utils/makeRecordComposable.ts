import { z, ZodType } from 'zod'
import { Ref, ref, watch } from 'vue'
import { flattenExpands } from '@journiz/api-types'
import { Record } from 'pocketbase'
import { usePocketBase } from '../src/data/usePocketBase'

export type RecordComposableData<Schema extends ZodType<any>> = {
  data: Ref<z.infer<Schema> | null>
  rawData: Ref<Record | null>
  refresh: () => Promise<void>
  update: () => Promise<void>
  loading: Ref<boolean>
  updateLoading: Ref<boolean>
  setId: (id?: string | null) => Promise<void>
}
export type RecordComposable<Schema extends ZodType<any>> = (
  initialId?: string | null
) => RecordComposableData<Schema>

/**
 * This function creates a composable that contains the data from the record if any, the error data, the loading state,
 * and a refresh function.
 * @param collection
 * @param schema
 * @param expand
 * @param lazy
 * @param expandDefaults
 */

export function makeRecordComposable<Schema extends ZodType<any>>(
  collection: string,
  schema: Schema,
  expand = '',
  expandDefaults: { [k: string]: () => any } = {},
  lazy = false
): RecordComposable<Schema> {
  const pb = usePocketBase()

  /**
   * This function applies default values for when expand data is empty, for data consistency
   * @param record
   */
  function applyExpandDefaults(record: Record) {
    for (const [expand, defaultFn] of Object.entries(expandDefaults)) {
      if (!record.expand[expand]) {
        record.expand[expand] = defaultFn()
      }
    }
  }

  return (initialId?: string | null): RecordComposableData<Schema> => {
    // Reference to the id of the record. Can change over time.
    const idRef = ref(initialId)

    // Booleans to indicate if an action is loading
    const loading = ref(false)
    const updateLoading = ref(false)

    // The typed data of the record, and the raw data from the API
    const data: Ref<z.infer<Schema> | null> = ref(null)
    const rawData: Ref<Record | null> = ref(null)

    /**
     * This function parses the raw data from the API into the typed data, using zod
     */
    const parseData = () => {
      if (rawData.value) {
        const result = flattenExpands(rawData.value)
        try {
          data.value = schema.parse(result)
        } catch (e) {
          console.error('Error with updated data:', e)
        }
      } else {
        data.value = null
      }
    }
    // When the raw data changes, update the typed data
    watch(rawData, parseData)

    const refresh = async () => {
      const id = idRef.value
      if (!id) {
        rawData.value = null
        return
      }
      loading.value = true
      const result = await pb.collection(collection).getOne(id, { expand })
      if (!result) {
        rawData.value = null
        loading.value = false
        return
      }
      applyExpandDefaults(result)
      rawData.value = result
      loading.value = false
    }

    /**
     * The data returned from this composable can be muted directly, and this function will
     * update the record to the new data.
     */
    const update: () => Promise<void> = async () => {
      const id = idRef.value
      if (!id) {
        throw new Error(
          'RecordComposable: Trying to update a record without an id'
        )
      }
      if (data.value) {
        updateLoading.value = true
        await pb.collection(collection).update(id, data.value)
        updateLoading.value = false
      }
    }

    // If not lazy, and there is an id, fetch the data on creation
    if (!lazy && idRef.value) {
      refresh().then()
    }
    const setId = async (id?: string | null) => {
      idRef.value = id
      await refresh()
    }

    return {
      data,
      rawData,
      refresh,
      update,
      loading,
      updateLoading,
      setId,
    }
  }
}
