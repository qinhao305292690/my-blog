const pluginConfig = require('../config/pluginConfig.js');
const navConfig = require('../config/navConfig.js');
const sidebarConfig = require('../config/sideBarConfig/index.js');
const headConfig = require('../config/headConfig.js');
// const secretKeyConfig = require('../config/secretKeyConfig.js');
module.exports = {
  title: "胡剑锋",
  description: '勿忘初心,方得始终! Welcome to Hu Jianfeng\'s blog',
  base: '/my-blog/',
  locales: {
    '/': {
      lang: 'zh-CN', // 设置语言
    }
  },
  // author
  author: '秦昊joyc',
  theme: 'reco',
  head: headConfig,
  themeConfig: {
    authorAvatar: '/images/avatar.jpg',
    type: 'blog',
    author: '秦昊joyc',
    logo: '/images/avatar.jpg',
    record: 'ICP 备案文案',
    startYear: '2020',
    searchMaxSuggestions: 10,
    displayAllHeaders: false, // 不显示所有页面的标题链接，只显示当前页面的标题链接
    // 博客设置
    blogConfig: {
      // 添加分类和标签
      category: {
        location: 5, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 6, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
      }
    },
    // 导航栏
    nav: navConfig,
    smoothScroll: true,
    sidebar: sidebarConfig,

    sidebarDepth: 3, // 侧边栏显示3级
    lastUpdated: '上次更新',
    repo: 'https://github.com/qinhao305292690',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    // 评论(valine)
    // valineConfig: {
    //     // appId: secretKeyConfig.valineConfig.appId, // your appId
    //     // appKey: secretKeyConfig.valineConfig.appKey, // your appKey
    //     placeholder: '欢迎留言！',
    //     notify: true,
    //     verify: true,
    //     avatar: "retro",
    //     visitor: true,
    //     recordIP: true
    // },
  },
  markdown: {
    // lineNumbers: true,
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '🌙'
    },
  },
  // 插件
  plugins: pluginConfig,
}
