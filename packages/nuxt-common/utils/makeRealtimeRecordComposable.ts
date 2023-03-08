import {ref, Ref, onUnmounted} from 'vue'
import {z, ZodObject} from 'zod'
import {usePocketBase} from '../composables/usePocketBase';
import {makeRecordComposable, RecordComposable, RecordComposableData} from './makeRecordComposable';

export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema) {
  const useRecord = makeRecordComposable(collection, schema, true)
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
