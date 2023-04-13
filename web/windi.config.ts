import { defineConfig } from 'windicss/helpers'
// @ts-ignore
import tw from './tailwind.config.cjs'

export default defineConfig({
  attributify: true,
  theme: tw.theme,
})
