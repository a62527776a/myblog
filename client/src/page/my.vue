<template>
  <div>
    <UIButton @click.native="$router.push('/user/login')" label="登录" />
  </div>
</template>

<script>
export default {
  name: 'my'
}
</script>
