import './assets/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


const app = createApp(App)

app.use(createPinia())
app.use(router)

const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(VueSweetalert2)
app.mount('#app')
