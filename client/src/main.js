// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueTouchRipple from 'vue-touch-ripple'

import App from './App'
import router from './router'
import store from './store'
import common from './components/common'
// import plugins from './plugins'

import './styles/index.less'
import './plugins/flexible.js'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

Vue.config.productionTip = false

// 波纹效果
Vue.use(VueTouchRipple, {
  color: '#DDD'
})

Object.keys(common).forEach((key) => {
  const name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`${name}`, common[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
