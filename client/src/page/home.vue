<template>
  <a>
  <transition :name="routerTransition">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
  <Tabbar>
    <TabbarItem
      @click.native="$router.push(item.path)"
      v-for="(item, idx) in navigator"
      :actived="item.path === $route.path"
      :key="idx"
      :label="item.name">
      <Icons type="article" :actived="item.path === $route.path"></Icons>
    </TabbarItem>
  </Tabbar>
  </a>
</template>

<script>
import config from '../config'

export default {
  name: 'home',
  data () {
    return {
      routerTransition: 'root-navigator-slider-right',
      navigator: config.navigator
    }
  },
  methods: {

  },
  watch: {
    // 根据路由下标决定路由切换过渡动画
    '$route' (to, from) {
      this.routerTransition = to.meta.idx < from.meta.idx ? 'root-navigator-slider-right' : 'root-navigator-slider-left'
    }
  },
  mounted () {

  }
}
</script>
