import 'virtual:windi.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
export const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
