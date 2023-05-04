import { TeamSchema } from '@journiz/api-types'
import { makeRecordComposable } from '../../utils/makeRecordComposable'
import { makeRealtimeRecordComposable } from '../../utils/makeRealtimeRecordComposable'
import { makeListComposable } from '../../utils/makeListComposable'

export const useTeams = makeListComposable('team', TeamSchema)

export const useTeam = makeRecordComposable(
  'team',
  TeamSchema,
  'conversation(team)'
)
export const useRealtimeTeam = makeRealtimeRecordComposable(
  'team',
  TeamSchema,
  'conversation(team)'
)
