import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import './assets/styles/main.scss'
import App from './App.vue'

inject()

createApp(App).mount('#app')
