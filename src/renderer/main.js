import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

const http = axios.create({
  baseURL: './',
  timeout: 60e3
})
http.interceptors.response.use(
  function resolve (result) {
    const { data } = result
    return data
  },
  function reject (data) {
    const { response } = data
    return Promise.reject(response.data)
  }
)
Vue.http = Vue.prototype.$http = http
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
