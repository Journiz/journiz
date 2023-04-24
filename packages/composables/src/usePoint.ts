import { PointSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../utils/makeListComposable'

export const usePoints = makeListComposable('point', PointSchema)

export const usePoint = makeRecordComposable('point', PointSchema)
export const useRealtimeJourney = makeRealtimeRecordComposable(
  'point',
  PointSchema
)
