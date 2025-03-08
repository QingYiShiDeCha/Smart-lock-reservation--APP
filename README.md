<p align="center">
  <img width="160" src="./src/static/logo.svg">
</p>

<h1 align="center">智能船闸预约系统</h1>

<div align="center">

![node version](https://img.shields.io/badge/node-%3E%3D18-green)
![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)
![GitHub License](https://img.shields.io/github/license/feige996/unibest)

</div>

## 项目介绍

智能船闸预约系统是一个专为船主设计的船闸预约平台，旨在提供高效、便捷的报闸服务。系统采用移动优先的设计理念，支持多端适配，为船主用户提供流畅的预约体验。

## 功能特点

### 用户账户管理

- 用户注册和登录
- 账户信息管理
- 个人资料编辑

### 船闸管理

- 预约报闸
- 报闸信息查询
- 船闸状态实时监控

### 客服支持

- 在线客服咨询
- 电话联系支持
- 问题反馈处理

### 其他功能

- 实时通知公告
- 账户余额管理
- 操作日志记录

## 技术栈

- 前端框架：Vue 3 + TypeScript
- 跨端开发：uni-app
- UI组件：wot-design-uni
- 状态管理：Pinia
- 构建工具：Vite 5
- 样式方案：UnoCSS
- 分页组件：z-paging

## 环境要求

- Node.js >= 18
- pnpm >= 7.30

## 快速开始

1. 安装依赖

```bash
pnpm install
```

2. 开发调试

```bash
# H5端
pnpm dev:h5

# 微信小程序
pnpm dev:mp-weixin

# App端
pnpm dev:app
```

3. 项目打包

```bash
# H5端
pnpm build:h5

# 微信小程序
pnpm build:mp-weixin

# App端
pnpm build:app
```

## 平台支持

| 平台               | 支持情况 |
| ------------------ | -------- |
| H5                 | ✅       |
| 微信小程序         | ✅       |
| App（Android/iOS） | ✅       |
| 其他小程序平台     | ✅       |

## 许可证

[MIT](https://opensource.org/license/mit/)

Copyright (c) 2024 智能船闸预约系统
