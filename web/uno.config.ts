import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
} from 'unocss'
// @ts-ignore
import { theme } from './tailwind.config.cjs'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetAttributify(), presetUno()],
  rules: [],
  transformers: [transformerDirectives()],
  theme: { ...theme, ...theme.extend },
})
