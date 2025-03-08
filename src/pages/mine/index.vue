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
    <wd-navbar
      fixed
      title="客服"
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      :bordered="false"
    />

    <!-- 用户信息区域 -->
    <view class="flex items-center px-5 mt-12">
      <wd-img class="shadow-md" :width="80" :height="80" round :src="userAvatar" />
      <view class="ml-4">
        <view class="text-lg font-medium fw-600">清茶</view>
        <view class="text-gray-400">ID: 107229</view>
      </view>
    </view>

    <!-- 账户余额卡片 -->
    <view class="flex justify-center mt-6 z-11">
      <view class="balance-card w-[80%] p-3 rounded-t-[10px] bg-[#ffddb0]">
        <view class="flex justify-between items-center fw-700">
          <text class="text-28rpx ml-2">账户余额: {{ balance }} 元</text>
          <text class="fw-500 text-26rpx text-black">我的资产 ></text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="mx-4 bg-white rounded-md">
      <view
        v-for="(item, index) in menuList"
        :key="index"
        class="menu-item z-999 flex justify-between items-center p-4"
        @click="handleMenuItemClick(item)"
      >
        <view class="flex items-center">
          <text class="text-blue-500 mr-2">{{ item.icon }}</text>
          <text>{{ item.title }}</text>
        </view>
        <text class="text-gray-400">></text>
      </view>
    </view>

    <!-- 退出按钮 -->
    <view class="mx-4 mt-6 flex justify-center">
      <button class="w-[90%] bg-blue-500 text-white py-1 rounded-full">退出 / 切换账号</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const balance = ref(68)
const { safeAreaInsets } = uni.getSystemInfoSync()

const userAvatar = '../../static/user.svg'

interface MenuItem {
  icon: string
  title: string
}

const menuList: Array<MenuItem> = [
  { icon: '👤', title: '我的账户' },
  { icon: '🚢', title: '我的船舶' },
  { icon: '🔒', title: '修改密码' },
  { icon: '❤️', title: '积分公示' },
  { icon: '📄', title: '电子发票' },
  { icon: '📖', title: '用户指南' },
  { icon: '💬', title: '使用反馈' },
  { icon: '🏢', title: '关于我们' },
]

function handleMenuItemClick(item: MenuItem) {
  console.log('点击了', item.title)
  if (item.title === '我的账户') {
    uni.navigateTo({ url: '/pages/my-account/index' })
  }
}
</script>

<style>
page {
  background: linear-gradient(180deg, #c4dcfe 0%, #f5f5f5 45%, #f5f5f5 100%);
}
/* #ifdef MP-WEIXIN */
page {
  height: 100%;
  overflow: scroll;
  background: linear-gradient(180deg, #c4dcfe 0%, #f5f5f5 45%, #f5f5f5 100%);
}
/* #endif */
</style>

<style lang="scss">
.menu-item {
  position: relative;
}

.menu-item::after {
  position: absolute;
  right: 16px;
  bottom: 0;
  left: 16px;
  height: 1px;
  content: '';
  background-color: #f3f4f6; /* 对应 border-gray-100 的颜色 */
}
/* 最后一个元素不显示边框 */
.menu-item:last-child::after {
  display: none;
}

.balance-card {
  position: relative;
}

.balance-card::before {
  position: absolute;
  top: 59%;
  left: -11rpx;
  width: 0;
  height: 0;
  content: '';
  border-top: 36px solid transparent;
  border-right: 7px solid #e8b881; /* 蓝色三角形，改为指向右边 */
  border-bottom: 0px solid transparent;
  transform: translateY(-50%);
}
</style>
