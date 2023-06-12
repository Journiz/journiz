import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'
// @ts-ignore
import { theme } from './tailwind.config.cjs'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetAttributify(), presetUno(), presetIcons()],
  rules: [
    ['top-safe', { top: 'env(safe-area-inset-top)' }],
    ['bottom-safe', { bottom: 'env(safe-area-inset-bottom)' }],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-bottom)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  shortcuts: {
    col: 'flex flex-col',
  },
  safelist: ['py-4', 'rounded-md', 'mb-4'],
  transformers: [transformerDirectives()],
  theme: { ...theme, ...theme.extend },
})
