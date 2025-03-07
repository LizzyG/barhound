import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

// Use plugins
app.use(router)
app.use(pinia)

// Mount the app
app.mount('#app')
