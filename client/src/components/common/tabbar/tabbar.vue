<template>
  <footer class="tabbar">
    <slot />
  </footer>
</template>

<script>
  export default {
    name: 'tabbar'
  }
</script>

<style lang="less" scoped>
.tabbar {
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex: 1;
  box-shadow: 0 -2px 5px #eee;
  padding: 0 2%;
  width: 96%;
}
</style>
