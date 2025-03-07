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

    <!-- 使用自定义标签页组件 -->
    <custom-tab v-model="activeTab" sticky>
      <custom-tab-item title="电话联系">
        <view class="flex flex-col box-border overflow-hidden">
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
      </custom-tab-item>

      <custom-tab-item title="微信联系">
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
      </custom-tab-item>
    </custom-tab>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomTab from '@/components/CustomTab.vue'
import CustomTabItem from '@/components/CustomTabItem.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
const activeTab = ref(0)
const safeHeight = ref(safeAreaInsets?.top)

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
