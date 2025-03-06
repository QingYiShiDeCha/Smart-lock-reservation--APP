<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view class="min-h-screen" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <!-- 顶部标题 -->
    <view class="px-4 text-center">
      <text class="text-lg font-medium">我的</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss" scoped>
//
</style>
