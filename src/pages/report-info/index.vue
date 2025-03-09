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
              <text class="text-28rpx">{{ shipInfo.name || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">吃水 (米)</text>
              <text class="text-28rpx">{{ shipInfo.draft || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">航次号</text>
              <text class="text-24rpx">{{ shipInfo.voyageNumber || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">排队号</text>
              <text class="text-28rpx">{{ shipInfo.queueNumber || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">前方船数</text>
              <text class="text-28rpx">{{ shipInfo.shipsAhead || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">过闸位置</text>
              <text class="text-28rpx">{{ shipInfo.lockPosition || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">报到方式</text>
              <text class="text-28rpx">{{ shipInfo.reportWay || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">终端状态</text>
              <text
                class="text-28rpx"
                :class="{
                  'text-red': shipInfo.terminalStatus === 0,
                  'text-green': shipInfo.terminalStatus === 1,
                }"
              >
                {{
                  shipInfo.terminalStatus === 1
                    ? '在线 ' + formatDateTime(new Date())
                    : '离线 ' + formatDateTime(new Date())
                }}
              </text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">报闸提示</text>
              <text class="text-28rpx">{{ shipInfo.reportTip || '-' }}</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">应缴金额</text>
              <text class="text-28rpx">{{ shipInfo.amountDue || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">实缴金额</text>
              <text class="text-28rpx">{{ shipInfo.amountPaid || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">私人余额</text>
              <text class="text-28rpx">{{ shipInfo.privateBalance || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2 border-b border-gray-100">
              <text class="text-gray-500">公司余额</text>
              <text class="text-28rpx">{{ shipInfo.companyBalance || '-' }} 元</text>
            </view>

            <view class="flex justify-between py-2">
              <text class="text-gray-500">审核意见</text>
              <text class="text-28rpx">{{ shipInfo.reviewComments || '-' }}</text>
            </view>
          </view>
        </view>
      </custom-tab-item>

      <custom-tab-item title="报闸进度">
        <view class="mx-4 bg-white rounded-lg p-4">
          <wd-steps :active="currentStep" vertical class="progress-steps" dot>
            <wd-step>
              <template #title>
                <view
                  class="step-card"
                  :class="{ completed: progressInfo.steps[0].status === STEP_STATUS.COMPLETED }"
                >
                  <view class="flex justify-between items-center">
                    <text class="font-medium">进入锚地</text>
                    <text
                      class="status-text"
                      :class="{ completed: progressInfo.steps[0].status === STEP_STATUS.COMPLETED }"
                    >
                      {{ progressInfo.steps[0].statusText }}
                    </text>
                  </view>
                  <view class="text-sm text-gray-500 mt-1">
                    当前船闸: {{ progressInfo.currentLock }}
                  </view>
                </view>
              </template>
            </wd-step>

            <wd-step>
              <template #title>
                <view
                  class="step-card"
                  :class="{
                    active: progressInfo.steps[1].status === STEP_STATUS.IN_PROGRESS,
                    completed: progressInfo.steps[1].status === STEP_STATUS.COMPLETED,
                  }"
                >
                  <view class="flex justify-between items-center">
                    <text class="font-medium">
                      人工审核: {{ progressInfo.steps[1].status === 2 ? '已缴费' : '未缴费' }}
                    </text>
                    <text
                      class="status-text"
                      :class="{
                        active: progressInfo.steps[1].status === STEP_STATUS.IN_PROGRESS,
                        completed: progressInfo.steps[1].status === STEP_STATUS.COMPLETED,
                      }"
                    >
                      {{ renderStatusText(progressInfo.steps[1].status) }}
                    </text>
                  </view>
                  <view class="flex justify-between items-center">
                    <view class="text-sm text-gray-500 mt-1">
                      审核人: {{ progressInfo.reviewer }}
                    </view>
                    <view class="text-0.8rem text-gray-500 mt-1">
                      过闸费用: {{ progressInfo.fee }}元
                    </view>
                  </view>
                </view>
              </template>
            </wd-step>

            <wd-step>
              <template #title>
                <view
                  class="step-card"
                  :class="{ active: progressInfo.steps[2].status === STEP_STATUS.IN_PROGRESS }"
                >
                  <view class="flex justify-between items-center">
                    <text class="font-medium">调度</text>
                    <text
                      class="status-text"
                      :class="{ active: progressInfo.steps[2].status === STEP_STATUS.IN_PROGRESS }"
                    >
                      {{ progressInfo.steps[2].statusText }}
                    </text>
                  </view>
                  <view class="text-sm text-gray-500 mt-1">
                    {{ progressInfo.steps[2].description }}
                  </view>
                </view>
              </template>
            </wd-step>

            <wd-step>
              <template #title>
                <view
                  class="step-card"
                  :class="{ active: progressInfo.steps[3].status === STEP_STATUS.IN_PROGRESS }"
                >
                  <view class="flex justify-between items-center">
                    <text class="font-medium">过闸</text>
                    <text
                      class="status-text"
                      :class="{ active: progressInfo.steps[3].status === STEP_STATUS.IN_PROGRESS }"
                    >
                      {{ progressInfo.steps[3].statusText }}
                    </text>
                  </view>
                  <view class="text-sm text-gray-500 mt-1">
                    {{ progressInfo.steps[3].description }}
                  </view>
                </view>
              </template>
            </wd-step>
          </wd-steps>
        </view>
      </custom-tab-item>

      <custom-tab-item title="预约进度">
        <view class="mx-4 bg-white rounded-lg p-4">
          <wd-steps vertical class="progress-steps" dot>
            <wd-step>
              <template #title>
                <view class="step-card">
                  <view class="flex justify-between items-center">
                    <text class="font-medium">预约船闸</text>
                    <text class="status-text">2025-02-16 08:00</text>
                  </view>
                  <view class="text-sm text-gray-500 mt-1">桂平船闸: 上行</view>
                </view>
              </template>
            </wd-step>
          </wd-steps>
        </view>
      </custom-tab-item>
    </custom-tab>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomTab from '@/components/CustomTab.vue'
import CustomTabItem from '@/components/CustomTabItem.vue'
import { useMqtt } from '@/hooks/useMqtt'
import { formatDateTime } from '@/utils/datetime'

defineOptions({
  name: 'ReportInfo',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 当前激活的标签页
const activeTab = ref(0)

// 当前进度步骤
const currentStep = ref(1)

// 步骤状态枚举
const STEP_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
}

// 步骤状态文本映射
const STATUS_TEXT_MAP = {
  [STEP_STATUS.NOT_STARTED]: '未开始',
  [STEP_STATUS.IN_PROGRESS]: '进行中',
  [STEP_STATUS.COMPLETED]: '已完成',
}

function renderStatusText(status: number) {
  return STATUS_TEXT_MAP[status]
}

// 船舶信息数据
const shipInfo = ref({
  name: '宇宙9528',
  draft: '1',
  voyageNumber: '2025-02-28 08:54:19 从广州上行平南港区',
  queueNumber: '-',
  shipsAhead: 2,
  lockPosition: '上行',
  reportWay: '-',
  terminalStatus: 1,
  reportTip: '预约成功',
  amountDue: '1194.99',
  amountPaid: '-',
  privateBalance: '-',
  companyBalance: '-',
  reviewComments: '-',
})

// 报闸进度信息
const progressInfo = ref({
  currentLock: '桂平',
  reviewer: 'XXX',
  fee: '1199.40',
  isPaid: false,
  steps: [
    {
      status: STEP_STATUS.COMPLETED,
      statusText: STATUS_TEXT_MAP[STEP_STATUS.COMPLETED],
      description: '',
    },
    {
      status: STEP_STATUS.IN_PROGRESS,
      statusText: STATUS_TEXT_MAP[STEP_STATUS.IN_PROGRESS],
      description: '',
    },
    {
      status: STEP_STATUS.NOT_STARTED,
      statusText: STATUS_TEXT_MAP[STEP_STATUS.NOT_STARTED],
      description: '等待人工审核',
    },
    {
      status: STEP_STATUS.NOT_STARTED,
      statusText: STATUS_TEXT_MAP[STEP_STATUS.NOT_STARTED],
      description: '等待调度安排',
    },
  ],
})

useMqtt({
  test: (payload: any) => {
    console.log('test', payload)
    progressInfo.value.steps[1].status = payload.status
  },
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

<style lang="scss" scoped>
.progress-steps {
  :deep(.step-card) {
    padding: 12px;
    margin-bottom: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &.completed {
      border-left: 4px solid #4caf50;
      .status-text.completed {
        color: #4caf50;
      }
    }

    &.active {
      border-left: 4px solid #2196f3;
      .status-text.active {
        color: #2196f3;
      }
    }

    .status-text {
      font-size: 14px;
      color: #9e9e9e;
    }
  }
}
</style>
