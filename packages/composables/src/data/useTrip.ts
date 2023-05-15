import { TripSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../../utils/makeListComposable'

export const useTrips = makeListComposable('trip', TripSchema)

export const useTrip = makeRecordComposable('trip', TripSchema)
export const useRealtimeTrip = makeRealtimeRecordComposable('trip', TripSchema)
export const useTripForGameMaster = makeRecordComposable(
  'trip',
  TripSchema,
  'team(trip)'
)
export const useRealtimeTripForGameMaster = makeRealtimeRecordComposable(
  'trip',
  TripSchema,
  'team(trip)',
  {
    'team(trip)': () => [],
  }
)
