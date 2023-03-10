import {Record} from 'pocketbase'

export function flattenExpands<T extends Record>(data: T): T {
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