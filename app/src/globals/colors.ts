import { computed, ref } from 'vue'

export const colors = {
  green: '#549142',
  yellow: '#FFD163',
  pink: '#FF9696',
  black: '#00231E',
  orange: '#FAA829',
  red: '#FF6147',
  purple: '#8156B9',
  skyblue: '#',
  blue: '#',
  brown: '#',
  gray: '#',
}

const colorName = ref('red')
export const useThemeColor = () => {
  const setThemeColor = (color: string) => {
    colorName.value = color
  }
  const themeColor = computed(() => (colors as any)[colorName.value])
  return { themeColor, setThemeColor }
}
