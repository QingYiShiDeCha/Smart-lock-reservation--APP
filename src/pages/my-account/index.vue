<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '我的账户',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view
    class="min-h-screen mt-90rpx box-border"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      marginBottom: safeAreaInsets?.bottom + 10 + 'px',
    }"
    @touchmove.stop.prevent="() => {}"
  >
    <!-- 新增固定背景层 -->
    <view class="fixed-bg"></view>
    <!-- 修改导航栏布局 -->
    <wd-navbar
      fixed
      title="我的账户"
      left-arrow
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      @click-left="handleBack"
      :bordered="false"
    />
    <!-- 占位符 -->
    <view class="pt-120rpx"></view>

    <view class="rounded-md mx-2 bg-white py-18rpx text-30rpx">
      <view class="px-4 flex items-center gap-12rpx cell pb-3">
        <view class="w-24% text-gray-400">登录ID</view>
        <view>{{ accountInfo.id }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">手机号</view>
        <view>{{ accountInfo.phone }}</view>
        <view class="ml-auto">
          <wd-button size="small" type="error" plain>解除绑定</wd-button>
        </view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">注册时间</view>
        <view>{{ accountInfo.registerTime }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">会员名称</view>
        <view>{{ accountInfo.memberName }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">邮政编码</view>
        <view>{{ accountInfo.postalCode }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">通讯地址</view>
        <view>{{ accountInfo.address }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx cell py-3">
        <view class="w-24% text-gray-400">传真地址</view>
        <view>{{ accountInfo.fax }}</view>
      </view>
      <view class="px-4 flex items-center gap-10rpx py-3">
        <view class="w-24% text-gray-400">网址</view>
        <view>{{ accountInfo.website }}</view>
      </view>
    </view>
    <!-- 修改信息按钮 -->
    <view class="mt-6 mx-4">
      <wd-button block type="primary" @click="handleEdit">修改信息</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store'
import { storeToRefs } from 'pinia'
const { safeAreaInsets } = uni.getSystemInfoSync()

const { accountInfo } = storeToRefs(useAccountStore())

function handleBack() {
  // 返回上一页
  uni.navigateBack()
}

function handleEdit() {
  // 跳转到编辑页面
  uni.navigateTo({ url: '/pages/my-account/edit' })
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
.cell {
  position: relative;

  &::after {
    position: absolute;
    right: 36rpx;
    bottom: 0;
    left: 36rpx;
    height: 1px;
    content: '';
    background-color: #f1f1f1;
  }
}
</style>
