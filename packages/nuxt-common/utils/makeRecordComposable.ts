import {TypeOf, z, ZodObject} from 'zod'
import {Ref} from 'vue';
import { flattenExpands } from '@journiz/api-types'
export type RecordComposableData<Schema extends ZodObject<any>> = { data: Ref<z.infer<Schema>|null>; refresh: () => Promise<void>; loading: any }
export type RecordComposable<Schema extends ZodObject<any>> = (id: string) => RecordComposableData<Schema>

/**
 * This function creates a composable that contains the data from the record if any, the error data, the loading state,
 * and a refresh function.
 * @param collection
 * @param schema
 * @param lazy
 */

export function makeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema, expand = '', lazy = false): RecordComposable<Schema> {
  const pb = usePocketBase()
  return (id: string): RecordComposableData<Schema> => {
    const loading = ref(false)
    const data: Ref<z.infer<Schema>|null> = ref(null)
    const refresh = async () => {
      loading.value = true
      let result = await pb.collection(collection).getOne(id, { expand })
      if (!result) {
        data.value = null
      }
      result = flattenExpands(result)
      data.value = schema.parse(result)
      loading.value = false
    }

    // Initial load
    if (!lazy) {
      refresh().then()
    }

    return {
      data,
      refresh,
      loading
    }
  }
}
