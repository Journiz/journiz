import {TypeOf, z, ZodObject} from 'zod'
import {Ref} from 'vue';

export type RecordComposableData<Schema extends ZodObject<any>> = { data: Ref<z.infer<Schema>|null>; refresh: () => Promise<void>; loading: any }
export type RecordComposable<Schema extends ZodObject<any>> = (id: string) => RecordComposableData<Schema>

export function makeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema, lazy = false): RecordComposable<Schema> {
  const pb = usePocketBase()
  return (id: string): RecordComposableData<Schema> => {
    const loading = ref(false)
    const data: Ref<z.infer<Schema>|null> = ref(null)
    const refresh = async () => {
      loading.value = true
      const result = await pb.collection(collection).getOne(id)
      if (!result) {
        data.value = null
      }
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
