import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { reactive } from 'vue'

const app = createApp(App)
const GlobalStore = reactive({ flashMessage: "" })
app.provide("GlobalStore", GlobalStore) // provide/inject way of doing global state management!!!!
app.use(createPinia())
app.use(router)

app.mount('#app')
