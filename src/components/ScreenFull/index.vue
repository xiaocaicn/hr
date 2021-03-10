<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    changeScreen() {
      // 判断全屏是否可用, 不可用则警告
      if (!ScreenFull.isEnabled) {
        this.$message.warning('当前全屏不可用')
        return
      }
      // 如果可用则切换(不是指定放大或缩小, 而是互相切换)
      ScreenFull.toggle()
    }
  }
}
</script>

<style>

</style>
