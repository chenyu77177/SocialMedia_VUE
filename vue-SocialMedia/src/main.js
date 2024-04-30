import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
// import axios from 'axios'

const app = createApp(App)

app.use(router)
// app.use(axios)
app.use(store)

app.mount('#app')
