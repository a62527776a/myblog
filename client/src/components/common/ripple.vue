<template>
  <div @touchstart="touchstart"
       @touchend="touchend"
       ref="container">
    <slot />
    <transition-group name="ripple">
      <RippleCore
           @touchend="touchend"
           @end="handleRipple"
           class="ripple" 
           :key="idx" 
           :style="{
             top: item.y + 'px',
             left: item.x + 'px'
           }"
           v-for="(item, idx) in ripple"></RippleCore>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ripple: [],
      id: 0,
      touchended: false
    }
  },
  methods: {
    touchstart (e) {
      e.preventDefault()
      this.touchended = true
      let x = e.touches[0].clientX - this.$refs.container.getBoundingClientRect().x - 40 // 减去涟漪本身的偏移
      let y = e.touches[0].clientY - this.$refs.container.getBoundingClientRect().y - 40
      this.ripple.push({
        x,
        y,
        id: this.id++
      })
    },
    touchend () {
      this.touchended = false
      this.ripple = []
    },
    handleRipple () {
      if (this.touchended) return
      this.ripple.pop()
    }
  }
}
</script>

<style scoped>

</style>