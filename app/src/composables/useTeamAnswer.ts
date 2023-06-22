import { Point } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useTeamStore } from '~/stores/team/team'
import dataURItoBlob from '~/utils/dataURIToBlob'
import { showModal } from '~/composables/useModal'

export default function useTeamAnswer(
  point: Point,
  autoValidation: boolean,
  isMedia: boolean
) {
  const pb = usePocketBase()
  const loading = ref(false)
  const store = useTeamStore()
  const router = useIonRouter()

  const successModal = async (isCorrect: boolean) => {
    let title = ''
    if (autoValidation) {
      title = isCorrect ? 'Bravo !' : 'Dommage...'
    } else {
      title = 'Réponse envoyée !'
    }
    let content = ''
    if (autoValidation) {
      if (isCorrect) {
        content = `<p class="text-lg font-bold mb-4">Vous avez obtenu les points ! </p>
<div class="bg-red px-6 py-4 rounded-md text-white font-bold mb-4">+${point.score} points</div>`
      } else {
        content = `<p class="text-lg font-bold mb-2">Vous ferez mieux au prochain point !</p>`
      }
    } else {
      content =
        '<p class="mb-2">Le maitre du jeu doit valider votre réponse pour obtenir les points. </p>'
    }
    content += '<p>Vous pouvez passer au point suivant. </p>'

    await showModal(
      title,
      content,
      [
        {
          actionName: 'close',
          color: 'green',
          title: 'On continue !',
        },
      ],
      autoValidation ? (isCorrect ? 'win' : 'wrong') : 'send',
      'fullscreen'
    )
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace({ name: 'team' })
    }
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
    successModal(isCorrect)
    store.refreshAll()
  }
  return { sendAnswer, loading }
}
