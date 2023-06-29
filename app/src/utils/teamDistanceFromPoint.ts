import { Point, Team } from '@journiz/api-types'
import { distance, point } from '@turf/turf'
export const teamDistanceFromPoint = (team: Team, targetPoint: Point) => {
  if (!team.longitude || !team.latitude) {
    return -1
  }
  const teamPos = point([team.longitude, team.latitude])
  const pointPos = point([targetPoint.longitude, targetPoint.latitude])
  return distance(teamPos, pointPos, { units: 'kilometers' }) * 1000
}
