<template>
<div>
  sound record
  <audio controls />
  <a @click="startRecord">start</a>
  <a @click="stopRecord">stop</a>
</div>
</template>

<script>
export default {
  name: 'sound-record',
  data () {
    return {
      mediaDevice: null,
      audioCtx: null,
      source: null,
      gain: null,
      soundStream: null
    }
  },
  props: {

  },
  methods: {
    startRecord: function () {
      this.mediaDevice = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then((soundStream) => {
        this.recordSound(soundStream)
      })
    },
    stopRecord: function () {
      this.soundStream.getTracks()[0].stop()
      // this.mediaDevice = null
      // this.source = null
      this.source.connect(this.gain)
      this.gain.connect(this.audioCtx.destination)
    },
    recordSound: function (soundStream) {
      this.soundStream = soundStream
      this.source = this.audioCtx.createMediaStreamSource(soundStream)
    },
    initAudio: function () {
      this.audioCtx = new AudioContext()
      this.gain = this.audioCtx.createGain()
      // this.source = this.audioCtx.createMediaStreamSource(soundStream)
      // this.source.connect(gain)
    }
  },
  mounted () {
    this.initAudio()
  }
}
</script>

<style lang="less" scope>

</style>