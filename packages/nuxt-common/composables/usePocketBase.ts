import PocketBase from 'pocketbase';

export const usePocketBase = (): PocketBase => {
  return useNuxtApp().$pb
}
