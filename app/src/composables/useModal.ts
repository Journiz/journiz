import { Ref, ref } from 'vue'
import { ButtonColor } from '~/types/Button'

const title = ref('Titre')
const text = ref('Texte')
const animationName = ref('')
const isOpen = ref(false)
const buttons: Ref<
  {
    actionName: string
    color: ButtonColor
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
    text,
    buttons,
    animationName,
    closeWithAction,
  }
}

export const showModal = (
  modalTitle: string,
  modaltext: string,
  btns: typeof buttons.value,
  animation = ''
) => {
  title.value = modalTitle
  text.value = modaltext
  animationName.value = animation
  buttons.value = btns

  // key.value++
  isOpen.value = true

  return new Promise((resolve) => {
    closeCallback = (action: string) => {
      isOpen.value = false
      resolve(action)
    }
  })
}
