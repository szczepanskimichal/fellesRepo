import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

const GlobalStore = reactive({
  flashMessage: '',
})

app.provide('GlobalStore', GlobalStore)
app.use(createPinia())
app.use(router)

app.mount('#app')
