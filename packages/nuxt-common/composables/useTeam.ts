import {JourneySchema} from '@journiz/api-types'
import {makeRecordComposable} from '../utils/makeRecordComposable';
import {makeRealtimeRecordComposable} from '../utils/makeRealtimeRecordComposable';

export const useJourney = makeRecordComposable('journey', JourneySchema)
export const useRealtimeJourney = makeRealtimeRecordComposable('journey', JourneySchema)
