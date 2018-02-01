<template>
<div>
<MsgCard :edit="true" class="msgcard-area" :content="content">
  <textarea class="content msg-textarea" />
</MsgCard>
</div>
</template>

<script>
export default {
  name: 'msg-input',
  data () {
    return {
      content: 'qweqwe'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scope>
input {
  position: absolute;
}
.msg-textarea {
  width: 100%;
  border: none;
  resize: none;
  background: transparent;
  color: @fontColor;
  font-size: 1rem;
}
</style>