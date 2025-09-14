import { createApp } from 'vue' // 引入 createApp，用于创建组件 （花盆）
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue' // 引入根组件 （根）
import { createRouter } from 'vue-router'
const store = createPinia()
const app = createApp(App) // 创建应用
app.use(store)
app.use(router) // 使用路由器

app.mount('#app') // （把花栽到盆里）
