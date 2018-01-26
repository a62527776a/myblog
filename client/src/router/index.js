import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/index'
import Home from '@/page/home'
import My from '@/page/my'
import Article from '@/page/article'
import Msgboard from '@/page/msgboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
          meta: {
            idx: 0
          }
        },
        {
          path: '/msgboard',
          name: 'Msgboard',
          component: Msgboard,
          meta: {
            idx: 1
          }
        },
        {
          path: '/my',
          name: 'My',
          component: My,
          meta: {
            idx: 2
          }
        }
      ]
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
