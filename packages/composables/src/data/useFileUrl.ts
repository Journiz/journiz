import { computed, Ref } from 'vue'
import { usePocketBase } from './usePocketBase'

export function useFileUrl<T>(record: Ref<T>, fileNameKey: keyof T) {
  const pb = usePocketBase()
  return computed(() => {
    return record.value && fileNameKey && record.value[fileNameKey]
      ? pb.getFileUrl(record.value as any, record.value[fileNameKey] as string)
      : undefined
  })
}
export const getFileUrl = (record?: any, fileName?: string) => {
  const pb = usePocketBase()
  return record && fileName ? pb.getFileUrl(record, fileName) : undefined
}
