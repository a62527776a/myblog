/**
 * @desc 根据当前不同的路由以及状态切换不同的显示效果
 * @var { String } state
 * edit 编辑状态 (输入时状态)
 * waitInput 等待输入状态
 * add 新建状态
 * hidden 隐藏状态
 * @method SETASSISTANTSTATE 设置当前状态
 */

const SETASSISTANTSTATE = 'SETASSISTANTSTATE'

export default {
  state: {
    state: 'hidden'
  },
  mutations: {
    [SETASSISTANTSTATE] (state, _state) {
      state.state = _state
    }
  },
  actions: {
    [SETASSISTANTSTATE] ({ commit }, state) {
      commit('SETASSISTANTSTATE', state)
    }
  }
}
