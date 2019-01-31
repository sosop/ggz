import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.use(iView, axios);

axios.defaults.baseURL = "http://127.0.0.1:8989"
axios.defaults.timeout = 3000

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
