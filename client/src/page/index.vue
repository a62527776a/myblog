<template>
  <div><router-link to="/article/1">index</router-link>
    <UIAudio sourceUrl="http://www.w3school.com.cn/i/horse.ogg" />
    <SoundRecord />
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>