<template>
  <view class="custom-tabs" :class="{ sticky: sticky }">
    <!-- 标签头部 -->
    <view class="tabs-header">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: activeIndex === index }"
        @click="handleTabClick(index)"
      >
        {{ tab.title }}
      </view>
    </view>

    <!-- 标签内容 -->
    <view class="tabs-content">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from 'vue'

defineOptions({
  name: 'CustomTab',
})

const props = defineProps({
  // 初始激活的标签索引
  modelValue: {
    type: Number,
    default: 0,
  },
  // 是否使用粘性定位
  sticky: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// 当前激活的标签索引
const activeIndex = ref(props.modelValue)

// 标签数据
const tabs = ref<TabItem[]>([])

// 注册标签
const registerTab = (tabData: TabItem): number => {
  tabs.value.push(tabData)
  return tabs.value.length - 1
}

// 处理标签点击
const handleTabClick = (index: number): void => {
  activeIndex.value = index
  emit('update:modelValue', index)
}

// 提供给子组件的上下文
provide<TabsContext>('tabsContext', {
  activeIndex,
  registerTab,
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    activeIndex.value = newVal
  },
)
</script>

<style>
.custom-tabs {
  width: 100%;
}

.tabs-header {
  position: relative;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  background-color: #c6ddfe;
  /* border-bottom: 1px solid #f0f0f0; */
}

.tabs-content {
  margin-top: 4.5rem;
  /* background-color: #f5f5f5; */
}
.tab-item {
  position: relative;
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.tab-item.active {
  font-weight: 500;
  color: #4e7bfa;
}

.tab-item.active::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 20px;
  height: 3px;
  content: '';
  background-color: #4e7bfa;
  border-radius: 2px;
  transform: translateX(-50%);
}
/* 粘性定位样式 */
.custom-tabs.sticky .tabs-header {
  position: fixed;
  top: 60rpx;
  z-index: 999;
}
</style>
