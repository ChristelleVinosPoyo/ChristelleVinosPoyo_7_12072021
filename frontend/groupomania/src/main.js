import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './Routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes : Routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
