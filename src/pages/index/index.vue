<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
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
      <text class="text-lg font-medium">首页</text>
    </view>

    <!-- 轮播通知 -->
    <swiper
      class="h-30 mx-4 my-4 rounded-lg overflow-hidden relative bg-red"
      circular
      autoplay
      interval="3000"
    >
      <swiper-item v-for="(item, index) in notices" :key="index">
        <view class="w-full h-full">
          <image class="w-full h-full" :src="item.image" mode="aspectFit" />
        </view>
      </swiper-item>
      <view class="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        <view
          v-for="(item, index) in notices"
          :key="index"
          class="w-1.5 h-1.5 rounded-full bg-white/50"
          :class="{ 'bg-white': currentSwiperIndex === index }"
        ></view>
      </view>
    </swiper>

    <!-- 通知栏 -->
    <view class="px-4">
      <wd-notice-bar
        type="success"
        text="用户注册"
        :scrollable="false"
        background-color="#c4dcfe64"
      >
        <template #prefix>
          <view class="i-carbon:notification text-[#608ee9]" />
          <view class="italic text-[#608ee9] pl-4rpx font-bold">通知</view>
        </template>
        <template #default>
          <view class="pl-16rpx">用户注册</view>
        </template>
      </wd-notice-bar>
    </view>

    <!-- 常用服务网格 -->

    <view class="mx-4 bg-white rounded-lg p-4 grid grid-cols-4 gap-4">
      <view>
        <view class="mx-4 mt-4 text-base font-medium text-[#333]">常用服务</view>
        <view
          class="flex flex-col items-center gap-2"
          v-for="(service, index) in services"
          :key="index"
        >
          <view
            class="w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white"
            :style="{ backgroundColor: service.color }"
          >
            <text class="iconfont">{{ service.icon }}</text>
          </view>
          <text class="text-xs text-[#333]">{{ service.name }}</text>
        </view>
      </view>
    </view>

    <!-- 船闸待闸信息 -->
    <view class="mx-4 mt-4 text-base font-medium text-[#333]">船闸待闸信息</view>
    <view class="mx-4 bg-white rounded-lg overflow-hidden">
      <view
        class="p-4 border-b border-[#f5f5f5] last:border-none"
        v-for="(lock, index) in lockInfo"
        :key="index"
      >
        <view class="flex items-center gap-1 mb-2">
          <text v-if="lock.isHot" class="text-base">🔥</text>
          <text class="text-base font-medium">{{ lock.name }}</text>
        </view>
        <view class="space-y-1">
          <view
            class="flex items-center gap-1 text-sm text-[#666]"
            v-for="(direction, dIndex) in lock.directions"
            :key="dIndex"
          >
            <text class="text-xl leading-none">•</text>
            <text class="w-8">{{ direction.type }}</text>
            <text class="text-[#333]">
              待闸:{{ direction.waiting }} 预报到:{{ direction.reported }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const currentSwiperIndex = ref(0)

// 通知数据
const notices = ref([
  { image: '/static/images/notice1.png' },
  { image: '/static/images/notice2.png' },
])

// 常用服务数据
const services = ref([
  { name: '预约报闸', icon: '🚢', color: '#4e7bfa' },
  { name: '当前报闸', icon: '🏛️', color: '#42c2b7' },
  { name: '过闸记录', icon: '📝', color: '#4e7bfa' },
  { name: '船舶注册', icon: '⛴️', color: '#8e76fa' },
  { name: '过闸通行票', icon: '🎫', color: '#42c2b7' },
  { name: '过闸积分', icon: '💰', color: '#ffb742' },
  { name: '终端服务', icon: '📱', color: '#4e7bfa' },
  { name: '终端故障', icon: '🔧', color: '#ff7d63' },
])

// 船闸信息数据
const lockInfo = ref([
  {
    name: '长洲',
    isHot: true,
    directions: [
      { type: '上行', waiting: 139, reported: 0 },
      { type: '下行', waiting: 595, reported: 505 },
    ],
  },
  {
    name: '桂平',
    isHot: false,
    directions: [
      { type: '上行', waiting: 26, reported: 0 },
      { type: '下行', waiting: 433, reported: 0 },
    ],
  },
  {
    name: '大藤峡',
    isHot: true,
    directions: [{ type: '上行', waiting: 595, reported: 730 }],
  },
])
</script>

<style>
page {
  background: linear-gradient(180deg, #c4dcfe 0%, #f5f5f5 45%);
}
</style>

<style lang="scss"></style>
