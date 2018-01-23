<template>
  <div class="hello">
    <canvas ref="ctx"></canvas>
    {{p1.ball}}
    {{p1.paddle}}
    {{p1.controlPaddle}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      ctx: null,
      p1: {
        // 控制是否允许滑动控制板
        allowMove: false,
        ball: {
          x: 0,
          y: 0,
          dx: 2,
          dy: -2
        },
        paddle: {
          height: 10,
          width: 75,
          paddleX: 0
        },
        controlPaddle: {
          height: 60,
          width: 30,
          paddleY: 0
        },
        color: '#0095DD'
      },
      p2: {
        // 控制是否允许滑动控制板
        allowMove: false,
        ball: {
          x: 0,
          y: 0,
          dx: -2,
          dy: 2
        },
        paddle: {
          height: 10,
          width: 75,
          paddleX: 0
        },
        controlPaddle: {
          height: 60,
          width: 30,
          paddleY: 0
        },
        color: 'red'
      },
      ballRadius: 10,
      // 控制板边界
      controlPaddleBoundary: {
        max: 0,
        min: 0,
        // max min 差值
        Dvalue: 0
      },
      brick: {
        row: 3,
        col: 4,
        width: 50,
        height: 20,
        padding: 10,
        offsetTop: 30,
        offsetLeft: 0
      },
      bricks: []
    }
  },
  mounted () {
    this.main()
  },
  methods: {
    main () {
      this.initCanvas()
      // 初始化球
      this.initBall()
      // 初始化弹球板
      this.initPaddle()
      // 初始化控制板
      this.initControlPaddle()
      // 初始化砖头
      this.initBrick()
      requestAnimationFrame(() => {
        this.draw()
      })
    },
    initCanvas () {
      let canvas = this.$refs.ctx
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d')
      }
    },
    draw () {
      this.ctx.clearRect(0, 0, this.$refs.ctx.width, this.$refs.ctx.height)
      const person = {
        p1: this.p1,
        p2: this.p2
      }
      this.drawBrick()
      for (let i in person) {
        this.ctx.beginPath()
        this.drawBall(person[i])
        // 绘制弹球板
        this.drawPaddle(person[i], i)
        // 绘制控制板
        this.drawControlPaddle(person[i], i)
      }
      this.ctx.closePath()
      this.brickCollision()
      requestAnimationFrame(() => {
        this.draw()
      })
    },
    // 初始化弹球板的paddleX位置信息
    initPaddle () {
      this.p1.paddle.paddleX = (this.$refs.ctx.width - this.p1.paddle.width) / 2
      this.p2.paddle.paddleX = (this.$refs.ctx.width - this.p2.paddle.width) / 2
    },
    // 初始化球的位置
    initBall () {
      this.p1.ball.x = this.p2.ball.x = this.$refs.ctx.width / 2
      this.p1.ball.y = this.$refs.ctx.height - 30
      this.p2.ball.y = 30
    },
    // 初始化控制板
    initControlPaddle () {
      // 初始化位置信息
      this.p1.controlPaddle.paddleY = this.p2.controlPaddle.paddleY = Math.floor(this.$refs.ctx.height / 2) - this.p1.controlPaddle.height / 2
      // 初始化控制板边界
      this.controlPaddleBoundary.max = this.p1.controlPaddle.paddleY + this.$refs.ctx.height / 6
      this.controlPaddleBoundary.min = this.p1.controlPaddle.paddleY - this.$refs.ctx.height / 6
      // 边界差值 用于实时计算滑动板X轴距离
      this.controlPaddleBoundary.Dvalue = this.controlPaddleBoundary.max - this.controlPaddleBoundary.min
      // 初始化滑动操作
      this.initControl()
    },
    // 初始化砖头
    initBrick () {
      // 左右居中处理 行数 * 单个宽度 + 每个padding
      this.brick.offsetLeft = (this.$refs.ctx.width - (this.brick.col * this.brick.width + this.brick.padding * 4)) / 2
      // 上下居中处理
      this.brick.offsetTop = (this.$refs.ctx.height - (this.brick.row * this.brick.height + this.brick.padding * 2)) / 2
      for (let i = 0; i < this.brick.col; i++) {
        this.bricks[i] = []
        for (let j = 0; j < this.brick.row; j++) {
          this.bricks[i][j] = {
            x: 0,
            y: 0,
            state: 1
          }
        }
      }
    },
    // 滑动仅限Y轴 canvas高度的1/3内滑动 联动板的左右滑动
    initControl () {
      /**
      * 触摸事件与手势事件之间的关系
      * 1、当一个手指放在屏幕上时，会触发touchstart事件，如果另一个手指又放在了屏幕上，则会触发gesturestart事件，随后触发基于该手指的touchstart事件。
      * 2、如果一个或两个手指在屏幕上滑动，将会触发gesturechange事件，但只要有一个手指移开，则会触发gestureend事件，紧接着又会触发toucheend事件。
      * 作者：Miss____Du
      * 链接：https://www.jianshu.com/p/832f36531df9
      * 來源：简书
      * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      */
      this.$refs.ctx.addEventListener('touchstart', this.toushHandleStart)
      this.$refs.ctx.addEventListener('touchmove', this.toushHandleMove)
      // window.addEventListener('touchend', toushHandleEnd)
      // // 第二个手指触摸屏幕时触发
      // window.addEventListener('gesturestart', gestureHandleStart)
      // // 任意一根手指触摸屏幕时触发
      // this.$refs.ctx.addEventListener('gesturechange', this.gestureHandleChange)
      // // 任意一根手指离开屏幕时触发
      // window.addEventListener('gestureend', gestureHandleEnd)
    },
    // 当触摸到控制板时 将对应的allowMove开启 允许滑动
    toushHandleStart (e) {
      // 手指大于2个则不做处理
      if (e.touches.length > 2) return
      // 边界检测
      let isBoundary = this.paddleBoundaryCheck(e)
      if (!isBoundary.person) return
      this[isBoundary.person].allowMove = true
    },
    toushHandleMove (e) {
      let isBoundary = this.paddleBoundaryCheck(e)
      if (!isBoundary.person) return
      // 如果触摸点不是从按钮上开始 则不让滑动
      // 即只能从按钮开始滑动
      if (!this[isBoundary.person].allowMove) return false
      // 计算偏移量
      let offset = isBoundary.offset - this[isBoundary.person].controlPaddle.paddleY
      // 边界处理 只能操作Y轴的30% 上15% 下15%
      if (this[isBoundary.person].controlPaddle.paddleY + (offset - this[isBoundary.person].controlPaddle.height / 2) > this.controlPaddleBoundary.max || this[isBoundary.person].controlPaddle.paddleY + (offset - this[isBoundary.person].controlPaddle.height / 2) < this.controlPaddleBoundary.min) {
        return
      }
      // paddleY值是从顶部开始算所以加上半个控制板的高度 这里从中心算所以减去半个控制板的高度
      this[isBoundary.person].controlPaddle.paddleY += (offset - this[isBoundary.person].controlPaddle.height / 2)
      // 联动弹球板
      // 当前值与最小值的差值与最大值和最小值的差值比例
      let _dvalue = ((this[isBoundary.person].controlPaddle.paddleY - this.controlPaddleBoundary.min) / this.controlPaddleBoundary.Dvalue).toFixed(2)
      // 计算滑动距离的实时比例
      this[isBoundary.person].paddle.paddleX = (this.$refs.ctx.width - this[isBoundary.person].paddle.width) * _dvalue
    },
    drawBrick () {
      for (let i = 0; i < this.brick.col; i++) {
        for (let j = 0; j < this.brick.row; j++) {
          // 如果未被击中 则绘制该砖块
          if (this.bricks[i][j].state === 1) {
            let brickX = (i * (this.brick.width + this.brick.padding)) + this.brick.offsetLeft
            let brickY = (j * (this.brick.height + this.brick.padding)) + this.brick.offsetTop
            this.bricks[i][j].x = brickX
            this.bricks[i][j].y = brickY
            this.ctx.beginPath()
            this.ctx.rect(brickX, brickY, this.brick.width, this.brick.height)
            this.ctx.fillStyle = '#0095DD'
            this.ctx.fill()
            this.ctx.closePath()
          }
        }
      }
    },
    drawBall (person) {
      this.ctx.fillStyle = person.color
      this.ctx.arc(person.ball.x, person.ball.y, this.ballRadius, 0, Math.PI * 2)
      // 控制球的移动
      this.moveBall(person.ball)
      this.ctx.fill()
    },
    // 绘制弹球板
    drawPaddle (person, key) {
      // 根据是否为P1的板还是P2的板来处理木板的位置 p1 为上方 p2 为下方
      this.ctx.rect(person.paddle.paddleX, (key === 'p1') ? 0 : this.$refs.ctx.height - person.paddle.height, person.paddle.width, person.paddle.height)
      this.ctx.fillStyle = person.color
      this.ctx.fill()
    },
    // 控制球的移动
    moveBall (ball) {
      // 碰撞检测 上面以及下面的墙体
      // if (ball.y + ball.dy < this.ballRadius || ball.y + ball.dy > this.$refs.ctx.height - this.ballRadius) {
      //   // 改变方向
      //   // ball.dy = -ball.dy
      //   // console.log('GAME OVER')
      //   if ()
      // }
      // 碰撞检测 是否弹到板子上了
      // p1的板子和p2的板子要分别处理
      // p1检测
      if (ball.y + ball.dy < this.ballRadius + this.p1.paddle.height) {
        if (ball.x > this.p1.paddle.paddleX && ball.x < this.p1.paddle.paddleX + this.p1.paddle.width) {
          ball.dy = -ball.dy
        } else {
          console.log('GAME OVER')
        }
      }
      // p2检测
      if (ball.y + ball.dy > this.$refs.ctx.height - this.ballRadius - this.p2.paddle.height) {
        if (ball.x > this.p2.paddle.paddleX && ball.x < this.p2.paddle.paddleX + this.p2.paddle.width) {
          ball.dy = -ball.dy
        } else {
          console.log('GAME OVER')
        }
      }
      // 左边以及右边的墙体
      if (ball.x + ball.dx < this.ballRadius || ball.x + ball.dx > this.$refs.ctx.width - this.ballRadius) {
        ball.dx = -ball.dx
      }
      ball.x += ball.dx
      ball.y += ball.dy
    },
    // 绘制控制板
    drawControlPaddle (person, key) {
      this.ctx.rect((key === 'p1') ? this.$refs.ctx.width - person.controlPaddle.width : 0,
        person.controlPaddle.paddleY, person.controlPaddle.width, person.controlPaddle.height)
      this.ctx.fillStyle = person.color
      this.ctx.fill()
    },
    /**
     * @method paddleBoundaryCheck 控制板边界检测
     * @param { Object } e touches callback event
     * @return { Object } 返回触摸在哪个角色的触控板上
     */
    paddleBoundaryCheck (e) {
      let p1 = {
        // 最大最小X轴边界
        maxControlPaddleBoundaryX: this.$refs.ctx.width,
        minControlPaddleBoundaryX: this.$refs.ctx.width - this.p1.controlPaddle.width,
        // 最大最小Y轴边界
        // 最大边界：当前控制板Y轴高度(随移动改变)加控制板高度
        maxControlPaddleBoundaryY: this.p1.controlPaddle.paddleY + this.p1.controlPaddle.height,
        minControlPaddleBoundaryY: this.p1.controlPaddle.paddleY
      }
      let p2 = {
        maxControlPaddleBoundaryX: this.p2.controlPaddle.width,
        minControlPaddleBoundaryX: 0,
        // 最大最小Y轴边界
        // 最大边界：当前控制板Y轴高度(随移动改变)加控制板高度
        maxControlPaddleBoundaryY: this.p2.controlPaddle.paddleY + this.p2.controlPaddle.height,
        minControlPaddleBoundaryY: this.p2.controlPaddle.paddleY
      }
      let person = [p1, p2]
      // 范围限定在每个控制板的可触区域内
      for (let i = 0; i < person.length; i++) {
        if (e.touches[0].clientX > person[i].minControlPaddleBoundaryX && e.touches[0].clientX < person[i].maxControlPaddleBoundaryX) {
          if (e.touches[0].clientY > person[i].minControlPaddleBoundaryY && e.touches[0].clientY < person[i].maxControlPaddleBoundaryY) {
            return {
              person: i === 0 ? 'p1' : 'p2',
              offset: e.touches[0].clientY
            }
          }
        }
      }
      return {
        person: null
      }
    },
    brickCollision () {
      let person = ['p1', 'p2']
      for (let i = 0; i < this.brick.col; i++) {
        for (let j = 0; j < this.brick.row; j++) {
          if (this.bricks[i][j].state === 1) {
            for (let k = 0; k < person.length; k++) {
              if (this[person[k]].ball.x > this.bricks[i][j].x &&
                this[person[k]].ball.x < this.bricks[i][j].x + this.brick.width &&
                this[person[k]].ball.y > this.bricks[i][j].y &&
                this[person[k]].ball.y < this.bricks[i][j].y + this.brick.height) {
                this[person[k]].ball.dy = -this[person[k]].ball.dy
                this.bricks[i][j].state = 0
              }
            }
          }
        }
      }
    }
  }
  // 初始化控制器
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas { 
  height: 100%;
  position: absolute;
  width: 100%;
}
</style>
