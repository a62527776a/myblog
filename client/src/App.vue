<template>
  <div id="app">
    <Loading v-if="$store.state.networkLoadState.type === 'loading'" />
    <transition :name="routerTransition">
      <keep-alive :include="$config.keepAlive">
        <router-view />
      </keep-alive>
    </transition>
    <Assistant />
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
  methods: {
    /**
     * @method setAssistant 设置小助手状态 根据当前不同的路由切换不同的显示效果
     * @param { String } path 路径 根据该路径设置不同的显示状态
     * @const { Object } state 对应不同路径的状态
     * edit 编辑状态 (输入时状态)
     * save 保存状态 (输入完成时状态)
     * add 新建状态
     * hidden 隐藏状态
     */
    setAssistant (path) {
      const state = {
        '/msgboard': 'add',
        '/msgboard/edit': 'waitInput'
      }
      state[path] ? this.$store.dispatch('SETASSISTANTSTATE', state[path]) : this.$store.dispatch('SETASSISTANTSTATE', 'hidden')
    }
  },
  watch: {
    // 根据路由深度决定路由切换过渡动画
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.routerTransition = toDepth < fromDepth ? 'slider-right' : 'slider-left'
      this.setAssistant(to.path)
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
input,
button,
select,
textarea {
  outline:none
}

</style>
