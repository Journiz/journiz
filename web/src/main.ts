import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-expect-error This plugin is not typed
import { UidPlugin } from '@shimyshack/uid'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)
export const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(UidPlugin)

app.mount('#app')
