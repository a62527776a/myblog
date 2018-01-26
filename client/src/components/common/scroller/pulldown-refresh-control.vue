<template>
  <svg class="svg-refresh-control" viewBox="0 0 100 100" width="100%" height="40px" xmlns="http://www.w3.org/2000/svg">
    <template v-for="ps in particles">
     <circle v-for="(p, idx) in ps.len" cx="50" cy="40" :r="ps.r" :fill="ps.fill">
      <animateMotion
        :path="ps.animateMotion.path"
        :dur="ps.animateMotion.dur"
        calcMode="spline"
        :keySplines="keySplines"
        keyTimes="0; 1"
        :begin=".3 * idx - 1 + 's'"
        repeatCount="indefinite" />
      <animate
        attributeName="r"
        :values="ps.animate.r"
        repeatCount="indefinite"
        :begin=".3 * idx - 1 + 's'"
        dur=".9s" />
      </circle>
    </template>
  </svg>
</template>

<script>
export default {
  data () {
    return {
      keySplines: '0,.32,.65,.66',
      particles: [{
        r: 2,
        fill: '#FF0088',
        len: 3,
        animateMotion: {
          path: 'M 0 0 C 11 -10 26 6 0 20',
          dur: '.9s'
        },
        animate: {
          r: '2; 1'
        }
      }, {
        r: 2,
        fill: '#FF0088',
        len: 3,
        animateMotion: {
          path: 'M 0 20 C -26 6 -11 -10 0 0',
          dur: '.9s'
        },
        animate: {
          r: '1; 0'
        }
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.svg-refresh-control {
  position: absolute;
}
</style>