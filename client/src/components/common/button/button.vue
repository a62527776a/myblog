<template>
<touch-ripple class="ui-button">
  <div class="flex-center">{{label}}</div>
</touch-ripple>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.ui-button {
  padding: .6rem 1rem;
  box-shadow: 0px 0px 3px @SecondaryColor;
  border-radius: 2px;
  background: white;
  margin: 0 3%;
  width: 88%;
}
</style>