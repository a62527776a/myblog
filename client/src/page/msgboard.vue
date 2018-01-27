<template>
  <div>
    <Scroller
      ref="scroll"
      @pullingDown="findData"
      pullDownRefresh
      :height="-44">
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>55</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
      <div>msgboard</div>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'msg-board',
  data () {
    return {

    }
  },
  methods: {
    findData () {
      console.log(111)
      setTimeout(() => {
        this.$refs.scroll.finishPullDown()
      }, 3000)
    }
  }
}
</script>