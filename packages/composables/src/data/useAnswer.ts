import { AnswerSchema } from '@journiz/api-types'
import { makeListComposable } from '../../utils/makeListComposable'

export const useAnswers = makeListComposable('answer', AnswerSchema)
