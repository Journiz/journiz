import {TypeOf, z, ZodObject} from 'zod'
import {Ref} from 'vue';
import {flattenExpands} from '@journiz/api-types'
import {Record} from 'pocketbase';

export type RecordComposableData<Schema extends ZodObject<any>> = { data: Ref<z.infer<Schema> | null>; rawData: Ref<Record | null>; refresh: () => Promise<void>; loading: any }
export type RecordComposable<Schema extends ZodObject<any>> = (id: string) => RecordComposableData<Schema>

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

  return (id: string): RecordComposableData<Schema> => {
    const loading = ref(false)
    const data: Ref<z.infer<Schema> | null> = ref(null)
    const rawData: Ref<Record | null> = ref(null)

    const parseData = () => {
      if (rawData.value) {
        const result = flattenExpands(rawData.value)
        data.value = schema.parse(result)
      }
    }
    watch(rawData, parseData, {deep: true})

    const refresh = async () => {
      loading.value = true
      let result = await pb.collection(collection).getOne(id, {expand})
      if (!result) {
        rawData.value = null
      }
      applyExpandDefaults(result)
      rawData.value = result
      loading.value = false
    }

    // Initial load
    if (!lazy) {
      refresh().then()
    }

    return {
      data,
      rawData,
      refresh,
      loading
    }
  }
}
