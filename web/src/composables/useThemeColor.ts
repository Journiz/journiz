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
  teal: '#AEE4BA',
}

const defaultColor = 'red'
export const getColor = (colorName: string) => {
  const color = colorName as keyof typeof themeColors
  if (!color) {
    colorName = defaultColor
  }
  return themeColors[color]
}
