import { usePocketBase } from '@journiz/composables'
import { showModal } from '~/composables/useModal'
import router from '~/router'

export const warnTeamOutside = async () => {
  const action = await showModal(
    'Pas si vite !',
    `<p>Vous êtes en sortis de la zone de jeu !</p>`,
    [
      {
        title: 'On retourne dans la zone',
        actionName: 'ok',
        color: 'theme',
      },
      {
        title: 'Contacter le maître du jeu',
        actionName: 'contact',
        color: 'green',
      },
    ],
    'stop'
  )
  if (action === 'contact') {
    await router.push({ name: 'team-chat' })
  }
}

export const warnOutside = async (teamId: string, teamName: string) => {
  const action = await showModal(
    'Sortie de route !',
    `<p>L'équipe ${teamName} est sortie de la zone de jeu !</p>`,
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
      .getFirstListItem(`team="${teamId}"`)
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
