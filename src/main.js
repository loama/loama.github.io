import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Scrollspy from 'vue2-scrollspy'

Vue.config.productionTip = false

Vue.use(Scrollspy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
