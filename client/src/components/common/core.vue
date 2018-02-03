<template>
  <div class="ripple"></div>
</template>

<script>
export default {
  data () {
    return {
      rippling: false,
      timer: null
    }
  },
  props: ['id'],
  methods: {
    startRipple () {
      this.timer = setTimeout(() => {
        this.$emit('end', this.id)
        this.rippling = true
      }, 600)
    }
  },
  beforeDestroy () {
    if (this.timer) clearTimeout(this.timer)
  },
  mounted () {
    this.startRipple()
  }
}
</script>

<style lang="less" scoped>
.ripple {
  height: 80px;
  width: 80px;
  background: rgba(256, 256, 256, .3);
  position: absolute;
  transition: all .5s;
  border-radius: 50%;
}
.ripple-enter {
  transform: scale(0)
}
.ripple-enter-to {
  transform: scale(1)
}
.ripple-leave {
  opacity: 1;
}
.ripple-leave-to {
  opacity: 0;
}
</style>