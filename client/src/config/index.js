/**
 * @const navigation root 路由信息
 * @const keepAlive 缓存的组件
 */

export default {
  navigator: [
    {
      path: '/index',
      name: '首页'
    },
    {
      path: '/msgboard',
      name: '留言板'
    },
    {
      path: '/my',
      name: '我的'
    }
  ],
  keepAlive: [
    'index', 'article', 'msg-board', 'my'
  ]
}
