import { showModal } from '~/composables/useModal'

export default async function warnSecurity() {
  await showModal(
    `Sécurité d'abord : ne regardez pas votre téléphone en traversant la rue.`,
    `Gardez toujours un œil sur votre environnement et assurez-vous d'être à l'arrêt en toute sécurité avant de consulter votre téléphone.`,
    [
      {
        actionName: 'ok',
        color: 'red',
        title: 'Promis !',
      },
    ],
    'warn'
  )
}
