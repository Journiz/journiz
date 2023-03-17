import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { IonicVue } from '@ionic/vue'
import App from './App.vue'
import router from './router'
import plugins from '~/plugins'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

// Our custom CSS
import './assets/main.css'

plugins()

const app = createApp(App)
export const pinia = createPinia()

app.use(IonicVue)
app.use(pinia)
app.use(router)

app.mount('#app')
