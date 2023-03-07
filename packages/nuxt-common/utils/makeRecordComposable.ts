import {TypeOf, z, ZodObject} from 'zod'
import {usePocketBase} from '../composables/usePocketBase';

export type RecordComposable<Schema extends ZodObject<any>> = (id: string) => Promise<TypeOf<Schema> | null>

export function makeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema): RecordComposable<Schema> {
  return async (id: string): Promise<z.infer<Schema>|null> => {
    const pb = usePocketBase()
    const result = await pb.collection(collection).getOne(id)
    if (!result) {
      return null
    }
    return schema.parse(result)
  }
}
