import Vue from 'vue'
import Vuex from 'vuex'
import networkLoadState from './networkload_state'
import splashScreen from './splash_screen'
import assistant from './assistant'
import msgs from './msgs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    networkLoadState,
    splashScreen,
    assistant,
    msgs
  }
})
