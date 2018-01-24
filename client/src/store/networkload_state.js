/**
 * 设置网络加载状态
 */

export const SETLOAD = 'SETLOAD'

export default {
  state: 'resolve',
  mutations: {
    /**
     * @param { String } loadState 加载状态 resolve 完成 reject 失败 loading 加载中
     */
    [SETLOAD] (state, loadState) {
      state = loadState
    }
  }
}
