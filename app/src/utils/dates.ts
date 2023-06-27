import { Trip } from '@journiz/api-types'

export const tripIsToday = (trip: Trip) => {
  return (
    new Date(Date.parse(trip.date)).toDateString() === new Date().toDateString()
  )
}
export const padWithZero = (num: number, pad = 2) => {
  return num.toString().padStart(pad, '0')
}
