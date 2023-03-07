import {ref, Ref, onUnmounted} from 'vue'
import {z, ZodObject} from 'zod'
import {usePocketBase} from '../composables/usePocketBase';
import {makeRecordComposable, RecordComposable} from './makeRecordComposable';

export function makeRealtimeRecordComposable<Schema extends ZodObject<any>>(collection: string, schema: Schema) {
  const useRecord = makeRecordComposable(collection, schema)
  const pb = usePocketBase()

  return (id: string): Ref<z.infer<Schema>> => {
    const data = ref(null)
    let unsubscribe

    const bind = async () => {
      const record = await useRecord(id)
      data.value = record
      unsubscribe = await pb.collection(collection).subscribe(id, e => {
        if (e.action === 'update') {
          data.value = e.record
        }
      })
    }
    onUnmounted(() => unsubscribe?.())
    bind().then()
    return data
  }
}
