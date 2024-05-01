import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import store from './store'
import VueCookies from 'vue-cookies'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueCookies)

app.mount('#app')
