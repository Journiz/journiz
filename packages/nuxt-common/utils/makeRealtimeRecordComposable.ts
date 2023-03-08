import {ref, Ref, onUnmounted} from 'vue'
import {z, ZodObject} from 'zod'
import {usePocketBase} from '../composables/usePocketBase';
import {makeRecordComposable, RecordComposable, RecordComposableData} from './makeRecordComposable';

/**
 * This function creates a composable that contains the same data from the makeRecordComposable function, but with a
 * realtime data. The returned ref will be reactive to any changes made to the record in the database.
 * @param collection
 * @param schema
 * @param lazy
 */
export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema) {
  const useRecord = makeRecordComposable(collection, schema, '', true)
  const pb = usePocketBase()

  return (id: string): RecordComposableData<Schema> => {
    const {data, loading, refresh} = useRecord(id)

    let unsubscribe: () => void
    const bind = async () => {
      await refresh()
      unsubscribe = await pb.collection(collection).subscribe(id, e => {
        if (e.action === 'update') {
          data.value = e.record
        }
      })
    }

    onUnmounted(() => unsubscribe?.())
    bind().then()
    return {
      data, loading, refresh
    }

  }
}
