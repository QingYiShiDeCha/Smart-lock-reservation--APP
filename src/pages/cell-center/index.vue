<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '客服',
  },
}
</route>

<template>
  <view
    class="min-h-screen mt-90rpx mx-4"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      marginBottom: safeAreaInsets?.bottom + 10 + 'px',
    }"
  >
    <!-- 新增固定背景层 -->
    <view class="fixed-bg"></view>
    <!-- 顶部标题 -->
    <view class="px-4 text-center">
      <text class="text-lg font-medium">客服</text>
    </view>
    <view class="tab-view flex gap-30rpx">
      <view @click="handleSwitchTag(1)">电话联系</view>
      <view @click="handleSwitchTag(2)">微信联系</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleSwitchTag(val: number) {
  uni.showToast({
    title: `切换到第${val}个标签`,
    icon: 'none',
  })
}
</script>

<style>
/* 新增固定背景层 */
.fixed-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #c4dcfe 0%, #f5f5f5 45%);
}
</style>

<style lang="scss" scoped>
.tab-view {
  :deep(.wd-tabs--line, .wd-tabs) {
    background-color: transparent;
  }
}
</style>
