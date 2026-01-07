import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import Pagination from '../src'

const app = createApp(App)
app.use(Pagination, {
  language: 'de'
})
app.mount('#app')
