import {JourneySchema, TeamSchema} from '@journiz/api-types'
import {makeRecordComposable} from '../utils/makeRecordComposable';
import {makeRealtimeRecordComposable} from '../utils/makeRealtimeRecordComposable';

export const useTeam = makeRecordComposable('team', TeamSchema)
export const useRealtimeTeam = makeRealtimeRecordComposable('team', TeamSchema)
