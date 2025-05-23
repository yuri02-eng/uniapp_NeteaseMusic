# neteaseMusic

## 项目描述

本项目是一个基于 uni-app 和 Vue 3 开发的网易云音乐仿制应用。后端使用：[NetEaseMusic](https://github.com/Kevin0z0/Python_NetEaseMusicAPI)

## 项目结构
- src：项目源代码目录
- static：静态资源目录
- pages：页面目录
- components：组件目录
- store：状态管理目录
- utils：工具函数目录
- App.vue：应用入口文件
- manifest.json：应用配置文件
- package.json：项目依赖配置文件
## 项目依赖

- uni-app：前端框架
- Vue 3：JavaScript 框架
- pinia：状态管理库
- SCSS：CSS 预处理器
- TypeScript：JavaScript 的超集，增加了类型系统
## 主要技术栈

*   **uni-app**: 一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。
*   **Vue 3**: 用于构建用户界面的渐进式 JavaScript 框架。
*   **Vuex**: 专为 Vue.js 应用程序开发的状态管理模式。
*   **SCSS**: CSS 预处理器。
*   **TypeScript**: JavaScript 的超集，增加了类型系统。

## 主要页面

根据 `pages.json` 配置，项目包含以下主要页面：

*   **首页**: `pages/index/index`
*   **歌单列表页**: `pages/list/list`
*   **歌曲详情页**: `pages/detail/detail`
*   **搜索页**: `pages/search/search`

所有页面均采用自定义导航栏 (`navigationStyle: "custom"`)。

## 如何运行


```bash
# 安装依赖
npm install # 或者 yarn install

# H5 平台运行
npm run dev:h5 # 或者 yarn dev:h5

# 微信小程序平台运行
npm run dev:mp-weixin # 或者 yarn dev:mp-weixin

# 其他平台...