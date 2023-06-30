import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss'
// @ts-ignore
import { theme } from './tailwind.config.cjs'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetAttributify(), presetUno(), presetIcons()],
  rules: [],
  shortcuts: {
    col: 'flex flex-col',
  },
  transformers: [transformerDirectives()],
  theme: { ...theme, ...theme.extend },
})
