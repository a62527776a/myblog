import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/home'
import My from '@/page/my'
import Article from '@/page/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/my',
          name: 'My',
          component: My
        },
        {
          path: '/article/:id',
          name: 'Article',
          component: Article
        }
      ]
    }
  ]
})
