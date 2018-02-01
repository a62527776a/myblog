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
import config from './config'
import baseAjax from './services'

// less变量使用vux-loader的theme-less插件处理 https://vux.li/#/zh-CN/vux-loader?id=less-theme
// import进来的仅为less文件
import './styles/index.less'
// 淘宝移动端自适应方案
import './plugins/flexible.js'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

// Vue.config.productionTip = false

// 波纹效果
Vue.use(VueTouchRipple, {
  color: '#EEE'
})

Object.keys(common).forEach((key) => {
  const name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`${name}`, common[key])
})

Vue.prototype.$config = config
Vue.prototype.$ajax = baseAjax.baseAjax

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  axios,
  store,
  components: { App }
}).$mount('#app')
