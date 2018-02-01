<template>
  <touch-ripple color="white" :opacity="0.1" class="msgcard">
    <svg height="10px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="10px" class="cip">
      <polygon points="0 0, 100 0, 100 100" fill="white" />
      <polygon points="0 0, 100 100, 0 100" fill="white" />
      <path d="M 0 0 L 0 100 L 100 100" fill="none" stroke="yellow" />
    </svg>
    <slot />
    <p v-if="!edit" class="content">{{content}}</p>
    <br />
    <p class="author">啊啊啊</p>
    <p class="date">1997.07.07</p>
  </touch-ripple>
</template>

<script>
export default {
  name: 'message-card',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: '亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，亲爱的，'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>