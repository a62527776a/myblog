<template>
  <div>
  <UIInput v-model="username" placeholder="用户名" :valid="valid" />
  {{username}}
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    valid: function (val) {
      return val.length > 5
    }
  }
}
</script>

<style lang="less" scoped>

</style>