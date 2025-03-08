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
  <view
    class="min-h-screen"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      marginBottom: safeAreaInsets?.bottom + 10 + 'px',
    }"
  >
    <!-- 新增固定背景层 -->
    <view class="fixed-bg"></view>
    <!-- 顶部标题 -->
    <wd-navbar
      fixed
      title="首页"
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      :bordered="false"
    />

    <!-- 轮播通知 -->
    <swiper
      class="h-30 mx-4 mt-11 mb-3 rounded-lg overflow-hidden relative bg-red"
      circular
      autoplay
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
    <view class="px-4 mb-16rpx">
      <wd-notice-bar text="用户注册" :scrollable="false" background-color="#c4dcfe64">
        <template #prefix>
          <view class="flex gap-4rpx">
            <view class="i-carbon:notification text-[#608ee9]" />
            <view class="italic text-[#608ee9] pl-4rpx font-bold">通知</view>
          </view>
        </template>
        <template #default>
          <view class="pl-16rpx text-#333 font-500">用户注册</view>
        </template>
      </wd-notice-bar>
    </view>

    <!-- 常用服务网格 -->

    <view class="mx-4 bg-white rounded-lg">
      <view class="flex flex-col gap-2">
        <view class="mx-4 mt-16rpx text-base font-medium text-[#333]">常用服务</view>
        <view class="grid grid-cols-4 gap-4 pb-4 pt-4rpx">
          <view
            class="flex flex-col items-center gap-2"
            v-for="(service, index) in services"
            :key="index"
            @click="handleServiceClick(service.name, index)"
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
    </view>

    <view class="mx-4 pb-4 mt-16rpx pt-8rpx bg-white rounded-lg overflow-hidden">
      <!-- 船闸待闸信息 -->
      <view class="mx-4 mt-16rpx mb-16rpx text-base font-medium text-[#333]">船闸待闸信息</view>
      <view
        class="h-160rpx mx-4 bg-[#f6f9ff] mt-16rpx rounded-lg overflow-hidden flex items-center px-4 gap-6"
        v-for="(item, index) in lockInfo"
        :key="index"
      >
        <!-- 船闸名称部分 - 使用flex布局 -->
        <view class="flex items-center justify-center flex-shrink-0 w-17 text-center">
          <text v-if="item.isHot">🔥</text>
          <text>{{ item.name }}</text>
        </view>
        <view class="flex flex-col gap-8rpx">
          <view class="flex items-center">
            <view class="text-14px leading-none font-bold flex-shrink-0 mr-2 w-13">• 上行</view>
            <view class="flex-1 flex justify-between">
              <view class="flex items-center w-1/2">
                <text class="text-12px whitespace-nowrap">待闸:</text>
                <text class="text-12px ml-2rpx">{{ item.directions[0].waiting }}</text>
              </view>
              <view class="flex items-center w-1/2 ml-12rpx">
                <text class="text-12px whitespace-nowrap">预报到:</text>
                <text class="text-12px ml-2rpx">{{ item.directions[0].reported }}</text>
              </view>
            </view>
          </view>
          <view class="b-1 b-solid border-#f5f5f5"></view>
          <view class="flex items-center">
            <view class="text-14px leading-none font-bold flex-shrink-0 mr-2 w-13">• 下行</view>
            <view class="flex-1 flex justify-between">
              <view class="flex items-center w-1/2">
                <text class="text-12px whitespace-nowrap">待闸:</text>
                <text class="text-12px ml-auto">{{ item.directions[1].waiting }}</text>
              </view>
              <view class="flex items-center w-1/2 ml-12rpx">
                <text class="text-12px whitespace-nowrap">预报到:</text>
                <text class="text-12px ml-auto">{{ item.directions[1].reported }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
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
    directions: [
      { type: '上行', waiting: 595, reported: 730 },
      { type: '下行', waiting: 172, reported: 609 },
    ],
  },
])

function handleServiceClick(name: string, index: number) {
  uni.showToast({
    title: `点击了${name}`,
    icon: 'none',
  })
  if (index === 0) {
    uni.navigateTo({
      url: '/pages/appointment/index',
    })
  } else if (index === 1) {
    uni.navigateTo({
      url: '/pages/report-info/index',
    })
  }
}

useMqtt({
  test: (payload: any) => {
    console.log('test', payload)
  },
})
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

<style lang="scss"></style>
