import { Ref, ref } from 'vue'
import { ButtonColor } from '~/types/Button'

const title = ref('Titre')
const content = ref('Texte')
const animationName = ref('')
const isOpen = ref(false)
const layout = ref<'window' | 'fullscreen'>('window')
const buttons: Ref<
  {
    actionName: string
    color?: ButtonColor
    title: string
  }[]
> = ref([
  {
    actionName: 'cancel',
    color: 'red',
    title: 'Annuler',
  },
])

let closeCallback: (action: string) => void
export const useAppModal = () => {
  const closeWithAction = (action: string) => {
    closeCallback?.(action)
    isOpen.value = false
  }
  return {
    isOpen,
    title,
    content,
    buttons,
    animationName,
    layout,
    closeWithAction,
  }
}

export const showModal = (
  modalTitle: string,
  modalContent: string,
  btns: typeof buttons.value,
  animation = '',
  modalLayout: typeof layout.value = 'window'
) => {
  title.value = modalTitle
  content.value = modalContent
  animationName.value = animation
  buttons.value = btns
  layout.value = modalLayout

  // key.value++
  isOpen.value = true

  return new Promise((resolve) => {
    closeCallback = (action: string) => {
      isOpen.value = false
      resolve(action)
    }
  })
}
