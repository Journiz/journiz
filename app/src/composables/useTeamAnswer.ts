import { Point } from '@journiz/api-types'
import { getFileUrl, usePocketBase } from '@journiz/composables'
import { ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useEventBus, useStorage } from '@vueuse/core'
// @ts-ignore no types
import { Howl } from 'howler'
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
  const openHints = useStorage('openHints-' + point.id, 0)

  const successModal = async (isCorrect: boolean, score = 0) => {
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
<div class="bg-red px-6 py-4 rounded-md text-white font-bold mb-4">+${score} points</div>`
      } else {
        content = `<p class="text-lg font-bold mb-2">Vous ferez mieux au prochain point !</p>`
      }
    } else {
      content =
        '<p class="mb-2">Le maitre du jeu doit valider votre réponse pour obtenir les points. </p>'
    }
    content += '<p>Vous pouvez passer au point suivant. </p>'

    if (isCorrect && store.team?.warCry) {
      const url = getFileUrl(store.team, store.team.warCry)
      if (url) {
        const sound = new Howl({
          src: [url],
          preload: true,
        })
        sound.play()
      }
    }

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
    const hasDependendents = store.journey?.expand?.points?.some(
      (p) => p.trigger === point.id
    )
    if (router.canGoBack()) {
      useEventBus('top-tabs').emit('list')
      router.back()
    } else {
      const query: any = {}
      if (hasDependendents) {
        query.subTab = 'list'
      }
      router.replace({ name: 'team', query })
    }
  }

  const sendAnswer = async (
    answerData: string,
    isCorrect = false,
    penalty = 0
  ) => {
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

    const hintPenalty = Math.round(point.score / 4) * openHints.value

    const score = point.score - penalty - hintPenalty
    if (store.team) {
      store.team.score += score
      await store.saveTeam()
    }
    loading.value = false
    openHints.value = 0
    successModal(isCorrect, score)
    store.refreshAll()
  }
  return { sendAnswer, loading }
}
