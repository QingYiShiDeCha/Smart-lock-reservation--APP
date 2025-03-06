import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1296db',
    backgroundColor: '#F8F8F8',
    borderStyle: 'white',
    height: '55px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home_active.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/user.png',
        selectedIconPath: 'static/tabbar/user_active.png',
        pagePath: 'pages/cell-center/index',
        text: '客服',
      },
      {
        iconPath: 'static/tabbar/phone.png',
        selectedIconPath: 'static/tabbar/phone_active.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})
