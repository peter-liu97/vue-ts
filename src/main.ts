import { createApp } from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

import { globalRegister } from './global'
import hyRequest from './service/indix'

hyRequest.requist({
  url: '/home/multidada',
  method: 'GET'
})
// import './service/axios_demo'
const app = createApp(App)
app.use(router)
app.use(store)
// globalRegister(app)
app.use(globalRegister)

// app.use(ElementPlus)
app.mount('#app')
