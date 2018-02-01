<template>
<div>
<touch-ripple @click.native="clickMenu(2)" class="assistant" :class="'assistant-' + $store.state.assistant.state + '-menu2'">
    <svg height="3rem" width="3rem" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="assictant">
      <path d="M 30 50 L 70 50 M 50 30 L 50 70" stroke="red" stroke-width="3">
        <animate attributeName="d" />
      </path>
    </svg />
  </touch-ripple>
<touch-ripple @click.native="clickMenu(1)" class="assistant" :class="'assistant-' + $store.state.assistant.state">
  <svg height="3rem" width="3rem" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="assictant">
    <path d="M 30 50 L 70 50" stroke="red" stroke-width="3">
      <animateTransform ref="svg-menu2-animate-0" fill="freeze" :begin="$store.state.assistant.state === 'waitInput' ? '0s' : 'indefinite'" attributeName="transform" type="rotate" values="0 50 50; 135 50 50" dur=".5s" repeatCount="1" />
      <animateTransform ref="svg-menu2-animate-0-restart" fill="freeze" attributeName="transform" type="rotate" values="135 50 50; 0 50 50" dur=".5s" repeatCount="1" />
    </path>
    <path d="M 50 30 L 50 70" stroke="red" stroke-width="3">
      <animateTransform ref="svg-menu2-animate-1" fill="freeze" :begin="$store.state.assistant.state === 'waitInput' ? '0s' : 'indefinite'" attributeName="transform" type="rotate" values="0 50 50; 45 50 50" dur=".5s" repeatCount="1" />
      <animateTransform ref="svg-menu2-animate-1-restart" fill="freeze" attributeName="transform" type="rotate" values="45 50 50; 0 50 50" dur=".5s" repeatCount="1" />
    </path>
    <path d="M 45 35 H 25 V 75 H 75 V 45" stroke="red" fill="none" stroke-width="3" stroke-dasharray="500" stroke-dashoffset="500">
      <animate ref="svg-menu2-animate-2" fill="freeze" :begin="$store.state.assistant.state === 'waitInput' ? '0s' : 'indefinite'" attributeName="stroke-dashoffset"
               dur="1s" values="500; 0" />
      <animate ref="svg-menu2-animate-2-restart" fill="freeze" attributeName="stroke-dashoffset"
               dur="1s" values="0; -500" />
    </path>
  </svg />
</touch-ripple>
</div>
</template>

<script>
export default {
  name: 'assistant',
  props: {

  },
  methods: {
    /**
     * @method clickMenu 助手菜单点击事件
     * @param { String } menuKey 点击的单位 1 菜单一 2 菜单二
     */
    clickMenu (menuKey) {
      menuKey === 1 ? this.$router.push('/msgboard/edit') : this.$router.go('-1')
    }
  },
  watch: {
    '$store.state.assistant.state': function (e, oldValue) {
      if (e === 'waitInput') {
        this.$nextTick(() => {
          for (let i = 0; i < 3; i++) {
            this.$refs['svg-menu2-animate-' + i].beginElement()
          }
        })
      }
      if (oldValue === 'waitInput' && e === 'add') {
        this.$nextTick(() => {
          for (let i = 0; i < 3; i++) {
            this.$refs['svg-menu2-animate-' + i + '-restart'].beginElement()
            console.log(i)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.assistant {
  z-index: 999;
  position: fixed;
  height: 3rem;
  width: 3rem;
  margin-left: -1.5rem;
  background: white;
  border-radius: 50%;
  box-shadow: -1px 1px 1px #666;
  transition: 
  transform .5s cubic-bezier(.12,1.11,.69,1),
  left .5s, 
  rotate .5s,
  opacity .3s cubic-bezier(0,.42,.37,.99);
  bottom: -3rem;
}

.assistant-hidden, .assistant-hidden-menu2 {
  opacity: 0;
  transform: translate3D(0rem, 0, 0);
  left: 50%;
}

.assistant-add, .assistant-add-menu2 {
  opacity: 1;
  transform: translate3D(0rem, -12rem, 0);
  left: 70%;
}

.assistant-waitInput, .assistant-waitInput-menu2 {
  left: 70%;
  opacity: 1;
}

.assistant-waitInput-menu2 {
  transform: translate3D(0rem, -16rem, 0) rotate(315deg);
}
.assistant-waitInput {
  transform: translate3D(0rem, -12rem, 0);
}
</style>