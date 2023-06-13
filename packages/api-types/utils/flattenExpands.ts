import { Record } from 'pocketbase'
import cloneDeep from './cloneDeep'

/**
 * This function normalizes the format of expands from the pocketbase api.
 * Expands can be direct or indirect. This function will convert indirect expands
 * to direct expands in the returned data.
 * @param data
 */
export function flattenExpands<T extends Record>(data: T): T {
  if (!data?.expand) return data
  data = cloneDeep(data)
  for (const [key, value] of Object.entries(data.expand)) {
    if (key.includes('(')) {
      let newKey = key.split('(')[0]
      if (Array.isArray(value)) {
        newKey += 's'
      }
      data.expand[newKey] = value
      delete data.expand[key]
    }
  }
  return data
}
