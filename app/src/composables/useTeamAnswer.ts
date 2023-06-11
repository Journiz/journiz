import { Point } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useTeamStore } from '~/stores/team/team'

export default function useTeamAnswer(
  point: Point,
  autoValidation: boolean,
  isMedia: boolean
) {
  const pb = usePocketBase()
  const loading = ref(false)
  const store = useTeamStore()

  const successModal = () => {
    console.log('modal')
  }

  const sendAnswer = async (answerData: string, isCorrect = false) => {
    loading.value = true
    const data = isMedia ? { answerMedia: answerData } : { answerData }
    await pb.collection('answer').create({
      ...data,
      point: point.id,
      team: store.team!.id,
      isCorrect,
      hasBeenValidated: autoValidation,
    })
    loading.value = false
    successModal()
  }
  return { sendAnswer, loading }
}
