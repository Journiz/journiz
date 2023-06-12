import { Point } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useTeamStore } from '~/stores/team/team'
import dataURItoBlob from '~/utils/dataURIToBlob'

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
    const data = new FormData()
    if (isMedia) {
      const blob = dataURItoBlob(answerData)
      data.append('answerMedia', blob)
    } else {
      data.append('answerData', answerData)
    }
    data.append('point', point.id)
    data.append('team', store.team!.id)
    data.append('isCorrect', isCorrect.toString())
    data.append('hasBeenValidated', autoValidation.toString())
    await pb.collection('answer').create(data)
    loading.value = false
    successModal()
  }
  return { sendAnswer, loading }
}
