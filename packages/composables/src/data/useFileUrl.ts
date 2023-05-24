import { computed, Ref } from 'vue'
import { usePocketBase } from './usePocketBase'

export function useFileUrl<T>(record?: Ref<T>, fileName?: keyof T) {
  const pb = usePocketBase()
  return computed(() => {
    return record && fileName
      ? pb.getFileUrl(record.value as any, record.value[fileName] as string)
      : undefined
  })
}
export const getFileUrl = (record?: any, fileName?: string) => {
  const pb = usePocketBase()
  return record && fileName ? pb.getFileUrl(record, fileName) : undefined
}
