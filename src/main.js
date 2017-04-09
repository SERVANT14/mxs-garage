// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './components/app'
import router from './router'
import store from './store'
import { register as registerGlobalComponents } from './components/global'

Vue.use(VeeValidate)
Vue.config.productionTip = false

registerGlobalComponents(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
