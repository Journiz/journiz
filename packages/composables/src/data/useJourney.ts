import { JourneySchema, Point } from '@journiz/api-types'
import { makeRecordComposable } from '../../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../../utils/makeListComposable'
import { directExpandEmptyArray } from '../../utils/realtimeUtils/directExpands'

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
    points: directExpandEmptyArray<Point>('point'),
  }
)
