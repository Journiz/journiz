import { Record } from 'pocketbase'

export interface DirectExpandArrayMeta<T> extends Array<T> {
  collectionName?: string
}
export const directExpandEmptyArray = <T>(
  collectionName: string
): (() => DirectExpandArrayMeta<T>) => {
  const val: DirectExpandArrayMeta<T> = []
  val.collectionName = collectionName
  return () => val
}
export const getCollectionName = (
  expandedArray: DirectExpandArrayMeta<Record>,
  key = 'unknown'
) => {
  const collectionName = expandedArray[0]
    ? expandedArray[0].collectionName
    : expandedArray.collectionName
  if (!collectionName) {
    throw new Error(
      `Error in Realtime Composable: unable to find collection name for expanded field "${key}. Did you provide default with meta collectionName ?"`
    )
  }
  return collectionName
}
