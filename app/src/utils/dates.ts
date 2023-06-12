import { Trip } from '@journiz/api-types'

export const tripIsToday = (trip: Trip) => {
  return (
    new Date(Date.parse(trip.date)).toDateString() === new Date().toDateString()
  )
}
