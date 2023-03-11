import {Record} from 'pocketbase'
import cloneDeep from './cloneDeep';

export function flattenExpands<T extends Record>(data: T): T {
    if (!data.expand) return data
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