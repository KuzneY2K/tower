import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import './utils/SocketProvider.js'
// import Spline from 'vue-spline';


const root = createApp(App)
registerGlobalComponents(root)

root
.use(router)
  // .component(Spline)
  .mount('#app')
