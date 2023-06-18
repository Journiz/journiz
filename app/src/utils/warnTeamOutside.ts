import { Team } from '@journiz/api-types'
import { usePocketBase } from '@journiz/composables'
import { showModal } from '~/composables/useModal'
import router from '~/router'
export const warnTeamOutside = async (team: Team) => {
  const action = await showModal(
    'Sortie de route !',
    `<p>L'équipe ${team.name} est sortie de la zone de jeu !</p>`,
    [
      {
        title: 'Ok',
        actionName: 'ok',
        color: 'theme',
      },
      {
        title: "Contacter l'équipe",
        actionName: 'contact',
        color: 'green',
      },
    ],
    'warn'
  )
  if (action === 'contact') {
    const conversation = await usePocketBase()
      .collection('conversation')
      .getFirstListItem(`team="${team.id}"`)
    if (!conversation) {
      return
    }
    await router.push({
      name: 'user-chat-conversation',
      params: {
        conversationId: conversation.id,
      },
    })
  }
}
