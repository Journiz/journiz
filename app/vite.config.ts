import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    UnoCSS(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        markers: FileSystemIconLoader('src/assets/markers'),
      },
    }),
  ],
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
