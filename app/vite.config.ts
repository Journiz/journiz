import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginWindicss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePluginWindicss()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 4000,
    host: '0.0.0.0',
  },
})
console.log(
  `⚡️ Configuring vite with backend at ${
    process.env.VITE_API_URL ?? 'https://dev.journiz.leoboyer.dev'
  }`
)
