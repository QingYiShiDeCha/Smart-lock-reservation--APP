<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '报闸信息',
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
  >
    <!-- 新增固定背景层 -->
    <view class="fixed-bg"></view>
    <!-- 修改导航栏布局 -->
    <wd-navbar
      fixed
      title="报闸信息"
      left-arrow
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      @click-left="handleBack"
      :bordered="false"
    />
    <!-- 占位符 -->
    <view class="mt-90rpx"></view>

    <!-- 使用自定义标签页组件 -->
    <custom-tab v-model="activeTab" sticky>
      <custom-tab-item title="当前信息">
        <!-- 报闸信息内容 -->
        <view class="mx-4 bg-white rounded-lg p-4">
          <view class="text-lg font-medium mb-4">报闸信息</view>

          <!-- 信息列表 -->
          <view class="flex flex-col gap-3">
            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">船舶名称</text>
              <text>{{ shipInfo.name || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">吃水 (米)</text>
              <text>{{ shipInfo.draft || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">航次号</text>
              <text>{{ shipInfo.voyageNumber || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">排队号</text>
              <text>{{ shipInfo.queueNumber || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">前方船数</text>
              <text>{{ shipInfo.shipsAhead || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">过闸位置</text>
              <text>{{ shipInfo.lockPosition || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">报到方式</text>
              <text>{{ shipInfo.reportMethod || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">终端状态</text>
              <text>{{ shipInfo.terminalStatus || '无' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">报闸提示</text>
              <text>{{ shipInfo.reportTip || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">应缴金额</text>
              <text>{{ shipInfo.amountDue || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">实缴金额</text>
              <text>{{ shipInfo.amountPaid || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">私人余额</text>
              <text>{{ shipInfo.privateBalance || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">公司余额</text>
              <text>{{ shipInfo.companyBalance || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2">
              <text class="text-gray-500">审核意见</text>
              <text>{{ shipInfo.reviewComments || '-' }}</text>
            </view>
          </view>
        </view>
      </custom-tab-item>

      <custom-tab-item title="报闸进度">
        <view class="mx-4 bg-white rounded-lg p-4">
          <wd-steps :active="currentStep" align-center>
            <wd-step title="进入锚地" description="等待进入锚地" />
            <wd-step title="当前船闸" description="等待进入船闸" />
            <wd-step title="人工审核" description="等待人工审核" />
            <wd-step title="进闸" description="等待进闸" />
          </wd-steps>
        </view>
      </custom-tab-item>

      <custom-tab-item title="预约进度">
        <view class="mx-4 bg-white rounded-lg p-4">
          <!-- 预约进度内容待添加 -->
        </view>
      </custom-tab-item>
    </custom-tab>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomTab from '@/components/CustomTab.vue'
import CustomTabItem from '@/components/CustomTabItem.vue'

defineOptions({
  name: 'ReportInfo',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 当前激活的标签页
const activeTab = ref(0)

// 当前进度步骤
const currentStep = ref(1)

// 船舶信息数据
const shipInfo = ref({
  name: '吃水 (米)',
  draft: '',
  voyageNumber: '',
  queueNumber: '-',
  shipsAhead: '',
  lockPosition: '',
  reportMethod: '-',
  terminalStatus: '无',
  reportTip: '-',
  amountDue: '-',
  amountPaid: '-',
  privateBalance: '-',
  companyBalance: '-',
  reviewComments: '-',
})

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<style>
/* 固定背景层 */
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
