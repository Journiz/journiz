import {JourneySchema, TripSchema} from '@journiz/api-types'
import {makeRecordComposable} from '../utils/makeRecordComposable';
import {makeRealtimeRecordComposable} from '../utils/makeRealtimeRecordComposable';

export const useTrip = makeRecordComposable('trip', TripSchema, 'journey,team(trip)')
export const useRealtimeTrip = makeRealtimeRecordComposable('trip', TripSchema, 'journey,team(trip)')
