<template>
<div>
  audio api
</div>
</template>

<script>
export default {
  name: 'vue-audio',
  data () {
    return {
      xhr: new XMLHttpRequest()
    }
  },
  props: {
    sourceUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    initAudio () {
      this.decodeMusic()
    },
    decodeMusic () {
      this.loadMusic()
    },
    loadMusic: async function () {
      this.$ajax(this.sourceUrl)
    }
  },
  mounted () {
    this.initAudio()
  }
}
</script>

<style lang="less" scope>

</style>