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
    <view class="bg-white mx-4 rounded-md p-4 flex flex-col gap-20rpx">
      <view>
        <wd-card title="船闸">
          <wd-radio-group v-model="formData.selectedValue" shape="dot" inline>
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
            <view class="w-20% text-28rpx">船舶方向:</view>
            <view>
              <wd-radio-group v-model="formData.selectDirection" shape="dot" inline>
                <wd-radio value="1">上行</wd-radio>
                <wd-radio value="2">下行</wd-radio>
              </wd-radio-group>
            </view>
          </view>
          <view class="flex items-center gap-20rpx justify-between">
            <view class="w-20% text-28rpx">船舶类型:</view>
            <view>
              <wd-radio-group v-model="formData.selectType" shape="dot" inline>
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
              <wd-picker
                v-model="formData.startPort"
                label="起始港"
                :columns="shoplocks.map((item) => item.name)"
              />
              <wd-picker
                v-model="formData.endPort"
                label="目的港"
                :columns="shoplocks.map((item) => item.name)"
              />

              <!-- 包装方式（单选框组） -->
              <wd-picker
                v-model="formData.packageType"
                label="包装方式"
                :columns="['散装', '集装箱', '托盘']"
              />

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
      <view class="mx-4">
        <wd-button @click="handleSubmit" block>预约报闸</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()

const formData = reactive({
  shipDate: '',
  waybillNo: '',
  startPort: '',
  endPort: '',
  packageType: '1',
  weight: '',
  freight: '',
  selectedValue: '',
  selectDirection: '',
  selectType: '',
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

function handleSubmit() {
  console.log('formData', formData)

  if (!validateForm()) return

  // 显示加载状态
  uni.showLoading({ title: '提交中...', mask: true })

  // 模拟网络请求延迟
  setTimeout(() => {
    uni.hideLoading()

    // 随机生成成功/失败结果
    const isSuccess = Math.random() > 0.2

    if (isSuccess) {
      uni.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 提交成功后跳转回上一页
          setTimeout(() => uni.navigateBack(), 1500)
        },
      })

      // 重置表单（根据需求选择是否保留数据）
      // Object.keys(formData).forEach(key => formData[key] = '')
    } else {
      uni.showModal({
        title: '提交失败',
        content: '网络请求异常，请稍后重试',
        confirmText: '重试',
        success: (res) => {
          if (res.confirm) handleSubmit()
        },
      })
    }
  }, 1500)
}

function validateForm() {
  const requiredFields = [
    { field: formData.selectedValue, message: '请选择船闸' },
    { field: formData.selectDirection, message: '请选择船舶方向' },
    { field: formData.selectType, message: '请选择船舶类型' },
    { field: formData.shipDate, message: '请选择装货日期' },
    { field: formData.waybillNo, message: '请输入运单号' },
  ]

  for (const { field, message } of requiredFields) {
    if (!field?.toString().trim()) {
      uni.showToast({ title: message, icon: 'none' })
      return false
    }
  }

  // 扩展验证示例：重量必须为数字
  if (formData.weight && isNaN(Number(formData.weight))) {
    uni.showToast({ title: '重量必须为数字', icon: 'none' })
    return false
  }

  return true
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
