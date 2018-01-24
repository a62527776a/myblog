<template>
  <a>
  <transition :name="routerTransition">
    <router-view />  
  </transition>
  <a class="tap-active">asdasd</a>
    <Tabbar>
      <TabbarItem>1</TabbarItem>
      <TabbarItem>1</TabbarItem>
      <TabbarItem>1</TabbarItem>
      <TabbarItem>1</TabbarItem>
    </Tabbar>
  </a>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      routerTransition: 'slider-right'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.routerTransition = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    }
  },
  mounted () {

  }
}
</script>
