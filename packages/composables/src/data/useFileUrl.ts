import { computed } from 'vue'
import { usePocketBase } from './usePocketBase'

export const useFileUrl = (record: any, fileName: string) => {
  const pb = usePocketBase()
  return computed(() => {
    return pb.getFileUrl(record, fileName)
  })
}
