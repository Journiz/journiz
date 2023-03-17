import { z, ZodObject } from 'zod'
import { isRef, Ref, ref, watch } from 'vue'
import { flattenExpands } from '@journiz/api-types'
import { Record } from 'pocketbase'
import { MaybeRef, resolveUnref } from '@vueuse/shared'
import { usePocketBase } from '../src/usePocketBase'

export type RecordComposableData<Schema extends ZodObject<any>> = {
  data: Ref<z.infer<Schema> | null>
  rawData: Ref<Record | null>
  refresh: () => Promise<void>
  update: () => Promise<void>
  loading: any
  updateLoading: any
}
export type RecordComposable<Schema extends ZodObject<any>> = (
  id?: MaybeRef<string | undefined>
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

export function makeRecordComposable<Schema extends ZodObject<any>>(
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

  return (
    idRef?: MaybeRef<string | undefined>
  ): RecordComposableData<Schema> => {
    const loading = ref(false)
    const updateLoading = ref(false)
    const data: Ref<z.infer<Schema> | null> = ref(null)
    const rawData: Ref<Record | null> = ref(null)

    const parseData = () => {
      if (rawData.value) {
        const result = flattenExpands(rawData.value)
        data.value = schema.parse(result)
      }
    }
    watch(rawData, parseData, { deep: true })

    const ensureId = () => {
      const id = resolveUnref(idRef)
      if (!id) {
        throw new Error(
          `Trying to use composable for collection ${collection} without an id provided.`
        )
      }
      return id
    }
    const refresh = async () => {
      const id = ensureId()
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
      const id = ensureId()
      if (data.value) {
        updateLoading.value = true
        await pb.collection(collection).update(id, data.value)
        updateLoading.value = false
      }
    }

    // Initial load only if id provided
    if (!lazy && resolveUnref(idRef)) {
      refresh().then()
    }
    if (!lazy && isRef(idRef)) {
      watch(idRef, async (newId) => {
        if (!newId) return
        await refresh()
      })
    }

    return {
      data,
      rawData,
      refresh,
      update,
      loading,
      updateLoading,
    }
  }
}
