import 'virtual:windi.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonicVue,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import App from './App.vue'
import router from './router'
import plugins from '~/plugins'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

// Our custom CSS
import './assets/main.css'

plugins()

const app = createApp(App)
export const pinia = createPinia()

app.use(IonicVue)
// Global components
app.component('IonButton', IonButton)
app.component('IonButtons', IonButtons)
app.component('IonBackButton', IonBackButton)
app.component('IonHeader', IonHeader)
app.component('IonContent', IonContent)
app.component('IonPage', IonPage)
app.component('IonTitle', IonTitle)
app.component('IonToolbar', IonToolbar)

app.use(pinia)
app.use(router)

app.mount('#app')
