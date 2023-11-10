module.exports = [
  // 添加时间轴导航
  {text: '主页', link: '/', icon: 'reco-home'},
  {
    text: '前端',
    icon: 'reco-api',
    items: [
      {
        text: '基础',
        items: [
          {text: 'CSS', link: '/tag/CSS/'},
          {text: 'JS', link: '/tag/JS/'},
        ]
      },
      {
        text: '框架',
        items: [
          {text: 'vue', link: '/tag/vue/'},
          {text: 'react', link: '/tag/react/'}
        ]
      },
      {
        text: 'HTTP缓存',
        items: [
          {text: '前端缓存策略', link: '/tag/http/'}
        ]
      },
    ]
  },
  {
    text: '后端',
    icon: 'reco-coding',
    items: [
      {
        text: 'Node', items: [
          {text: 'node基础', link: '/backEnd/node/'},
        ]
      },
    ]
  },
  {
    text: '其他',
    icon: 'reco-other',
    items: [
      {text: 'Git', link: '/other/git/'},
      {text: 'HTTP', link: '/其他技术/http/'},
    ]
  },
  // {text: '流月', link: '/timeLine/', icon: 'reco-date'},
];
