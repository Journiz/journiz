import { computed } from 'vue'
import { usePocketBase } from './usePocketBase'

export const useFileUrl = (record: any, fileName: string) => {
  const pb = usePocketBase()
  return computed(() => {
    return fileName ? pb.getFileUrl(record, fileName) : null
  })
}
