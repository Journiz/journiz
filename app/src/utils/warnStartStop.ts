import { showModal } from '~/composables/useModal'

export const warnUserEndTrip = async () => {
  await showModal(
    "C'est fini !",
    `<p>Le chrono est fini !</p>
<p>Les équipes ont reçu une notification et se rendent au point de ralliement</p>`,
    [
      {
        title: 'Ok',
        actionName: 'ok',
        color: 'theme',
      },
    ],
    'alarm'
  )
}

export const warnTeamEndTrip = async () => {
  await showModal(
    'Driiiiiiiing !',
    `<p>Et c’est fini ! Bravo à tous !</p>
<p>Retournez au point de raliement pour finir cette super partie ! Soyez fiers !</p>`,
    [
      {
        title: 'Rentrer au point de ralliement',
        actionName: 'ok',
        color: 'theme',
      },
    ],
    'alarm'
  )
}
