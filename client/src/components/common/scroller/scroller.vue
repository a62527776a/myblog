<template>
<div class="scroll-view" :style="{ height: height > 0 ? height + 'px' : viewportHeight + height + 'px' }">
  <div>
    <slot />
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

const viewportHeight = document.documentElement.scrollHeight || document.body.scrollHeight

export default {
  name: 'scroller',
  /**
   * @param { Number } viewportHeight 视口高度
   * @param { Object } scroller BScroll对象
   * @param { Number } scrollY 滚动Y轴坐标
   */
  data () {
    return {
      scroller: null,
      viewportHeight: null,
      scrollY: 0
    }
  },
  /**
   * @prop { String } height 容器高度 默认为viewport高度 如果需要减去头部或者尾部高度 设置 height="-40"
   * @prop { Boolean } scrollBar 是否需要滚动条
   * @prop { Boolean } pullDownRefresh 是否开启下拉刷新
   * @prop { Boolean } pullUpLoad 是否开启上拉加载
   */
  props: {
    height: {
      type: Number,
      default: viewportHeight
    },
    scrollBar: {
      type: Boolean,
      default: true
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initScroller () {
      this.scroller = new BScroll('.scroll-view', {
        // 设置当运行 momentum 动画时，超过边缘后的回弹整个动画时间 默认的太慢
        swipeBounceTime: 200,
        // 滚动动画的动画时长。默认的太慢
        swipeTime: 1000,
        // 只有在屏幕上快速滑动的时间小于 momentumLimitTime，才能开启 momentum 动画。默认的时间太短
        momentumLimitTime: 200,
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        probeType: 3,
        scrollbar: this.scrollBar ? {
          fade: true, // 渐隐
          interactive: false // 是否可交互
        } : false,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad
      })
    },
    initViewportHeight () {
      this.viewportHeight = viewportHeight
    },
    // 重新计算better-scroll
    refresh () {
      // 注意要在dom元素生成后执行
      this.$nextTick(() => {
        this.scroller.refresh()
      })
    },
    // 作用：当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    finishPullDown () {
      this.scroller.finishPullDown()
    },
    // 作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    finishPullUp () {
      this.scroller.finishPullUp()
    },
    // 监听scrollY轴坐标
    initScrollerY () {
      this.scroller.on('scroll', (e) => {
        this.scrollY = e.y
      })
    }
  },
  mounted () {
    this.initScroller()
    if (this.pullDownRefresh || this.pullUpLoad) this.initScrollerY()
  },
  created () {
    this.initViewportHeight()
  }
}
</script>

<style lang="less">
  .bscroll-indicator {
    background: rgba(0, 0, 0, 0.2) !important;
  }
  .bscroll-vertical-scrollbar {
    width: 5px !important;
  }
</style>
