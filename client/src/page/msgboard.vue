<template>
  <div>
    <Scroller
      ref="scroll"
      @pullingDown="findMsgs"
      pullDownRefresh
      :height="-44">
      <div class="msg-card-box">
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      <MsgCard />
      </div>
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
    async findMsgs () {
      try {
        let msgs = await this.$ajax.get('msgboard')
        this.finishPullDown()
        console.log(msgs)
      } catch (e) {

      }
    },
    finishPullDown () {
      setTimeout(() => {
        this.$refs.scroll.finishPullDown()
      }, 1000)
    }
  },
  activated () {

  }
}
</script>

<style lang="less">
.msg-card-box {
  background: white;
  margin-top: 1rem;
  .msgcard:nth-child(1) {
    margin-top: 0;
  }
}
</style>
