// const secretKeyConfig = require('../config/secretKeyConfig.js');
module.exports = {
    // Service Worker 的配置
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用!",
            buttonText: "刷新"
        }
    },
    // 谷歌分析
    '@vuepress/google-analytics': {
        // ga: secretKeyConfig.googleAnalytics.ga
    },
    // 图片放大
    '@vuepress/medium-zoom': {
        selector: '.content__default img',
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
            margin: 16
        },
    },
    // 播放器
    '@vuepress-reco/vuepress-plugin-bgm-player': {
        audios: [
            // 本地文件示例
            {
                name: 'austin',
                artist: 'send\'it',
                url: '/music/austin/Austin.mp3',
                cover: '/music/austin/ladygaga.jpg'
            },
            // 网络文件示例
            // {
            //     name: 'Austin',
            //     artist: 'send\'it',
            //     url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            //     cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
            // }
        ]
    },
    // 流程图
    'flowchart': true,
    'ribbon': {
        size: 90, // 彩带的宽度，默认为 90
        opacity: 0.3, // 彩带的不透明度，默认为 0.3
        zIndex: -1 // 彩带的 z-index 属性，默认为 -1
    }
};