
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue'
import router from './router'
import axios from "axios";
const app = createApp(App)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
const instance = axios.create({
    baseURL: '/api'
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
    NProgress.start()
    return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
    NProgress.done()
    return response
})
app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
