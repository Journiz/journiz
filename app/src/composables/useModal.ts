import { Ref, ref } from 'vue'
import { ButtonColor } from '~/types/Button'

const title = ref('Titre')
const text = ref('Texte')
const key = ref(0)
const isOpen = ref(false)
const buttons: Ref<{
  [key: string]: {
    text: string
    color: ButtonColor
  }
}> = ref({})

export const useAppModal = () => ({
  isOpen,
  title,
  text,
  key,
  buttons,
})
