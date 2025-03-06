<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '预约报闸',
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
      title="预约报闸"
      left-arrow
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      @click-left="handleBack"
      :bordered="false"
    />
    <!-- 占位符 -->
    <view class="mt-90rpx"></view>
    <view class="bg-white p-4 flex flex-col gap-20rpx">
      <view class="mx-4">
        <wd-button block>预约报闸</wd-button>
      </view>
      <view>
        <wd-card title="船闸">
          <wd-radio-group v-model="selectedValue" shape="dot" inline>
            <view class="flex flex-wrap gap-10rpx">
              <wd-radio
                class="w-1/4"
                v-for="item in shoplocks"
                :key="item.value"
                :value="item.value"
              >
                {{ item.name }}
              </wd-radio>
            </view>
          </wd-radio-group>
        </wd-card>
        <view class="flex flex-col gap-20rpx">
          <view class="flex items-center gap-20rpx justify-between">
            <view class="w-20%">船舶方向:</view>
            <view>
              <wd-radio-group v-model="selectDirection" shape="dot" inline>
                <wd-radio value="1">上行</wd-radio>
                <wd-radio value="2">下行</wd-radio>
              </wd-radio-group>
            </view>
          </view>
          <view class="flex items-center gap-20rpx justify-between">
            <view class="w-20%">船舶类型:</view>
            <view>
              <wd-radio-group v-model="selectType" shape="dot" inline>
                <wd-radio value="1">重船</wd-radio>
                <wd-radio value="2">吉船</wd-radio>
              </wd-radio-group>
            </view>
          </view>
        </view>

        <view class="p-20rpx rounded-lg b-1 overflow-hidden mt-20rpx">
          <view class="flex justify-between items-center">
            <view class="text-28rpx">运单1</view>
            <view class="i-carbon:trash-can text-sky"></view>
          </view>
          <view class="form">
            <!-- 使用wd-cell-group包裹表单项保证样式统一 -->
            <wd-cell-group custom-class="transparent" border>
              <!-- 装货日期（日期选择器） -->
              <wd-datetime-picker
                label="装货日期"
                v-model="formData.shipDate"
                placeholder="请选择日期"
                :min-date="new Date().getTime()"
              />

              <!-- 运单号（输入框） -->
              <wd-input
                label="运单号"
                v-model="formData.waybillNo"
                placeholder="请输入运单号"
                clearable
              />

              <!-- 起始港/目的港（选择器） -->
              <wd-picker label="起始港" :columns="shoplocks.map((item) => item.name)" />
              <wd-picker label="目的港" :columns="shoplocks.map((item) => item.name)" />

              <!-- <wd-select
                  label="起始港"
                  v-model="formData.startPort"
                  :options="portOptions"
                  placeholder="请选择"
                />
                <wd-select
                  label="目的港"
                  v-model="formData.endPort"
                  :options="portOptions"
                  placeholder="请选择"
                /> -->

              <!-- 包装方式（单选框组） -->
              <wd-picker label="包装方式" :columns="['散装', '集装箱', '托盘']" />

              <!-- 实际重量（带单位的数字输入） -->
              <wd-input
                label="实际重量"
                v-model="formData.weight"
                placeholder="请输入重量"
                type="number"
                clearable
              >
                <template #suffix>吨</template>
              </wd-input>

              <!-- 运费（金额输入） -->
              <wd-input
                label="运费"
                v-model="formData.freight"
                placeholder="请输入金额"
                type="number"
                clearable
              >
                <template #prefix>¥</template>
              </wd-input>
            </wd-cell-group>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()

const selectedValue = ref<string>('')
const selectDirection = ref<string>('')
const selectType = ref<string>('')

const formData = reactive({
  shipDate: '',
  waybillNo: '',
  startPort: '',
  endPort: '',
  packageType: '1',
  weight: '',
  freight: '',
})

interface Shiplock {
  name: string
  value: string
}

const shoplocks = ref<Shiplock[]>([
  { name: '长洲', value: 'changzhou' },
  {
    name: '桂平',
    value: 'guiping',
  },
  {
    name: '横县',
    value: 'hengxian',
  },
  {
    name: '邕宁',
    value: 'yongning',
  },
  {
    name: '大藤峡',
    value: 'datengxia',
  },
  {
    name: '西津',
    value: 'xijin',
  },
  {
    name: '大桥',
    value: 'daqiao',
  },
  {
    name: '贵港',
    value: 'guigang',
  },
])

function handleBack() {
  uni.navigateBack()
}

function handleSelect({ value }) {}
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
.liner-gradient {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  // background: linear-gradient(180deg, #c4dcfe 0%, #c4dcfe 100%);
}

.form {
  :deep(.wd-cell-group__body) {
    background-color: transparent !important;
  }
}

.transparent {
  background-color: transparent !important;
}
</style>
