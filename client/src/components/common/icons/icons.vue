<template>
  <svg ref="svg" viewBox="0 0 100 100" width="4rem" height="3rem" xmlns="http://www.w3.org/2000/svg">
    <g v-if="type === 'article'">
      <path d="M 20 15 V 85 H 80 V 30 L 65 15 Z" fill="transparent">
        <animate
          ref="animate1"
          :begin="actived ? '0' : 'indefinite'"
          attributeName="fill"
          dur=".5s"
          :values="actived ? 'transparent; #FF0088' : '#FF0088; transparent'"
          repeatCount="1"
          fill="freeze" />
        <animate
          ref="animate2"
          :begin="actived ? '0' : 'indefinite'"
          attributeName="stroke-width"
          dur=".5s"
          :values="actived ? '5; 0' : '0; 5'"
          repeatCount="1"
          fill="freeze" />
      </path>
      <line x1="33" y1="35" x2="50" y2="18">
        <animate v-if="actived" ref="animate3" :begin="actived ? '0' : 'indefinite'" attributeName="stroke" dur=".5s" values="#BBB; #FFF" repeatCount="1" fill="freeze" />
        <animateMotion
          ref="animate4"
          :begin="actived ? '0' : 'indefinite'"
          :path="actived ? 'M 0 0 C 20 -26 36 -1 8 10 S 26 48 36 19' : 'M 36 19 C 40 40 -25 30 8 10 S 20 -25 0 0'"
          dur=".5s"
          fill="freeze" />
      </line>
      <path stroke-dasharray="120" stroke-dashoffset="120" d="M 33 35 C 53 9 69 34 41 45 S 59 83 69 52">
        <animate
          ref="animate5"
          :begin="actived ? '0' : 'indefinite'"
          attributeName="stroke-dashoffset"
          dur=".5s"
          :values="actived ? '120; 0' : '0; 120'"
          repeatCount="1"
          fill="freeze" />
        <animate v-if="actived" ref="animate6" :begin="actived ? '0' : 'indefinite'" attributeName="stroke" dur=".5s" values="#BBB; #FFF" repeatCount="1" fill="freeze" />
      </path>
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'icons',
    /**
     *
     */
    data () {
      return {

      }
    },
    /**
     * @prop { Boolean } actived 是否为活动
     * @prop { String } type icons类型 可选由 [ 'article' ] 中的一类
     */
    props: {
      actived: {
        type: Boolean,
        default: false,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    watch: {
      actived: function (e) {
        // 监听到变化 执行需要的动画
        this.$nextTick(() => {
          for (let i = 1; i < 7; i++) {
            this.$refs[`animate${i}`] && this.$refs[`animate${i}`].beginElement()
          }
        })
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>
  svg * {
    stroke: #BBB;
    stroke-width: 5;
    stroke-linecap: round;
    fill: none;
  }
  svg line {
    stroke-dasharray: 30;
    stroke-dashoffset: 0;
  }
</style>

