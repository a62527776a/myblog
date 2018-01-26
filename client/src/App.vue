<template>
  <div id="app">
    <Loading />
    <transition :name="routerTransition">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      routerTransition: 'slider-right'
    }
  },
  mounted () {

  },
  watch: {
    // 根据路由深度决定路由切换过渡动画
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.routerTransition = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
html {
  font-size: 10px;
}
</style>
