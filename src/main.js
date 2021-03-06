import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = 'Bearer keyh9lRMWBJkbz8uG'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
