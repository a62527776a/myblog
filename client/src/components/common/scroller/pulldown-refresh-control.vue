<template>
  <div class="svg-refresh-control">
  <svg ref="svg" viewBox="0 0 100 100" width="100%" height="40px" xmlns="http://www.w3.org/2000/svg">
    <path :d="'M 30 40 L ' + calculateX(0) + ' 40' +
             'M 30 50 L ' + calculateX(1) + ' 50' +
             'M 30 60 L ' + calculateX(2) + ' 60'"
          stroke="#FF0088"
          fill="none"
          stroke-linecap="round"
          stroke-width="4">
      <animateTransform 
        v-if="scrollY > 40"
        attributeName="transform" 
        type="rotate" 
        dur=".3s" 
        begin="indefinite"
        ref="rotateAnimate"
        repeatCount="indefinite" 
        values="0 50 50; 7 50 50; -5 50 50; 0 50 50" />
      <animate 
        v-if="pulldownState === 'loading'"
        ref="loadingAnimate"
        attributeName="d"
        dur="1s"
        begin="indefinite"
        repeatCount="indefinite"
        values="M 30 40 L 70 40
                M 30 50 L 70 50
                M 30 60 L 70 60;
                M 48 40 L 52 40
                M 30 50 L 70 50
                M 30 60 L 70 60;
                M 48 50 L 52 50
                M 48 50 L 52 50
                M 30 60 L 70 60;
                M 48 60 L 52 60
                M 48 60 L 52 60
                M 48 60 L 52 60;
                M 48 70 L 52 70
                M 48 70 L 52 70
                M 48 70 L 52 70;
                M 48 60 L 52 60
                M 48 60 L 52 60
                M 48 60 L 52 60;
                M 48 50 L 52 50
                M 48 50 L 52 50
                M 30 60 L 70 60;
                M 48 40 L 52 40
                M 30 50 L 70 50
                M 30 60 L 70 60;
                M 30 40 L 70 40
                M 30 50 L 70 50
                M 30 60 L 70 60
                " />
    </path>
  </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      len: 3,
      max: 40,
      rotateDom: null
    }
  },
  props: {
    scrollY: {
      type: Number,
      required: true
    },
    pulldownState: {
      type: String,
      default: 'default',
      required: true
    }
  },
  watch: {
    'pulldownState': function (val) {
      this.$nextTick(() => {
        let animateDom = this.$refs.loadingAnimate
        if (val === 'loading') {
          animateDom.beginElement()
        }
      })
    },
    'scrollY': function (val) {
      this.$nextTick(() => {
        if (val > 40) this.rotateDom && this.rotateDom.beginElement()
      })
    }
  },
  methods: {
    /**
     * @method calculateBessel 根据滚动的距离计算X轴坐标
     * @param { Number } _idx 该动画有三条线 每条线从上往下下标为 0， 1， 2
     * @return { Number } x X轴坐标中的X
     */
    calculateX (_idx) {
      let x = 30
      // part 为参考的单位伸展距离
      let partHeight = this.max / this.len
      let scrollY = ~~this.scrollY
      // 每条线对应不同的scrollY滚动到的起始位置、和结束位置
      let startY = partHeight * _idx
      let endY = partHeight * (_idx + 1)
      // 未滚动到对应的启动位置 则不做操作
      if (scrollY < startY) {
        return x
      }
      // 滚动值大于对应线的结束位置 则X轴为最大值
      x = scrollY > endY ? '70' : ((scrollY - startY) * this.len) + 30
      return x
    }
  },
  mounted () {
    this.rotateDom = this.$refs.rotateAnimate
  }
}
</script>

<style lang="less" scoped>
.svg-refresh-control {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
}
</style>