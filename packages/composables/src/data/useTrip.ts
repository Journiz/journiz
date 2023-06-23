import { TripSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../../utils/makeListComposable'

export const useTrips = makeListComposable('trip', TripSchema)

export const useTrip = makeRecordComposable('trip', TripSchema, 'journey.user')
export const useRealtimeTrip = makeRealtimeRecordComposable(
  'trip',
  TripSchema,
  'journey,journey.points,team(trip)',
  {
    'team(trip)': () => [],
  }
)

export const useTripForGameMaster = makeRecordComposable(
  'trip',
  TripSchema,
  'journey,journey.points,team(trip).answer(team)'
)
export const useRealtimeTripForGameMaster = makeRealtimeRecordComposable(
  'trip',
  TripSchema,
  'journey,journey.points,team(trip).answer(team)',
  {
    'team(trip)': () => [],
    'answer(team)': () => [],
  }
)
