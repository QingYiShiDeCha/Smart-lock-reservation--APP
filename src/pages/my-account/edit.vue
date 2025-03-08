<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '编辑账户信息',
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
      title="编辑账户信息"
      left-arrow
      safeAreaInsetTop
      custom-style="background-color: #c6ddfe !important;"
      @click-left="handleBack"
      :bordered="false"
    />
    <!-- 占位符 -->
    <view class="pt-120rpx"></view>

    <view class="rounded-md mx-2 bg-white py-18rpx text-30rpx">
      <wd-form ref="formRef" :model="formData">
        <wd-cell-group border>
          <wd-input
            label="会员名称"
            label-width="100px"
            prop="memberName"
            clearable
            v-model="formData.memberName"
            placeholder="请输入会员名称"
            :rules="[{ required: true, message: '请输入会员名称' }]"
          />
          <wd-input
            label="邮政编码"
            label-width="100px"
            prop="postalCode"
            clearable
            v-model="formData.postalCode"
            placeholder="请输入邮政编码"
          />
          <wd-input
            label="通讯地址"
            label-width="100px"
            prop="address"
            clearable
            v-model="formData.address"
            placeholder="请输入通讯地址"
          />
          <wd-input
            label="传真地址"
            label-width="100px"
            prop="fax"
            clearable
            v-model="formData.fax"
            placeholder="请输入传真地址"
          />
          <wd-input
            label="网址"
            label-width="100px"
            prop="website"
            clearable
            v-model="formData.website"
            placeholder="请输入网址"
          />
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="mt-6 mx-4">
      <wd-button block type="primary" @click="handleSubmit">保存</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { IAccountInfo } from '@/store/account'

const { safeAreaInsets } = uni.getSystemInfoSync()
const accountStore = useAccountStore()
const { accountInfo } = storeToRefs(accountStore)

const formRef = ref()
const formData = ref<IAccountInfo>({ ...accountInfo.value })

function handleBack() {
  uni.navigateBack()
}

function handleSubmit() {
  formRef.value?.validate().then(({ valid }) => {
    if (valid) {
      accountStore.setAccountInfo(formData.value)
      uni.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 2000)
    }
  })
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
