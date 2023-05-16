import { computed } from 'vue'
import { useTeamStore } from '~/stores/team/team'

export const themeColors = {
  green: '#549142',
  yellow: '#FFD163',
  pink: '#FF9696',
  black: '#00231E',
  orange: '#FAA829',
  red: '#FF6147',
  purple: '#8156B9',
  skyblue: '#ABD7FF',
  brown: '#8D4A0D',
  violet: '#E8B8FF',
  blue: '#1D609D',
  gray: '#4D4D4D',
}

const defaultColor = 'red'
export const useThemeColor = () => {
  const store = useTeamStore()
  return computed(() => {
    const colorName = store.team?.color || defaultColor
    return themeColors[colorName]
  })
}
