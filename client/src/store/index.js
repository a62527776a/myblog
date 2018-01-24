import Vue from 'vue'
import Vuex from 'vuex'
import networkLoadState from './networkload_state'
import splashScreen from './splash_screen'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    networkLoadState,
    splashScreen
  }
})
