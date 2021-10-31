import { createApp } from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'

import { globalRegister } from './global'
import hyRequest from './service/indix'

const app = createApp(App)
app.use(router)
app.use(store)
// globalRegister(app)
app.use(globalRegister)

app.mount('#app')
