<template>
  <view v-show="isActive" class="tab-content">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, computed } from 'vue'

defineOptions({
  name: 'CustomTabItem',
})

const props = defineProps({
  // 标签标题
  title: {
    type: String,
    required: true,
  },
  // 标签名称（可选）
  name: {
    type: [String, Number],
    default: '',
  },
})

// 获取父组件提供的上下文
const tabsContext = inject<TabsContext>('tabsContext')

// 当前标签的索引
const tabIndex = ref(-1)

// 计算当前标签是否激活
const isActive = computed(() => {
  return tabsContext.activeIndex.value === tabIndex.value
})

// 在挂载时向父组件注册自己
onMounted(() => {
  // 注册标签并获取索引
  const index = tabsContext.registerTab({
    title: props.title,
    name: props.name,
  })

  // 设置当前标签的索引
  tabIndex.value = index
})
</script>

<style>
.tab-content {
  padding: 16px 0;
}
</style>
