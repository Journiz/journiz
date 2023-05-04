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
  loading: any
  updateLoading: any
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

  const applyExpandDefaults = (record: Record) => {
    for (const [expand, defaultFn] of Object.entries(expandDefaults)) {
      if (!record.expand[expand]) {
        record.expand[expand] = defaultFn()
      }
    }
  }

  return (initialId?: string | null): RecordComposableData<Schema> => {
    const idRef = ref(initialId)
    const loading = ref(false)
    const updateLoading = ref(false)
    const data: Ref<z.infer<Schema> | null> = ref(null)
    const rawData: Ref<Record | null> = ref(null)

    const parseData = () => {
      if (rawData.value) {
        const result = flattenExpands(rawData.value)
        data.value = schema.parse(result)
      } else {
        data.value = null
      }
    }
    watch(rawData, parseData, { deep: true })

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
      }
      applyExpandDefaults(result)
      rawData.value = result
      loading.value = false
    }

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

    // Initial load only if id provided
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
