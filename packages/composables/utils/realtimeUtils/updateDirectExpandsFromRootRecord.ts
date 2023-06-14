import { Record } from 'pocketbase'
import { usePocketBase } from '../../src/data/usePocketBase'

export const updateDirectExpandsFromRootRecord = async (
  oldVal: Record,
  newVal: Record,
  key: string,
  expandValue,
  collectionName: string
) => {
  const oldArray = oldVal[key]
  const newArray = newVal[key]
  const addedIds = newArray.filter((x: string) => !oldArray.includes(x))
  const removedIds = oldArray.filter((x: string) => !newArray.includes(x))

  const pb = usePocketBase()

  for (const id of removedIds) {
    const index = expandValue.findIndex((r: Record) => r.id === id)
    expandValue.splice(index, 1)
  }
  for (const id of addedIds) {
    const record = await pb.collection(collectionName).getOne(id)
    expandValue.push(record)
  }
  // We sort the expanded array to match the order in the ids array
  expandValue.sort(
    (a: Record, b: Record) => newArray.indexOf(a.id) - newArray.indexOf(b.id)
  )
}
