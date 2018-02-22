// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import stores from './store/stores.js'
import axios from 'axios'
import vueAxios from 'vue-axios'
// import 'flex.css'
Vue.use(vueAxios, axios)
Vue.config.productionTip = false
axios.defaults.withCredentials=true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:stores,
  template: '<App/>',
  components: { App }
})
