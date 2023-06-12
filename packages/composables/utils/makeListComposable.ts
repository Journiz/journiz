import { z, ZodType } from 'zod'
import { Ref, ref } from 'vue'
import { flattenExpands } from '@journiz/api-types'
import { Record, RecordFullListQueryParams } from 'pocketbase'
import { usePocketBase } from '../src/data/usePocketBase'

export type ListComposableData<Schema extends ZodType> = {
  data: Ref<z.infer<Schema>[]>
  rawData: Ref<Record[]>
  refresh: () => Promise<void>
  loading: any
}
export type ListComposable<Schema extends ZodType> = (
  queryParams?: RecordFullListQueryParams
) => ListComposableData<Schema>

/**
 * This function creates a composable that contains the data from the record if any, the error data, the loading state,
 * and a refresh function.
 * @param collection
 * @param schema
 * @param expand
 * @param lazy
 * @param expandDefaults
 */

export function makeListComposable<Schema extends ZodType>(
  collection: string,
  schema: Schema,
  lazy = false
): ListComposable<Schema> {
  const pb = usePocketBase()

  return (
    queryParams?: RecordFullListQueryParams
  ): ListComposableData<Schema> => {
    const loading = ref(false)
    const data: Ref<z.infer<Schema>[]> = ref([])
    const rawData: Ref<Record[]> = ref([])

    const parseData = () => {
      if (rawData.value) {
        const newData = []
        for (const record of rawData.value) {
          const result = flattenExpands(record)
          newData.push(schema.parse(result))
        }
        data.value = newData
      }
    }

    const refresh = async () => {
      loading.value = true
      const result = await pb.collection(collection).getFullList(queryParams)
      if (!result) {
        rawData.value = []
      }
      rawData.value = result
      parseData()
      loading.value = false
    }
    if (!lazy) {
      refresh().then()
    }
    return {
      data,
      rawData,
      refresh,
      loading,
    }
  }
}
