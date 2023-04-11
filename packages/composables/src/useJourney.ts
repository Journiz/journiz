import { JourneySchema, Point } from '@journiz/api-types'
import { makeRecordComposable } from '../utils/makeRecordComposable'
import {
  DirectExpandArrayMeta,
  makeRealtimeRecordComposable,
} from '../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../utils/makeListComposable'

export const useJourneys = makeListComposable('journey', JourneySchema)

export const useJourney = makeRecordComposable(
  'journey',
  JourneySchema,
  'points'
)
export const useRealtimeJourney = makeRealtimeRecordComposable(
  'journey',
  JourneySchema,
  'points',
  {
    points: () => {
      const val: DirectExpandArrayMeta<Point> = []
      val.collectionName = 'point'
      return val
    },
  }
)
