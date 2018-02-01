/**
 * 设置网络加载状态
 */

export const SETNETWORDLOADSTATE = 'SETNETWORDLOADSTATE'

export default {
  state: {
    type: 'resolve'
  },
  mutations: {
    /**
     * @param { String } loadState 加载状态 resolve 完成 reject 失败 loading 加载中
     */
    [SETNETWORDLOADSTATE] (state, loadState) {
      setTimeout(() => {
        state.type = loadState
      }, 500)
    }
  },
  actions: {
    [SETNETWORDLOADSTATE] ({ commit }, loadState) {
      commit('SETNETWORDLOADSTATE', loadState)
    }
  }
}
