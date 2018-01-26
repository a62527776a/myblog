<template>
  <touch-ripple class="flex-center">
    <div class="tabbar-item flex-center">
      <slot></slot>
    </div>
    <div :class="{ 'tabbar-label-active' : actived }" class="tabbar-label flex-center transition">
      {{label}}
    </div>
  </touch-ripple>
</template>

<script>
export default {
  name: 'tabbar-item',
  props: {
    actived: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.tabbar-label {
  font-size: 1rem;
  color: @SecondaryColor;
}
.tabbar-label-active {
  color: @PrimaryColor;
}
.tabbar-item {
  height: 3rem;
}
</style>