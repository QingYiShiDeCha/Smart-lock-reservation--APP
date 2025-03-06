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
    @touchmove.stop.prevent="() => {}"
  >
    <!-- 新增固定背景层 -->
    <view class="fixed-bg"></view>
    <!-- 顶部标题 -->
    <wd-navbar
      fixed
      title="客服"
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      :bordered="false"
    />
    <view class="fixed z-99 left-4 top-90rpx flex gap-30rpx text-36rpx">
      <view @click="handleSwitchTag(1)">电话联系</view>
      <view @click="handleSwitchTag(2)">微信联系</view>
    </view>
    <template v-if="activeTag === 1">
      <view
        :style="{
          marginTop: safeHeight + 'px',
        }"
        class="flex flex-col box-border overflow-hidden"
      >
        <view class="flex flex-col box-border" v-for="(item, index) in phoneInfo" :key="index">
          <view class="bg-white rounded-lg mt-30rpx flex flex-col p-4 gap-6rpx">
            <view class="flex justify-between">
              <view>{{ item.name }}</view>
              <view class="text-24rpx px-3 rounded-lg bg-[#edfef6] text-center leading-normal">
                值班中
              </view>
            </view>
            <view class="b-1 b-solid border-#f5f5f5"></view>
            <view class="flex justify-between">
              <view>{{ item.phone }}</view>
              <view class="rounded-full bg-green p-8rpx">
                <view class="i-carbon:phone-filled bg-white text-20rpx px-8rpx"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view
        class="bg-white rounded-lg p-4 flex justify-between"
        :style="{
          marginTop: safeHeight + 20 + 'px',
        }"
      >
        <view>西江船闸调度中心</view>
        <view class="flex gap-10rpx items-center">
          <view class="rounded-full bg-green p-3rpx flex items-center">
            <view class="i-carbon:logo-wechat bg-white"></view>
          </view>
          <view class="text-green">联系客服</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
const activeTag = ref(1)
const safeHeight = ref(safeAreaInsets?.top + 75)

// #ifdef MP-WEIXIN
safeHeight.value = safeHeight.value + 30
// #endif

function handleSwitchTag(val: number) {
  activeTag.value = val
}
const phoneInfo = ref([
  {
    name: '加售后微信留言',
    phone: '19988888888',
    isWork: true,
  },
  {
    name: '加售后微信留言',
    phone: '19988888888',
    isWork: true,
  },
  {
    name: '西江船闸调度中心',
    phone: '9336',
    isWork: true,
  },
  {
    name: '西江船闸调度中心',
    phone: '9336',
    isWork: true,
  },
  {
    name: '西江船闸调度中心',
    phone: '9336',
    isWork: true,
  },
])
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
