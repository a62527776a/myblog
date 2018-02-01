<template>
  <div class="ui-input">
    <input ref="input"
           :value="value"
           @input="updateValue($event.target.value)" />
    <hr class="ui-input-line-focus transition-ease" />
    <transition name="fade">
      <a v-show="value === ''" class="ui-input-placeholder">{{placeholder}}</a>
    </transition>
    <transition name="fade">
      <div v-show="valid(value)" class="ui-input-err-tip">错误</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ui-input',
  props: {
    // 内置验证
    valid: {
      type: Function,
      default: () => {
        return true
      }
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue: function (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.ui-input {
  width: 100%;
  position: relative;
  input {
    width: 96%;
    border: none;
    padding: .4rem 0;
    margin: 0 2%;
    border-bottom: 1px solid #DDD;
  }
  input::-webkit-input-placeholder {
    transition: all .5s;
  }
  .ui-input-line-focus {
    margin: 0 2%;
    display: block;
    background-color: @PrimaryColor;
    transform: scaleX(0) translateY(-2px);
    height: 1px;
  }
  input:focus + .ui-input-line-focus {
    transform: scaleX(1) translateY(-2px);
    height: 2px;
  }
  .ui-input-err-tip {
    font-size: 1.2rem;
    padding: 0 2%;
    color: @errColor;
    min-height: 1.2rem;
  }
  .ui-input-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.2rem;
    padding: .4rem 0;
    margin: 0 2%;
    color: @SecondaryColor;
  }
}
</style>