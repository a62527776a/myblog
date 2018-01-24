<template>
  <touch-ripple class="tabbar-item flex-center">
    <div class="tabbar-icon flex-center">
      <slot></slot>
    </div>
  </touch-ripple>
</template>

<script>
export default {
  name: 'tabbar-item',
  methods: {

  }
}
</script>

<style lang="less" scoped>
.tabbar-item {
  flex: 1;
}
</style>