import PocketBase from 'pocketbase'
import { pb } from '@journiz/plugins'
export const usePocketBase = (): PocketBase => {
  return pb
}
