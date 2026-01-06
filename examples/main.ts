import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import Pagination from '../src'

// const app = createApp(App)

// app.use(Page, {
//   align: 'left',
//   language: 'en'
// })

// app.mount('#app')

const app = createApp(App)
app.use(Pagination, { language: 'sf' })
app.mount('#app')
