<template>
  <div>
    <UIButton @click.native="$router.push('/user/login')" label="登录" />
    <UIButton @click.native="isShow = !isShow" :label="String(isShow)" />
    <Fab :menu="menu" :icon="icon" :hidden="isShow" />
    <input v-model="icon" />
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      isShow: false,
      icon: 'add',
      menu: [
        {
          icon: 'add',
          key: 'add'
        },
        {
          icon: 'https',
          key: 'https'
        },
        {
          icon: 'add',
          key: 'add'
        },
        {
          icon: 'add',
          key: 'add'
        },
        {
          icon: 'https',
          key: 'https'
        }
      ]
    }
  }
}
</script>
