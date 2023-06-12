import { Point } from '@journiz/api-types'

export type PointWithDependents = Point & { dependents?: PointWithDependents[] }
